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

        +0.0,+0.0,-1.0, // -z face
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

        -1.0,+0.0,+0.0, // -x face
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

        +0.0,-1.0,+0.0, // -y face
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

    var texture = [
        1.0,1.0, // +z face
        1.0,0.0,
        0.0,0.0,
        0.0,0.0,
        0.0,1.0,
        1.0,1.0,

        1.0,1.0, // -z face
        1.0,0.0,
        0.0,0.0,
        0.0,0.0,
        0.0,1.0,
        1.0,1.0,

        1.0,1.0, // +x face
        1.0,0.0,
        0.0,0.0,
        0.0,0.0,
        0.0,1.0,
        1.0,1.0,

        1.0,1.0, // -x face
        1.0,0.0,
        0.0,0.0,
        0.0,0.0,
        0.0,1.0,
        1.0,1.0,

        1.0,1.0, // +y face
        1.0,0.0,
        0.0,0.0,
        0.0,0.0,
        0.0,1.0,
        1.0,1.0,

        1.0,1.0, // -y face
        1.0,0.0,
        0.0,0.0,
        0.0,0.0,
        0.0,1.0,
        1.0,1.0
    ];
    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(texture),
        gl.STATIC_DRAW
    );
    textureBuffer = new Buffer(
        textureBuffer,
        2
    );

    var ambient  = [];
    var diffuse  = [];
    var specular = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...unitCubeColor);
        diffuse.push (...unitCubeColor);
        specular.push(...unitCubeSpecular);
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

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        unitCubeShine,
        position.length / 3,
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

    var texture = [
        1.0,0.0,
        1.0,1.0,
        0.0,1.0,
        0.0,1.0,
        0.0,0.0,
        1.0,0.0
    ];
    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(texture),
        gl.STATIC_DRAW
    );
    textureBuffer = new Buffer(
        textureBuffer,
        2
    );

    var ambient  = [];
    var diffuse  = [];
    var specular = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...unitPlaneColor);
        diffuse.push (...unitPlaneColor);
        specular.push(...unitPlaneSpecular);
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

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        unitPlaneShine,
        position.length / 3,
        0
    );
}

const unitDiskColor    = [1.0, 0.0, 0.0, 1.0];
const unitDiskSpecular = [1.0, 1.0, 1.0, 1.0];
const unitDiskShine    = 100.0;

