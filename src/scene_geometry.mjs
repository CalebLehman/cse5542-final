import { HierarchyNode }
    from "./hierarchy_node.mjs"
import { getCube, getPlane, fromPath, fromPathAnim }
    from "./primitives.mjs"

var pillar = null;
var knotA  = null;

function initGeometry(gl) {
    pillar = new HierarchyNode(
        getCube(gl),
        [0.0, 0.0, 0.0],
        {angle: 0.0, axis: [0.0, 1.0, 0.0]},
        [1.0, 1.0, 1.0]
    );

    initKnotA(gl);
}

function getPillar() {
    if (!pillar) {
        console.log("Retrieving uninitialized geometry");
    }
    return pillar;
}

var animating  = false;
var animStart  = null;
var animLength = 0;
function animateKnotA(length) {
    animating  = true;
    var date   = new Date();
    animStart  = date.getTime();
    animLength = length;
}

const knotAColor    = [0.0, 1.0, 0.0, 1.0];
const knotASpecular = [1.0, 1.0, 1.0, 1.0];
const knotAShine    = 100.0;
const knotARadius   = 0.2;
const knotAP        = 3;
const knotAQ        = 2;

const knotATDivisions = 300;
const knotAPDivisions = 128;
const knotAQDivisions = 32;
var   knotAPathPos;
var   knotAPathNormal;
var   knotAPathBinormal;
function initKnotA(gl) {
    const p = knotAP;
    const q = knotAQ;

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

    knotAPathPos      = new Array();
    knotAPathNormal   = new Array();
    knotAPathBinormal = new Array();
    for (var i = 0; i < knotATDivisions; ++i) {
        var t = -1.0 + 2 * i / knotATDivisions;
        knotAPathPos.push(pathPos(t));
        knotAPathNormal.push(pathNormal(t));
        knotAPathBinormal.push(pathBinormal(t));
    }
    // For periodicity
    knotAPathPos.push(pathPos(0));
    knotAPathNormal.push(pathNormal(0));
    knotAPathBinormal.push(pathBinormal(0));

    setKnotA(gl);
}

function setKnotA(gl) {
    const p = knotAP;
    const q = knotAQ;

    const indexer = function(t) {
        return Math.floor(
            0.5 + knotATDivisions * (t + 1.0) / 2.0
        );
    }

    const pathPos = function(t) {
        var idx = indexer(t);
        return vec3.clone(knotAPathPos[idx]);
    };

    const pathNormal = function(t) {
        var idx = indexer(t);
        return vec3.clone(knotAPathNormal[idx]);
    };

    const pathBinormal = function(t) {
        var idx = indexer(t);
        return vec3.clone(knotAPathBinormal[idx]);
    };

    var knotDrawable = fromPathAnim(
        gl,
        pathPos,
        pathNormal,
        pathBinormal,
        knotARadius,
        knotAPDivisions,
        knotAQDivisions,
        knotAColor,
        knotASpecular,
        knotAShine
    );

    knotA = new HierarchyNode(
        knotDrawable,
        [0.0, 0.0, 0.0],
        {angle: 0.0, axis: [0.0, 1.0, 0.0]},
        [1.0, 1.0, 1.0]
    );
}

function getKnotA(gl) {
    if (!knotA) {
        console.log("Retrieving uninitialized geometry");
    }

    if (animating) {
        // Recompute and check if done
        var date          = new Date();
        var milliseconds  = date.getTime() - animStart;
        var tOffset       = 1.0 * (milliseconds - animLength) / animLength;

        const verticesPerRing = knotAQDivisions * 2 * 3;
        if (milliseconds > animLength) {
            animating = false;
            animStart = null;
            knotA.drawable.offset = knotA.drawable.numItems;
        } else {
            knotA.drawable.offset = Math.floor(
                0.5 + (knotA.drawable.numItems * (1.0 + tOffset)) / verticesPerRing
            ) * verticesPerRing;
        }
    } else {
        knotA.drawable.offset = knotA.drawable.numItems;
    }

    return knotA;
}

export { initGeometry, getPillar, getKnotA, animateKnotA };
