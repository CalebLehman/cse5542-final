import { Geometry }
    from "../common/geometry.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"
import { fromPathAnim, getDisk }
    from "../common/primitives.mjs"
import { constantSpeedPath, samplePath }
    from "../common/parametric.mjs"
import { getDefaultTextures }
    from "../textures/default/textures.mjs"

var figureEightKnot = (function() {
    var knot = null;
    var capF = null;
    var capB = null;

    var textures = null;

    // Knot parameters
    const color    = [0.0, 1.0, 0.0, 1.0];
    const specular = [1.0, 1.0, 1.0, 1.0];
    var   shine    = 100.0;
    const radius   = 0.3;
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
    var cachedDrawables = {};
    cachedDrawables["high-poly"] = null;
    cachedDrawables["low-poly"] = null;

    // Parametrization details
    const tDivisions   = 8000;
    const originalA    = -1.0;
    const originalB    = +1.0;
    const originalPath = function(t) {
        const u = 2 * Math.PI * t;
        if (u >= 0.0) {
            return vec3.fromValues(
                (2.0 + Math.cos(2*u)) * Math.cos(3*u),
                Math.sin(4*u),
                (2.0 + Math.cos(2*u)) * Math.sin(3*u)
            );
        } else {
            const factor = 41.45 / 9.50;
            return vec3.fromValues(
                3.0,
                4.0 * t * factor,
                9.0 * t * factor
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
                console.log("Unknown poly level: " + poly);
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

        if (!textures) {
            textures = getDefaultTextures(gl);
        }

        if (!knot) {
            knot = new HierarchyNode(
                null,
                [0.0, 0.0, 0.0],
                {angle: 0.0, axis: [0.0, 1.0, 0.0]},
                [1.0, 1.0, 1.0],
                null,
                null,
                null
            );

            capF = new HierarchyNode(
                null,
                [0.0, 0.0, 0.0],
                {angle: 0.0, axis: [0.0, 1.0, 0.0]},
                [radius, radius, radius],
                null,
                null,
                null
            );
            capB = new HierarchyNode(
                null,
                [0.0, 0.0, 0.0],
                {angle: 0.0, axis: [0.0, 1.0, 0.0]},
                [radius, radius, radius],
                null,
                null,
                null
            );

            // Parent to knot
            knot.addChild(capF);
            knot.addChild(capB);
        }

        if (force || !cachedDrawables[poly]) {
            cachedDrawables[poly] = fromPathAnim(
                gl,
                color,
                color,
                specular,
                shine,
                pathSamples.path,
                pathSamples.tangent,
                pathSamples.normal,
                pathSamples.binormal,
                radius,
                currentPoly.pDivisions,
                currentPoly.qDivisions,
                48,
                2
            );
        }
        knot.drawable = cachedDrawables[poly];

        // Build caps
        var capDrawable = getDisk(
            gl,
            color,
            color,
            specular,
            shine,
            currentPoly.qDivisions
        );
        capF.drawable = capDrawable;
        capB.drawable = capDrawable;
    }

    var animStart  = null;
    var animLength = 0;
    function animate(length) {
        var date   = new Date();
        animStart  = date.getTime();
        animLength = length;
    }

    function get() {
        if (!knot) {
            console.log("Retrieving uninitialized geometry");
        }

        if (knot.drawable) {
            // Position caps default
            positionCaps();

            knot.drawable.offset = knot.drawable.numItems;
            if (animLength > 0) {
                var date          = new Date();
                var milliseconds  = date.getTime() - animStart;
                var tOffset       =
                    1.0 * (milliseconds - animLength) / animLength;

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

            // Use textures
            knot.textureDiffuse  = textures.diffuse;
            knot.textureSpecular = textures.specular;
            knot.textureNormal   = textures.normal;
            capF.textureDiffuse  = textures.diffuse;
            capF.textureSpecular = textures.specular;
            capF.textureNormal   = textures.normal;
            capB.textureDiffuse  = textures.diffuse;
            capB.textureSpecular = textures.specular;
            capB.textureNormal   = textures.normal;
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

    function texture(newTextures, newShine) {
        if (newTextures) {
            textures = newTextures;
        }
        if (newShine) {
            shine = newShine;
            if (cachedDrawables["low-poly"]) {
                cachedDrawables["low-poly"].shine = newShine;
            }
            if (cachedDrawables["high-poly"]) {
                cachedDrawables["high-poly"].shine = newShine;
            }
        }
    }

    return new Geometry(init, animate, get, texture);
})();

export { figureEightKnot };
