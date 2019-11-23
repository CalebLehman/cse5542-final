import { Buffer }
    from "./buffer.mjs"
import { Drawable }
    from "./drawable.mjs"

const unitCubeColor    = [1.0, 0.0, 0.0, 1.0];
const unitCubeSpecular = [1.0, 1.0, 1.0, 1.0];
const unitCubeShine    = 100;
var unitCube = null;

function getCube() {
    if (!unitCube) {
        console.log("Primitive uninitialized");
    }
    return unitCube;
}

function initCube(gl) {
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
        +0.0,-1.0,+0.0,
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

    unitCube = new Drawable(
        posBuffer,
        normalBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shineBuffer
    );
}

const unitPlaneColor    = [1.0, 0.0, 0.0, 1.0];
const unitPlaneSpecular = [1.0, 1.0, 1.0, 1.0];
const unitPlaneShine    = 100;
var unitPlane = null;

function getPlane() {
    if (!unitPlane) {
        console.log("Primitive uninitialized");
    }
    return unitPlane;
}

function initPlane(gl) {
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

    unitPlane = new Drawable(
        posBuffer,
        normalBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shineBuffer
    );
}
export { initCube, getCube, initPlane, getPlane };
