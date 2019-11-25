import { shaderPhong }
    from "./shader_phong.mjs"

function compileShader(gl, shaderSource, shaderType) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("Failed compiling a shader");
    }

    return shader;
}

function setProgram(gl, type) {
    if (type === "standard") {
        shaderPhong.setProgram(gl);
    }
}

function unsetProgram(gl, type) {
    if (type === "standard") {
        shaderPhong.unsetProgram(gl);
    }
}

function drawHierarchy(
    gl,
    type,
    camera,
    light,
    root
) {
    if (type === "standard") {
        shaderPhong.drawHierarchy(gl, camera, light, root);
    }
}

export {
    compileShader,
    setProgram,
    unsetProgram,
    drawHierarchy
};
