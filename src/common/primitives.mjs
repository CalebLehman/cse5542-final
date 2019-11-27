import { Buffer }
    from "./buffer.mjs"
import { Drawable }
    from "./drawable.mjs"

const unitCubeColor    = [1.0, 0.0, 0.0, 1.0];
const unitCubeSpecular = [1.0, 1.0, 1.0, 1.0];
const unitCubeShine    = 100.0;

function getCube(gl) {
    var position = [
        +1.0,+1.0,+1.0, // +z face
        -1.0,+1.0,+1.0,
        -1.0,-1.0,+1.0,
        -1.0,-1.0,+1.0,
        +1.0,-1.0,+1.0,
        +1.0,+1.0,+1.0,

        +1.0,+1.0,-1.0, // -z face
        +1.0,-1.0,-1.0,
        -1.0,-1.0,-1.0,
        -1.0,-1.0,-1.0,
        -1.0,+1.0,-1.0,
        +1.0,+1.0,-1.0,

        +1.0,+1.0,+1.0, // +x face
        +1.0,-1.0,+1.0,
        +1.0,-1.0,-1.0,
        +1.0,-1.0,-1.0,
        +1.0,+1.0,-1.0,
        +1.0,+1.0,+1.0,

        -1.0,+1.0,+1.0, // -x face
        -1.0,+1.0,-1.0,
        -1.0,-1.0,-1.0,
        -1.0,-1.0,-1.0,
        -1.0,-1.0,+1.0,
        -1.0,+1.0,+1.0,

        +1.0,+1.0,+1.0, // +y face
        +1.0,+1.0,-1.0,
        -1.0,+1.0,-1.0,
        -1.0,+1.0,-1.0,
        -1.0,+1.0,+1.0,
        +1.0,+1.0,+1.0,

        +1.0,-1.0,+1.0, // -y face
        -1.0,-1.0,+1.0,
        -1.0,-1.0,-1.0,
        -1.0,-1.0,-1.0,
        +1.0,-1.0,-1.0,
        +1.0,-1.0,+1.0
    ];
    var posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(position),
        gl.STATIC_DRAW
    );
    posBuffer = new Buffer(
        posBuffer,
        3
    );

    var barycentric = [
        1.0, 0.0, 0.0, // +z face
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,

        1.0, 0.0, 0.0, // -z face
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,

        1.0, 0.0, 0.0, // +x face
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,

        1.0, 0.0, 0.0, // -x face
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,

        1.0, 0.0, 0.0, // +y face
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,

        1.0, 0.0, 0.0, // -y face
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
    ];
    var baryBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, baryBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(barycentric),
        gl.STATIC_DRAW
    );
    baryBuffer = new Buffer(
        baryBuffer,
        3
    );

    var normal = [
        +0.0,+0.0,+1.0, // +z face
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,

        +0.0,+0.0,-1.0, // +z face
        +0.0,+0.0,-1.0,
        +0.0,+0.0,-1.0,
        +0.0,+0.0,-1.0,
        +0.0,+0.0,-1.0,
        +0.0,+0.0,-1.0,

        +1.0,+0.0,+0.0, // +x face
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,

        -1.0,+0.0,+0.0, // +x face
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0,

        +0.0,+1.0,+0.0, // +y face
        +0.0,+1.0,+0.0,
        +0.0,+1.0,+0.0,
        +0.0,+1.0,+0.0,
        +0.0,+1.0,+0.0,
        +0.0,+1.0,+0.0,

        +0.0,-1.0,+0.0, // +y face
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0
    ];
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normal),
        gl.STATIC_DRAW
    );
    normalBuffer = new Buffer(
        normalBuffer,
        3
    );

    var ambient  = [];
    var diffuse  = [];
    var specular = [];
    var shine    = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...unitCubeColor);
        diffuse.push (...unitCubeColor);
        specular.push(...unitCubeSpecular);
        shine.push   (unitCubeShine);
    }
    var ambientBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ambientBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(ambient),
        gl.STATIC_DRAW
    );
    ambientBuffer = new Buffer(
        ambientBuffer,
        4
    );
    var diffuseBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, diffuseBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(diffuse),
        gl.STATIC_DRAW
    );
    diffuseBuffer = new Buffer(
        diffuseBuffer,
        4
    );
    var specularBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, specularBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(specular),
        gl.STATIC_DRAW
    );
    specularBuffer = new Buffer(
        specularBuffer,
        4
    );
    var shineBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shineBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(shine),
        gl.STATIC_DRAW
    );
    shineBuffer = new Buffer(
        shineBuffer,
        1
    );

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shineBuffer,
        shine.length,
        0
    );
}

