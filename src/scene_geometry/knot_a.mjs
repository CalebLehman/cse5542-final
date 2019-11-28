import { Geometry }
    from "../common/geometry.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"
import { fromPathAnim }
    from "../common/primitives.mjs"
import { getRopeTexture }
    from "../textures/rope_texture.mjs"

import { getCheckerboardTexture } // TODO
    from "../textures/checkerboard_texture.mjs"

var knotA = (function() {
    var knot = null;

    const highPoly  = {
        pDivisions: 256,
        qDivisions: 32,
    };
    const lowPoly   = {
        pDivisions: 32,
        qDivisions: 8,
    };
    var currentPoly = null;

    const color    = [0.0, 1.0, 0.0, 1.0];
    const specular = [1.0, 1.0, 1.0, 1.0];
    const shine    = 100.0;
    const radius   = 0.2;
    const p        = 3;
    const q        = 2;

    const tDivisions      = 300;
    var   sampledPos      = null;
    var   sampledNormal   = null;
    var   sampledBinormal = null;
    function samplePath(gl) {
        const factor = 2 * Math.PI * Math.PI * Math.sqrt(q*q + 9.0*p*p);
        var pathPos = function(t) {
            var u = 2 * Math.PI * t * p;
            if (u >= 0.0) {
                return vec3.fromValues(
                    Math.cos(u) * (1 + Math.cos(q * u / p) / 2.0),
                    Math.sin(q * u / p) / 2.0,
                    Math.sin(u) * (1 + Math.cos(q * u / p) / 2.0)
                );
            } else {
                return vec3.fromValues(
                    3.0 / 2.0,
                    2.0 * Math.PI * q * u / factor,
                    6.0 * Math.PI * p * u / factor
                );
            };
        };

        const h = 0.01;
        var pathFirstDerivative = function(t) {
            var f_x   = pathPos(t);
            var f_x_h = pathPos(t-h);
            vec3.subtract(f_x, f_x, f_x_h);
            vec3.scale(f_x, f_x, 1.0 / h);
            return f_x;
        };

        var pathTangent = function(t) {
            var first = pathFirstDerivative(t);
            vec3.normalize(first, first);
            return first;
        };

        var pathBinormal = function(t) {
            var first  = pathFirstDerivative(t);
            var second = vec3.fromValues(0.0, 1.0, 0.0);
            vec3.cross(first, first, second);
            vec3.normalize(first, first);
            return first;
        };

        var pathNormal = function(t) {
            var tangent  = pathTangent(t);
            var binormal = pathBinormal(t);
            vec3.cross(tangent, binormal, tangent);
            return tangent;
        };

        sampledPos      = new Array();
        sampledNormal   = new Array();
        sampledBinormal = new Array();
        for (var i = 0; i < tDivisions; ++i) {
            var t = -1.0 + 2 * i / tDivisions;
            sampledPos.push(pathPos(t));
            sampledNormal.push(pathNormal(t));
            sampledBinormal.push(pathBinormal(t));
        }
        // For periodicity
        sampledPos.push(pathPos(0));
        sampledNormal.push(pathNormal(0));
        sampledBinormal.push(pathBinormal(0));
    }

    function init(gl, poly) {
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

        if (!sampledPos) {
            samplePath(gl);
        }

        const indexer = function(t) {
            return Math.floor(
                0.5 + tDivisions * (t + 1.0) / 2.0
            );
        }

        const pathPos = function(t) {
            var idx = indexer(t);
            return vec3.clone(sampledPos[idx]);
        };

        const pathNormal = function(t) {
            var idx = indexer(t);
            return vec3.clone(sampledNormal[idx]);
        };

        const pathBinormal = function(t) {
            var idx = indexer(t);
            return vec3.clone(sampledBinormal[idx]);
        };

        var knotDrawable = fromPathAnim(
            gl,
            pathPos,
            pathNormal,
            pathBinormal,
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
            getCheckerboardTexture(gl)
        );
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

    return new Geometry(init, animate, get);
})();

export { knotA };
