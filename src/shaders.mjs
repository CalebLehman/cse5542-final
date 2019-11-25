const vertexShaderPhong = `
    uniform vec3 lightPosWorldSpace;

    uniform mat4 pvmMatrix;
    uniform mat4 vmMatrix;
    uniform mat4 vMatrix;
    uniform mat4 normalMatrix;

    attribute vec3  vertexPosModelSpace;
    attribute vec3  vertexNormalModelSpace;

    attribute vec3  vertexAmbient;
    attribute vec3  vertexDiffuse;
    attribute vec3  vertexSpecular;
    attribute float vertexShine;

    varying vec3 fragmentPosEyeSpace;
    varying vec3 lightPosEyeSpace;
    varying vec3 fragmentNormalEyeSpace;

    varying vec3  fragmentAmbient;
    varying vec3  fragmentDiffuse;
    varying vec3  fragmentSpecular;
    varying float fragmentShine;
    void main() {
        gl_PointSize = 1.0;

        vec4 position = vec4(vertexPosModelSpace, 1.0);
        vec4 normal   = vec4(vertexNormalModelSpace, 0.0);

        gl_Position = pvmMatrix * position;
        fragmentPosEyeSpace = vec3(vmMatrix * position);
        lightPosEyeSpace    = vec3(vMatrix * vec4(lightPosWorldSpace, 1.0));
        fragmentNormalEyeSpace = vec3(normalMatrix * normal);

        fragmentAmbient  = vertexAmbient;
        fragmentDiffuse  = vertexDiffuse;
        fragmentSpecular = vertexSpecular;
        fragmentShine    = vertexShine;
    }
`;

const fragmentShaderPhong = `
    precision mediump float;

    uniform vec3 lightAmbient;
    uniform vec3 lightDiffuse;
    uniform vec3 lightSpecular;

    varying vec3 fragmentPosEyeSpace;
    varying vec3 lightPosEyeSpace;
    varying vec3 fragmentNormalEyeSpace;

    varying vec3  fragmentAmbient;
    varying vec3  fragmentDiffuse;
    varying vec3  fragmentSpecular;
    varying float fragmentShine;
    void main() {
        vec3 L = normalize(lightPosEyeSpace - fragmentPosEyeSpace);
        vec3 N = normalize(fragmentNormalEyeSpace);
        vec3 R = reflect(-L, N);
        vec3 V = normalize(-fragmentPosEyeSpace);

        gl_FragColor = vec4(
            fragmentAmbient * lightAmbient +
            fragmentDiffuse * lightDiffuse *
                max(0.0, dot(N, L)) +
            fragmentSpecular * lightSpecular *
                pow(max(0.0, dot(R, V)), fragmentShine),
            1.0
        );
    }
`;

function compileShader(gl, shaderSource, shaderType) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("Failed compiling a shader");
    }

    return shader;
}

var programPhong = null;
function setProgramPhong(gl) {
    var shaderProgram = null;
    if (!programPhong) {
        shaderProgram = gl.createProgram();
        gl.attachShader(
            shaderProgram,
            compileShader(
                gl,
                vertexShaderPhong,
                gl.VERTEX_SHADER
            )
        );
        gl.attachShader(
            shaderProgram,
            compileShader(
                gl,
                fragmentShaderPhong,
                gl.FRAGMENT_SHADER
            )
        );
    } else {
        shaderProgram = programPhong.shaders;
    }

    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log("Failed linking program");
    }
    gl.useProgram(shaderProgram);

    var uniforms = {
        lightPosWorldSpace:
            gl.getUniformLocation(shaderProgram, "lightPosWorldSpace"),
        lightAmbient:
            gl.getUniformLocation(shaderProgram, "lightAmbient"),
        lightDiffuse:
            gl.getUniformLocation(shaderProgram, "lightDiffuse"),
        lightSpecular:
            gl.getUniformLocation(shaderProgram, "lightSpecular"),
        pvmMatrix:
            gl.getUniformLocation(shaderProgram, "pvmMatrix"),
        vmMatrix:
            gl.getUniformLocation(shaderProgram, "vmMatrix"),
        vMatrix:
            gl.getUniformLocation(shaderProgram, "vMatrix"),
        normalMatrix:
            gl.getUniformLocation(shaderProgram, "normalMatrix"),
    }

    var attributes = {
        vertexPosModelSpace:
            gl.getAttribLocation(shaderProgram, "vertexPosModelSpace"),
        vertexNormalModelSpace:
            gl.getAttribLocation(shaderProgram, "vertexNormalModelSpace"),
        vertexAmbient:
            gl.getAttribLocation(shaderProgram, "vertexAmbient"),
        vertexDiffuse:
            gl.getAttribLocation(shaderProgram, "vertexDiffuse"),
        vertexSpecular:
            gl.getAttribLocation(shaderProgram, "vertexSpecular"),
        vertexShine:
            gl.getAttribLocation(shaderProgram, "vertexShine"),
    }
    gl.enableVertexAttribArray(
        attributes.vertexPosModelSpace
    );
    gl.enableVertexAttribArray(
        attributes.vertexNormalModelSpace
    );
    gl.enableVertexAttribArray(
        attributes.vertexAmbient
    );
    gl.enableVertexAttribArray(
        attributes.vertexDiffuse
    );
    gl.enableVertexAttribArray(
        attributes.vertexSpecular
    );
    gl.enableVertexAttribArray(
        attributes.vertexShine
    );

    programPhong = {
        shaders: shaderProgram,
        uniforms: uniforms,
        attributes: attributes,
    };

    return programPhong;
}

function setProgram(gl, type) {
    if (type === "standard") {
        return setProgramPhong(gl);
    }
}

export { setProgram };