const unitPlaneColor    = [1.0, 0.0, 0.0, 1.0];
const unitPlaneSpecular = [1.0, 1.0, 1.0, 1.0];
const unitPlaneShine    = 100.0;

function getPlane(gl) {
    var position = [
        +1.0,+0.0,+1.0,
        +1.0,+0.0,-1.0,
        -1.0,+0.0,-1.0,
        -1.0,+0.0,-1.0,
        -1.0,+0.0,+1.0,
        +1.0,+0.0,+1.0
    ];
    var posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(position),
        gl.STATIC_DRAW
    );
    posBuffer = new Buffer(
        posBuffer,
        3
    );

    var barycentric = [
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
    ];
    var baryBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, baryBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(barycentric),
        gl.STATIC_DRAW
    );
    baryBuffer = new Buffer(
        baryBuffer,
        3
    );

    var normal = [
        +0.0,+1.0,+0.0,
        +0.0,+1.0,+0.0,
        +0.0,+1.0,+0.0,
        +0.0,+1.0,+0.0,
        +0.0,+1.0,+0.0,
        +0.0,+1.0,+0.0
    ];
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normal),
        gl.STATIC_DRAW
    );
    normalBuffer = new Buffer(
        normalBuffer,
        3
    );

    var ambient  = [];
    var diffuse  = [];
    var specular = [];
    var shine    = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...unitCubeColor);
        diffuse.push (...unitCubeColor);
        specular.push(...unitCubeSpecular);
        shine.push   (unitCubeShine);
    }
    var ambientBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ambientBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(ambient),
        gl.STATIC_DRAW
    );
    ambientBuffer = new Buffer(
        ambientBuffer,
        4
    );
    var diffuseBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, diffuseBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(diffuse),
        gl.STATIC_DRAW
    );
    diffuseBuffer = new Buffer(
        diffuseBuffer,
        4
    );
    var specularBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, specularBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(specular),
        gl.STATIC_DRAW
    );
    specularBuffer = new Buffer(
        specularBuffer,
        4
    );
    var shineBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shineBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(shine),
        gl.STATIC_DRAW
    );
    shineBuffer = new Buffer(
        shineBuffer,
        1
    );

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shineBuffer,
        shine.length,
        0
    );
}