function getDisk(gl, radialDivisions) {
    var position = [];
    for (var i = 0; i < radialDivisions; ++i) {
        const currAngle = 2 * Math.PI * i / radialDivisions;
        const nextAngle = 2 * Math.PI * (i+1) / radialDivisions;
        position.push(
            +0.0,
            +0.0,
            +0.0
        );
        position.push(
            +1.0 * Math.cos(currAngle),
            +0.0,
            -1.0 * Math.sin(currAngle)
        );
        position.push(
            +1.0 * Math.cos(nextAngle),
            +0.0,
            -1.0 * Math.sin(nextAngle)
        );
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
    for (var i = 0; i < radialDivisions; ++i) {
        barycentric.push(1.0, 0.0, 0.0);
        barycentric.push(0.0, 1.0, 0.0);
        barycentric.push(0.0, 0.0, 1.0);
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
    for (var i = 0; i < radialDivisions; ++i) {
        normal.push(0.0, 1.0, 0.0);
        normal.push(0.0, 1.0, 0.0);
        normal.push(0.0, 1.0, 0.0);
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

    var texture = [];
    for (var i = 0; i < radialDivisions; ++i) {
        const currAngle = 2 * Math.PI * i / radialDivisions;
        const nextAngle = 2 * Math.PI * (i+1) / radialDivisions;
        texture.push(0.0, 0.0);
        texture.push(Math.cos(currAngle), -Math.sin(currAngle));
        texture.push(Math.cos(nextAngle), -Math.sin(nextAngle));
    }
    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(texture),
        gl.STATIC_DRAW
    );
    textureBuffer = new Buffer(
        textureBuffer,
        2
    );

    var ambient  = [];
    var diffuse  = [];
    var specular = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...unitDiskColor);
        diffuse.push (...unitDiskColor);
        specular.push(...unitDiskSpecular);
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

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        unitDiskShine,
        position.length / 3,
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

    // TODO
    var computeTexture = function(i, j) {
        j = ((j % radialDivisions) + radialDivisions) % radialDivisions;
        var u = 1.0 * i / lengthDivisions;
        var v = 1.0 * j / radialDivisions;
        return [u, v];
    };

    var position = [];
    for (var i = 0; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            position.push(...computePosition(i+0, j+0));
            position.push(...computePosition(i+0, j+1));
            position.push(...computePosition(i+1, j+1));
            position.push(...computePosition(i+1, j+1));
            position.push(...computePosition(i+1, j+0));
            position.push(...computePosition(i+0, j+0));
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
            normal.push(...computeNormal(i+0, j+0));
            normal.push(...computeNormal(i+0, j+1));
            normal.push(...computeNormal(i+1, j+1));
            normal.push(...computeNormal(i+1, j+1));
            normal.push(...computeNormal(i+1, j+0));
            normal.push(...computeNormal(i+0, j+0));
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

    var texture = [];
    for (var i = 0; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            texture.push(...computeTexture(i+0, j+0));
            texture.push(...computeTexture(i+0, j+1));
            texture.push(...computeTexture(i+1, j+1));
            texture.push(...computeTexture(i+1, j+1));
            texture.push(...computeTexture(i+1, j+0));
            texture.push(...computeTexture(i+0, j+0));
        }
    }
    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(texture),
        gl.STATIC_DRAW
    );
    textureBuffer = new Buffer(
        textureBuffer,
        2
    );

    var ambient  = [];
    var diffuse  = [];
    var specular = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...pathColor);
        diffuse.push (...pathColor);
        specular.push(...pathSpecular);
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

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        pathShine,
        position.length / 3,
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

    // TODO
    var computeTexture = function(i, j) {
        var u = 8.0 * i / lengthDivisions;
        var v = 4.0 * j / radialDivisions;
        return [u, v];
    };

    var position = [];
    for (var i = -lengthDivisions; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            position.push(...computePosition(i+0, j+0));
            position.push(...computePosition(i+0, j+1));
            position.push(...computePosition(i+1, j+1));
            position.push(...computePosition(i+1, j+1));
            position.push(...computePosition(i+1, j+0));
            position.push(...computePosition(i+0, j+0));
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
            normal.push(...computeNormal(i+0, j+0));
            normal.push(...computeNormal(i+0, j+1));
            normal.push(...computeNormal(i+1, j+1));
            normal.push(...computeNormal(i+1, j+1));
            normal.push(...computeNormal(i+1, j+0));
            normal.push(...computeNormal(i+0, j+0));
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

    // Texture buffer half length of others
    // because it doesn't animate
    var texture = [];
    for (var i = 0; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            texture.push(...computeTexture(i+0, j+0));
            texture.push(...computeTexture(i+0, j+1));
            texture.push(...computeTexture(i+1, j+1));
            texture.push(...computeTexture(i+1, j+1));
            texture.push(...computeTexture(i+1, j+0));
            texture.push(...computeTexture(i+0, j+0));
        }
    }
    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(texture),
        gl.STATIC_DRAW
    );
    textureBuffer = new Buffer(
        textureBuffer,
        2
    );


    var ambient  = [];
    var diffuse  = [];
    var specular = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...pathColor);
        diffuse.push (...pathColor);
        specular.push(...pathSpecular);
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

    return new Drawable(
        posBuffer,
        baryBuffer,
        normalBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        pathShine,
        (position.length / 3) / 2,
        0
    );
}

export { getCube, getPlane, getDisk, fromPath, fromPathAnim };
