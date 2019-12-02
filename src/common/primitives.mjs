import { Buffer }
    from "./buffer.mjs"
import { Drawable }
    from "./drawable.mjs"

function getCube(
    gl,
    materialAmbient,
    materialDiffuse,
    materialSpecular,
    materialShine
) {
    const position = [
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

    const barycentric = [
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

    const tangent = [
        +0.0,-1.0,+0.0, // +z face
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,

        +0.0,-1.0,+0.0, // -z face
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        
        +0.0,-1.0,+0.0, // +x face
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,

        +0.0,-1.0,+0.0, // -x face
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,
        +0.0,-1.0,+0.0,

        +0.0,+0.0,+1.0, // +y face
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,

        +0.0,+0.0,+1.0, // -y face
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0
    ];
    var tangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tangentBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(tangent),
        gl.STATIC_DRAW
    );
    tangentBuffer = new Buffer(
        tangentBuffer,
        3
    );

    const normal = [
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

    const bitangent = [
        +1.0,+0.0,+0.0, // +z face
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,

        -1.0,+0.0,+0.0, // -z face
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0,

        +0.0,+0.0,-1.0, // +x face
        +0.0,+0.0,-1.0,
        +0.0,+0.0,-1.0,
        +0.0,+0.0,-1.0,
        +0.0,+0.0,-1.0,
        +0.0,+0.0,-1.0,

        +0.0,+0.0,+1.0, // -x face
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,

        +1.0,+0.0,+0.0, // +y face
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,

        -1.0,+0.0,+0.0, // -y face
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0,
        -1.0,+0.0,+0.0
    ];
    var bitangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bitangentBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(bitangent),
        gl.STATIC_DRAW
    );
    bitangentBuffer = new Buffer(
        bitangentBuffer,
        3
    );
        
    const texture = [
        1.0,0.0, // +z face
        0.0,0.0,
        0.0,1.0,
        0.0,1.0,
        1.0,1.0,
        1.0,0.0,

        0.0,0.0, // -z face
        0.0,1.0,
        1.0,1.0,
        1.0,1.0,
        1.0,0.0,
        0.0,0.0,

        0.0,0.0, // +x face
        0.0,1.0,
        1.0,1.0,
        1.0,1.0,
        1.0,0.0,
        0.0,0.0,

        1.0,0.0, // -x face
        0.0,0.0,
        0.0,1.0,
        0.0,1.0,
        1.0,1.0,
        1.0,0.0,

        1.0,1.0, // +y face
        1.0,0.0,
        0.0,0.0,
        0.0,0.0,
        0.0,1.0,
        1.0,1.0,

        0.0,1.0, // -y face
        1.0,1.0,
        1.0,0.0,
        1.0,0.0,
        0.0,0.0,
        0.0,1.0
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

    const ambient  = [];
    const diffuse  = [];
    const specular = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...materialAmbient);
        diffuse.push (...materialDiffuse);
        specular.push(...materialSpecular);
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
        tangentBuffer,
        normalBuffer,
        bitangentBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        materialShine,
        position.length / 3,
        0
    );
}

function getPlane(
    gl,
    materialAmbient,
    materialDiffuse,
    materialSpecular,
    materialShine
) {
    const position = [
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

    const barycentric = [
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

    const tangent = [
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0,
        +0.0,+0.0,+1.0
    ];
    var tangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tangentBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(tangent),
        gl.STATIC_DRAW
    );
    tangentBuffer = new Buffer(
        tangentBuffer,
        3
    );

    const normal = [
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

    const bitangent = [
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0,
        +1.0,+0.0,+0.0
    ];
    var bitangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bitangentBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(bitangent),
        gl.STATIC_DRAW
    );
    bitangentBuffer = new Buffer(
        bitangentBuffer,
        3
    );

    const texture = [
        1.0,1.0,
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

    const ambient  = [];
    const diffuse  = [];
    const specular = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...materialAmbient);
        diffuse.push (...materialDiffuse);
        specular.push(...materialSpecular);
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
        tangentBuffer,
        normalBuffer,
        bitangentBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        materialShine,
        position.length / 3,
        0
    );
}