function fromPath(
    gl,
    pathPos,            // [0, 1] -> R^3
    pathNormal,         // [0, 1] -> R^3
    pathBinormal,       // [0, 1] -> R^3
    radius,
    lengthDivisions,
    radialDivisions,
    pathColor,
    pathSpecular,
    pathShine
) {
    var computePosition = function(i, j) {
        j = ((j % radialDivisions) + radialDivisions) % radialDivisions;
        var u = 1.0 * i / lengthDivisions;
        var v = 1.0 * j / radialDivisions;
        var r = pathPos(u);
        var n = pathNormal(u);
        var b = pathBinormal(u);
        vec3.scaleAndAdd(r, r, n, radius * Math.cos(2.0 * Math.PI * v));
        vec3.scaleAndAdd(r, r, b, radius * Math.sin(2.0 * Math.PI * v));
        return r;
    };

    var computeNormal = function(i, j) {
        j = ((j % radialDivisions) + radialDivisions) % radialDivisions;
        var u = 1.0 * i / lengthDivisions;
        var v = 1.0 * j / radialDivisions;
        var n = pathNormal(u);
        vec3.scale(n, n, radius * Math.cos(2.0 * Math.PI * v));
        var b = pathBinormal(u);
        vec3.scaleAndAdd(n, n, b, radius * Math.sin(2.0 * Math.PI * v));
        return n;
    };

    var position = [];
    for (var i = 0; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            // j is offset "backwards" more each ring
            // to ensure that quad-wireframe hack works
            // see "quad_wireframe.mjs" to see why
            position.push(...computePosition(i, j-i));
            position.push(...computePosition(i, j-i+1));
            position.push(...computePosition(i+1, j-i+1));
            position.push(...computePosition(i+1, j-i+1));
            position.push(...computePosition(i+1, j-i));
            position.push(...computePosition(i, j-i));
        }
    }
    var posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(position),
        gl.STATIC_DRAW
    );
    posBuffer = new Buffer(
        posBuffer,
        3
    );

    var barycentric = [];
    for (var i = 0; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            barycentric.push(1.0, 0.0, 0.0);
            barycentric.push(0.0, 1.0, 0.0);
            barycentric.push(0.0, 0.0, 1.0);
            barycentric.push(1.0, 0.0, 0.0);
            barycentric.push(0.0, 1.0, 0.0);
            barycentric.push(0.0, 0.0, 1.0);
        }
    }
    var baryBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, baryBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(barycentric),
        gl.STATIC_DRAW
    );
    baryBuffer = new Buffer(
        baryBuffer,
        3
    );

    var normal = [];
    for (var i = 0; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            // j is offset "backwards" more each ring
            // to ensure that quad-wireframe hack works
            // see "quad_wireframe.mjs" to see why
            normal.push(...computeNormal(i, j-i));
            normal.push(...computeNormal(i, j-i+1));
            normal.push(...computeNormal(i+1, j-i+1));
            normal.push(...computeNormal(i+1, j-i+1));
            normal.push(...computeNormal(i+1, j-i));
            normal.push(...computeNormal(i, j-i));
        }
    }
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normal),
        gl.STATIC_DRAW
    );
    normalBuffer = new Buffer(
        normalBuffer,
        3
    );

    var ambient  = [];
    var diffuse  = [];
    var specular = [];
    var shine    = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...pathColor);
        diffuse.push (...pathColor);
        specular.push(...pathSpecular);
        shine.push   (pathShine);
    }
    var ambientBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ambientBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(ambient),
        gl.STATIC_DRAW
    );
    ambientBuffer = new Buffer(
        ambientBuffer,
        4
    );
    var diffuseBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, diffuseBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(diffuse),
        gl.STATIC_DRAW
    );
    diffuseBuffer = new Buffer(
        diffuseBuffer,
        4
    );
    var specularBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, specularBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(specular),
        gl.STATIC_DRAW
    );
    specularBuffer = new Buffer(
        specularBuffer,
        4
    );
    var shineBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shineBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(shine),
        gl.STATIC_DRAW
    );
    shineBuffer = new Buffer(
        shineBuffer,
        1
    );

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shineBuffer,
        shine.length,
        0
    );
}

/**
 * Path functions map from [-1, 1] -> R^3.
 * Creates drawable of "double length" (returned drawable
 * can have drawable.offset as large as drawable.numItems)
 * so that it can be "animated" relatively cheaply by simply
 * updating drawable.offset appropriately.
 * So the drawable is animated from the interval [-1, 0]
 * to the interval [0, 1].
 */
