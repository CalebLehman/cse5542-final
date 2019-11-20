const vertexShader = `
    void main() {
        gl_PointSize = 1.0;
    }
`;

const fragmentShader = `
    void main() {
        gl_FragColor = vec4(1, 0, 0, 1);
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

    return program;
}

export { setProgram }
