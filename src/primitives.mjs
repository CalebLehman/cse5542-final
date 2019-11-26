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
        3,
        position.length / 3
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
        3,
        barycentric.length / 3
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
        3,
        normal.length / 3
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
        4,
        ambient.length / 4
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
        4,
        diffuse.length / 4
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
        4,
        specular.length / 4
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
        1,
        shine.length
    );

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shineBuffer
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
        3,
        position.length / 3
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
        3,
        barycentric.length / 3
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
        3,
        normal.length / 3
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
        4,
        ambient.length / 4
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
        4,
        diffuse.length / 4
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
        4,
        specular.length / 4
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
        1,
        shine.length
    );

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shineBuffer
    );
}

function fromPath(
    gl,
    pathPos,
    pathNormal,
    pathBinormal,
    radius,
    lengthDivisions,
    radialDivisions,
    pathColor,
    pathSpecular,
    pathShine
) {
    var computePosition = function(i, j) {
        j = j % radialDivisions;
        var u = 1.0 * i / lengthDivisions;
        var v = 1.0 * j / radialDivisions;
        var r = pathPos(u);
        var n = pathNormal(u);
        vec3.scale(n, n, Math.cos(2.0 * Math.PI * v));
        var b = pathBinormal(u);
        vec3.scale(b, b, Math.sin(2.0 * Math.PI * v));
        vec3.add(r, r, n);
        vec3.add(r, r, b);
        return r;
    };

    var computeNormal = function(i, j) {
        j = j % radialDivisions;
        var u = 1.0 * i / lengthDivisions;
        var v = 1.0 * j / radialDivisions;
        var n = pathNormal(u);
        vec3.scale(n, n, Math.cos(2.0 * Math.PI * v));
        var b = pathBinormal(u);
        vec3.scale(b, b, Math.sin(2.0 * Math.PI * v));
        vec3.add(n, n, b);
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
        3,
        position.length / 3
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
        3,
        barycentric.length / 3
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
        3,
        normal.length / 3
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
        4,
        ambient.length / 4
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
        4,
        diffuse.length / 4
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
        4,
        specular.length / 4
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
        1,
        shine.length
    );

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shineBuffer
    );
}

const torusColor    = [0.0, 1.0, 0.0, 1.0];
const torusSpecular = [1.0, 1.0, 1.0, 1.0];
const torusShine    = 100.0;
const torusRadius   = 1.0;
function getTorus(gl, p, q) {
    var pathPos = function(t) {
        return vec3.fromValues(0.0, t, 0.0);
    };
    var pathNormal = function(t) {
        return vec3.fromValues(1.0, 0.0, 0.0);
    };
    var pathBinormal = function(t) {
        return vec3.fromValues(0.0, 0.0, 1.0);
    };

    return fromPath(
        gl,
        pathPos,
        pathNormal,
        pathBinormal,
        torusRadius,
        2,
        6,
        torusColor,
        torusSpecular,
        torusShine
    );
}

export { getCube, getPlane, getTorus };