function getDisk(
    gl,
    materialAmbient,
    materialDiffuse,
    materialSpecular,
    materialShine,
    radialDivisions
) {
    const position = [];
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

    const barycentric = [];
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

    const tangent = [];
    for (var i = 0; i < radialDivisions; ++i) {
        tangent.push(0.0, 0.0, 1.0);
        tangent.push(0.0, 0.0, 1.0);
        tangent.push(0.0, 0.0, 1.0);
    }
    var tangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tangentBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(tangent),
        gl.STATIC_DRAW
    );
    tangentBuffer = new Buffer(
        tangentBuffer,
        3
    );

    const normal = [];
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

    const bitangent = [];
    for (var i = 0; i < radialDivisions; ++i) {
        bitangent.push(1.0, 0.0, 0.0);
        bitangent.push(1.0, 0.0, 0.0);
        bitangent.push(1.0, 0.0, 0.0);
    }
    var bitangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bitangentBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(bitangent),
        gl.STATIC_DRAW
    );
    bitangentBuffer = new Buffer(
        bitangentBuffer,
        3
    );

    const texture = [];
    for (var i = 0; i < radialDivisions; ++i) {
        const currAngle = 2 * Math.PI * i / radialDivisions;
        const nextAngle = 2 * Math.PI * (i+1) / radialDivisions;
        texture.push(
            0.5,
            0.5
        );
        texture.push(
            0.5 + 0.5 * Math.cos(currAngle),
            0.5 - 0.5 * Math.sin(currAngle)
        );
        texture.push(
            0.5 + 0.5 * Math.cos(nextAngle),
            0.5 - 0.5 * Math.sin(nextAngle)
        );
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

    const ambient  = [];
    const diffuse  = [];
    const specular = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...materialAmbient);
        diffuse.push (...materialDiffuse);
        specular.push(...materialSpecular);
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
        tangentBuffer,
        normalBuffer,
        bitangentBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        materialShine,
        position.length / 3,
        0
    );
}

