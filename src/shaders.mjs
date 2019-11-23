const vertexShader = `
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

const fragmentShader = `
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

var program = null;
function setProgram(gl) {
    if (!program) {
        program = gl.createProgram();
        gl.attachShader(
            program,
            compileShader(
                gl,
                vertexShader,
                gl.VERTEX_SHADER
            )
        );
        gl.attachShader(
            program,
            compileShader(
                gl,
                fragmentShader,
                gl.FRAGMENT_SHADER
            )
        );
    }

    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("Failed linking program");
    }
    gl.useProgram(program);

    var uniforms = {
        lightPosWorldSpace:
            gl.getUniformLocation(program, "lightPosWorldSpace"),
        lightAmbient:
            gl.getUniformLocation(program, "lightAmbient"),
        lightDiffuse:
            gl.getUniformLocation(program, "lightDiffuse"),
        lightSpecular:
            gl.getUniformLocation(program, "lightSpecular"),
        pvmMatrix:
            gl.getUniformLocation(program, "pvmMatrix"),
        vmMatrix:
            gl.getUniformLocation(program, "vmMatrix"),
        vMatrix:
            gl.getUniformLocation(program, "vMatrix"),
        normalMatrix:
            gl.getUniformLocation(program, "normalMatrix"),
    }

    var attributes = {
        vertexPosModelSpace:
            gl.getAttribLocation(program, "vertexPosModelSpace"),
        vertexNormalModelSpace:
            gl.getAttribLocation(program, "vertexNormalModelSpace"),
        vertexAmbient:
            gl.getAttribLocation(program, "vertexAmbient"),
        vertexDiffuse:
            gl.getAttribLocation(program, "vertexDiffuse"),
        vertexSpecular:
            gl.getAttribLocation(program, "vertexSpecular"),
        vertexShine:
            gl.getAttribLocation(program, "vertexShine"),
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

    return {
        shaders: program,
        uniforms: uniforms,
        attributes: attributes,
    }
}

export { setProgram };
