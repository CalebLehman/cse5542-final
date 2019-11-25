import { shaderPhong }
    from "./shader_phong.mjs"
import { shaderWireframe }
    from "./shader_wireframe.mjs"

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
    switch (type) {
        case "standard":
            shaderPhong.setProgram(gl);
            break;
        case "wireframe":
            shaderWireframe.setProgram(gl);
            break;
        default:
            console.log("Failed to set program to unknown type " + type);
    }
}

function unsetProgram(gl, type) {
    switch (type) {
        case "standard":
            shaderPhong.unsetProgram(gl);
            break;
        case "wireframe":
            shaderWireframe.unsetProgram(gl);
            break;
        default:
            console.log("Failed to unset program from unknown type " + type);
    }
}

function drawHierarchy(
    gl,
    type,
    camera,
    light,
    root
) {
    switch (type) {
        case "standard":
            shaderPhong.drawHierarchy(gl, camera, light, root);
            break;
        case "wireframe":
            shaderWireframe.drawHierarchy(gl, camera, light, root);
            break;
        default:
            console.log("Failed to draw using uknown program type " + type);
    }
}

export {
    compileShader,
    setProgram,
    unsetProgram,
    drawHierarchy
};