function fromPathAnim(
    gl,
    pathPos,            // [-1, 1] -> R^3
    pathNormal,         // [-1, 1] -> R^3
    pathBinormal,       // [-1, 1] -> R^3
    radius,
    lengthDivisions,
    radialDivisions,
    pathColor,
    pathSpecular,
    pathShine
) {
    var computePosition = function(i, j) {
        j = ((j % radialDivisions) + radialDivisions) % radialDivisions;
        var u = 1.0 * i / lengthDivisions;
        var v = 1.0 * j / radialDivisions;
        var r = pathPos(u);
        var n = pathNormal(u);
        var b = pathBinormal(u);
        vec3.scaleAndAdd(r, r, n, radius * Math.cos(2.0 * Math.PI * v));
        vec3.scaleAndAdd(r, r, b, radius * Math.sin(2.0 * Math.PI * v));
        return r;
    };

    var computeNormal = function(i, j) {
        j = ((j % radialDivisions) + radialDivisions) % radialDivisions;
        var u = 1.0 * i / lengthDivisions;
        var v = 1.0 * j / radialDivisions;
        var n = pathNormal(u);
        vec3.scale(n, n, radius * Math.cos(2.0 * Math.PI * v));
        var b = pathBinormal(u);
        vec3.scaleAndAdd(n, n, b, radius * Math.sin(2.0 * Math.PI * v));
        return n;
    };

    var position = [];
    for (var i = -lengthDivisions; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            // j is offset "backwards" more each ring
            // to ensure that quad-wireframe hack works
            // see "quad_wireframe.mjs" to see why
            position.push(...computePosition(i, j-i));
            position.push(...computePosition(i, j-i+1));
            position.push(...computePosition(i+1, j-i+1));
            position.push(...computePosition(i+1, j-i+1));
            position.push(...computePosition(i+1, j-i));
            position.push(...computePosition(i, j-i));
        }
    }
    var posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(position),
        gl.STATIC_DRAW
    );
    posBuffer = new Buffer(
        posBuffer,
        3
    );

    var barycentric = [];
    for (var i = -lengthDivisions; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            barycentric.push(1.0, 0.0, 0.0);
            barycentric.push(0.0, 1.0, 0.0);
            barycentric.push(0.0, 0.0, 1.0);
            barycentric.push(1.0, 0.0, 0.0);
            barycentric.push(0.0, 1.0, 0.0);
            barycentric.push(0.0, 0.0, 1.0);
        }
    }
    var baryBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, baryBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(barycentric),
        gl.STATIC_DRAW
    );
    baryBuffer = new Buffer(
        baryBuffer,
        3
    );

    var normal = [];
    for (var i = -lengthDivisions; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            // j is offset "backwards" more each ring
            // to ensure that quad-wireframe hack works
            // see "quad_wireframe.mjs" to see why
            normal.push(...computeNormal(i, j-i));
            normal.push(...computeNormal(i, j-i+1));
            normal.push(...computeNormal(i+1, j-i+1));
            normal.push(...computeNormal(i+1, j-i+1));
            normal.push(...computeNormal(i+1, j-i));
            normal.push(...computeNormal(i, j-i));
        }
    }
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(normal),
        gl.STATIC_DRAW
    );
    normalBuffer = new Buffer(
        normalBuffer,
        3
    );

    var ambient  = [];
    var diffuse  = [];
    var specular = [];
    var shine    = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...pathColor);
        diffuse.push (...pathColor);
        specular.push(...pathSpecular);
        shine.push   (pathShine);
    }
    var ambientBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ambientBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(ambient),
        gl.STATIC_DRAW
    );
    ambientBuffer = new Buffer(
        ambientBuffer,
        4
    );
    var diffuseBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, diffuseBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(diffuse),
        gl.STATIC_DRAW
    );
    diffuseBuffer = new Buffer(
        diffuseBuffer,
        4
    );
    var specularBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, specularBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(specular),
        gl.STATIC_DRAW
    );
    specularBuffer = new Buffer(
        specularBuffer,
        4
    );
    var shineBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shineBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(shine),
        gl.STATIC_DRAW
    );
    shineBuffer = new Buffer(
        shineBuffer,
        1
    );

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shineBuffer,
        shine.length / 2,
        0
    );
}

export { getCube, getPlane, fromPath, fromPathAnim };