function fromPath(
    gl,
    materialAmbient,
    materialDiffuse,
    materialSpecular,
    materialShine,
    pathPos,            // [0, 1] -> R^3
    pathTangent,        // [0, 1] -> R^3
    pathNormal,         // [0, 1] -> R^3
    pathBinormal,       // [0, 1] -> R^3
    radius,
    lengthDivisions,
    radialDivisions,
    textureLengths,
    textureCircums
) {
    const computePosition = function(i, j) {
        j = ((j % radialDivisions) + radialDivisions) % radialDivisions;
        const u = 1.0 * i / lengthDivisions;
        const v = 1.0 * j / radialDivisions;
        const R = pathPos(u);
        const N = pathNormal(u);
        const B = pathBinormal(u);
        vec3.scaleAndAdd(R, R, N, radius * Math.cos(2.0 * Math.PI * v));
        vec3.scaleAndAdd(R, R, B, radius * Math.sin(2.0 * Math.PI * v));
        return R;
    };

    const computeTangent = function(i, j) {
        const u = 1.0 * i / lengthDivisions;
        const T = pathTangent(u);
        vec3.scale(T, T, -1.0);
        return T;
    };

    const computeNormal = function(i, j) {
        j = ((j % radialDivisions) + radialDivisions) % radialDivisions;
        const u = 1.0 * i / lengthDivisions;
        const v = 1.0 * j / radialDivisions;
        const N = pathNormal(u);
        vec3.scale(N, N, radius * Math.cos(2.0 * Math.PI * v));
        const B = pathBinormal(u);
        vec3.scaleAndAdd(N, N, B, radius * Math.sin(2.0 * Math.PI * v));
        return N;
    };

    const computeBitangent = function(i, j) {
        const T = computeTangent(i, j);
        const N = computeNormal(i, j);
        vec3.cross(T, N, T);
        return T;
    };

    const computeTexture = function(i, j) {
        const s = -1.0 * textureCircums * j / radialDivisions;
        const t = -1.0 * textureLengths * i / lengthDivisions;
        return [s, t];
    };

    const position = [];
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

    const barycentric = [];
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

    const tangent = [];
    for (var i = 0; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            tangent.push(...computeTangent(i+0, j+0));
            tangent.push(...computeTangent(i+0, j+1));
            tangent.push(...computeTangent(i+1, j+1));
            tangent.push(...computeTangent(i+1, j+1));
            tangent.push(...computeTangent(i+1, j+0));
            tangent.push(...computeTangent(i+0, j+0));
        }
    }
    var tangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tangentBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(tangent),
        gl.STATIC_DRAW
    );
    tangentBuffer = new Buffer(
        tangentBuffer,
        3
    );

    const normal = [];
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

    const bitangent = [];
    for (var i = 0; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            bitangent.push(...computeBitangent(i+0, j+0));
            bitangent.push(...computeBitangent(i+0, j+1));
            bitangent.push(...computeBitangent(i+1, j+1));
            bitangent.push(...computeBitangent(i+1, j+1));
            bitangent.push(...computeBitangent(i+1, j+0));
            bitangent.push(...computeBitangent(i+0, j+0));
        }
    }
    var bitangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bitangentBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(bitangent),
        gl.STATIC_DRAW
    );
    bitangentBuffer = new Buffer(
        bitangentBuffer,
        3
    );

    const texture = [];
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

    const ambient  = [];
    const diffuse  = [];
    const specular = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...materialAmbient);
        diffuse.push (...materialDiffuse);
        specular.push(...materialSpecular);
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
        tangentBuffer,
        normalBuffer,
        bitangentBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        materialShine,
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
    materialAmbient,
    materialDiffuse,
    materialSpecular,
    materialShine,
    pathPos,            // [-1, 1] -> R^3
    pathTangent,        // [-1, 1] -> R^3
    pathNormal,         // [-1, 1] -> R^3
    pathBinormal,       // [-1, 1] -> R^3
    radius,
    lengthDivisions,
    radialDivisions,
    textureLengths,
    textureCircums
) {
    const computePosition = function(i, j) {
        j = ((j % radialDivisions) + radialDivisions) % radialDivisions;
        const u = 1.0 * i / lengthDivisions;
        const v = 1.0 * j / radialDivisions;
        const r = pathPos(u);
        const n = pathNormal(u);
        const b = pathBinormal(u);
        vec3.scaleAndAdd(r, r, n, radius * Math.cos(2.0 * Math.PI * v));
        vec3.scaleAndAdd(r, r, b, radius * Math.sin(2.0 * Math.PI * v));
        return r;
    };

    const computeTangent = function(i, j) {
        const u = 1.0 * i / lengthDivisions;
        const T = pathTangent(u);
        vec3.scale(T, T, -1.0);
        return T;
    };

    const computeNormal = function(i, j) {
        j = ((j % radialDivisions) + radialDivisions) % radialDivisions;
        const u = 1.0 * i / lengthDivisions;
        const v = 1.0 * j / radialDivisions;
        const N = pathNormal(u);
        vec3.scale(N, N, Math.cos(2.0 * Math.PI * v));
        const B = pathBinormal(u);
        vec3.scaleAndAdd(N, N, B, Math.sin(2.0 * Math.PI * v));
        return N;
    };

    const computeBitangent = function(i, j) {
        const T = computeTangent(i, j);
        const N = computeNormal(i, j);
        vec3.cross(T, N, T);
        return T;
    };

    const computeTexture = function(i, j) {
        const s = -1.0 * textureCircums * j / radialDivisions;
        const t = -1.0 * textureLengths * i / lengthDivisions;
        return [s, t];
    };

    const position = [];
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

    const barycentric = [];
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

    const tangent = [];
    for (var i = -lengthDivisions; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            tangent.push(...computeTangent(i+0, j+0));
            tangent.push(...computeTangent(i+0, j+1));
            tangent.push(...computeTangent(i+1, j+1));
            tangent.push(...computeTangent(i+1, j+1));
            tangent.push(...computeTangent(i+1, j+0));
            tangent.push(...computeTangent(i+0, j+0));
        }
    }
    var tangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tangentBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(tangent),
        gl.STATIC_DRAW
    );
    tangentBuffer = new Buffer(
        tangentBuffer,
        3
    );

    const normal = [];
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

    const bitangent = [];
    for (var i = -lengthDivisions; i < lengthDivisions; ++i) {
        for (var j = 0; j < radialDivisions; ++j) {
            bitangent.push(...computeBitangent(i+0, j+0));
            bitangent.push(...computeBitangent(i+0, j+1));
            bitangent.push(...computeBitangent(i+1, j+1));
            bitangent.push(...computeBitangent(i+1, j+1));
            bitangent.push(...computeBitangent(i+1, j+0));
            bitangent.push(...computeBitangent(i+0, j+0));
        }
    }
    var bitangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bitangentBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(bitangent),
        gl.STATIC_DRAW
    );
    bitangentBuffer = new Buffer(
        bitangentBuffer,
        3
    );

    // Texture buffer half length of others
    // because it doesn't animate
    const texture = [];
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


    const ambient  = [];
    const diffuse  = [];
    const specular = [];
    for (var i = 0; i < position.length / 3; ++i) {
        ambient.push (...materialAmbient);
        diffuse.push (...materialDiffuse);
        specular.push(...materialSpecular);
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
        tangentBuffer,
        normalBuffer,
        bitangentBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        materialShine,
        (position.length / 3) / 2,
        0
    );
}

export { getCube, getPlane, getDisk, fromPath, fromPathAnim };
