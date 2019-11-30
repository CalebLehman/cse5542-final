import { Geometry }
    from "../common/geometry.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"
import { fromPathAnim, getDisk } // TODO
    from "../common/primitives.mjs"
import { getRopeTexture }
    from "../textures/rope_texture.mjs"
import { constantSpeedPath, samplePath }
    from "../common/parametric.mjs"

import { getCheckerboardTexture } // TODO
    from "../textures/checkerboard_texture.mjs"
import { getWhiteTexture } // TODO
    from "../textures/white_texture.mjs"

var knotA = (function() {
    var knot = null;
    var capF = null;
    var capB = null;

    // Knot parameters
    const color    = [0.0, 1.0, 0.0, 1.0];
    const specular = [1.0, 1.0, 1.0, 1.0];
    const shine    = 100.0;
    const radius   = 0.2;
    const p        = 3;
    const q        = 2;

    const highPoly  = {
        pDivisions: 256,
        qDivisions: 32,
    };
    const lowPoly   = {
        pDivisions: 32,
        qDivisions: 8,
    };
    var currentPoly = null;
    var cachedKnots = {};
    cachedKnots["high-poly"] = null;
    cachedKnots["low-poly"] = null;

    // Parametrization details
    const tDivisions   = 4000;
    const originalA    = -1.0;
    const originalB    = +1.0;
    const originalPath = function(t) {
        const u = 2 * Math.PI * t * p;
        const v = 2 * Math.PI * t * q;
        if (u >= 0.0) {
            return vec3.fromValues(
                Math.cos(u) * (1 + Math.cos(v) / 2.0),
                Math.sin(v) / 2.0,
                Math.sin(u) * (1 + Math.cos(v) / 2.0)
            );
        } else {
            const factor = (1.0 * (1.75 * q + 5.50 * p))
                / (4 * Math.PI * p * Math.sqrt(q*q + 9*p*p));
            return vec3.fromValues(
                3.0 / 2.0,
                2.0 * q * u * factor,
                6.0 * p * u * factor
            );
        }
    }
    var pathSamples = null;

    function init(gl, poly, force=false) {
        switch (poly) {
            case "high-poly":
                currentPoly = highPoly;
                break;
            case "low-poly":
                currentPoly = lowPoly;
                break;
            default:
                console.log("Unknown poly level");
        }

        if (!pathSamples) {
            // Parametrize from [0,1]
            // with constant speed
            const reparamPath = constantSpeedPath(
                originalPath,
                originalA,
                originalB,
                tDivisions
            );

            // Parametrize from [-1,1]
            // with constant speed
            const shiftedPath = function(t) {
                return reparamPath((1.0 + t) / 2.0);
            };

            pathSamples = samplePath(
                shiftedPath,
                -1.0,
                1.0,
                tDivisions
            );
        }

        if ((!force) && cachedKnots[poly]) {
            knot = cachedKnots[poly];
            return;
        } else {
            var knotDrawable = fromPathAnim(
                gl,
                pathSamples.path,
                pathSamples.normal,
                pathSamples.binormal,
                radius,
                currentPoly.pDivisions,
                currentPoly.qDivisions,
                color,
                specular,
                shine
            );

            knot = new HierarchyNode(
                knotDrawable,
                [0.0, 0.0, 0.0],
                {angle: 0.0, axis: [0.0, 1.0, 0.0]},
                [1.0, 1.0, 1.0],
                getCheckerboardTexture(gl),
                getWhiteTexture(gl)
            );
            cachedKnots[poly] = knot;
        }
        // TODO
        var capDrawable = getDisk(gl, currentPoly.qDivisions);
        capF            = new HierarchyNode(
            capDrawable,
            [0.0, 0.0, 0.0],
            {angle: 0.0, axis: [0.0, 1.0, 0.0]},
            [radius, radius, radius],
            getCheckerboardTexture(gl),
            getWhiteTexture(gl)
        );
        capB            = new HierarchyNode(
            capDrawable,
            [0.0, 0.0, 0.0],
            {angle: 0.0, axis: [0.0, 1.0, 0.0]},
            [radius, radius, radius],
            getCheckerboardTexture(gl),
            getWhiteTexture(gl)
        );
        knot.addChild(capF);
        knot.addChild(capB);
    }

    var animStart  = null;
    var animLength = 0;
    function animate(length) {
        var date   = new Date();
        animStart  = date.getTime();
        animLength = length;
    }

    function get(gl) {
        if (!knot) {
            console.log("Retrieving uninitialized geometry");
        }

        // Position caps default TODO
        positionCaps();

        knot.drawable.offset = knot.drawable.numItems;
        if (animLength > 0) {
            var date          = new Date();
            var milliseconds  = date.getTime() - animStart;
            var tOffset       = 1.0 * (milliseconds - animLength) / animLength;

            if (milliseconds > animLength) {
                animLength           = 0;
                animStart            = null;
            } else {
                const verticesPerRing = currentPoly.qDivisions * 2 * 3;
                knot.drawable.offset  = Math.floor(
                    0.5 + (knot.drawable.numItems * (1.0 + tOffset)) / verticesPerRing
                ) * verticesPerRing;
            }
        }

        return knot;
    }

    function positionCaps() {
        var t = 0.0;
        if (animLength > 0) {
            var date          = new Date();
            var milliseconds  = date.getTime() - animStart;
            t                 = 1.0 * (milliseconds - animLength) / animLength;
        }
        t = Math.min(0.0, Math.max(t, -1.0));

        { // Front cap
            capF.translation = [...pathSamples.path(t+1)];
            const y = vec3.fromValues(0.0, 1.0, 0.0);
            const T = pathSamples.tangent(t+1);
            const axis = vec3.create();
            vec3.cross(axis, y, T);
            capF.rotation = {
                angle: Math.acos(vec3.dot(y, T)),
                axis:  axis
            };
        }

        { // Back cap
            capB.translation = [...pathSamples.path(t)];
            const y = vec3.fromValues(0.0, 1.0, 0.0);
            const T = pathSamples.tangent(t);
            const axis = vec3.create();
            vec3.cross(axis, y, T);
            capB.rotation = {
                angle: Math.acos(vec3.dot(y, T)),
                axis:  axis
            };
        }
    }

    return new Geometry(init, animate, get);
})();

export { knotA };
