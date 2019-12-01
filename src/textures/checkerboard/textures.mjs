import { ImageTexture }
    from "../../common/image_texture.mjs"
import { getColorTextures }
    from "../color/textures.mjs"

var diffuse = null;
function getDiffuse(gl) {
    if (!diffuse) {
        diffuse = new ImageTexture(
            gl,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            "./src/textures/checkerboard/diffuse.png" // relative to project.html page
        );
    }

    return diffuse;
}

var specular = null;
function getSpecular(gl) {
    if (!specular) {
        specular = new ImageTexture(
            gl,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            "./src/textures/checkerboard/specular.png" // relative to project.html page
        );
    }

    return specular;
}

function getNormal(gl) {
    const textures = getColorTextures(gl, [128,128,255,255]);
    return textures.normal;
}

function getCheckerboardTextures(gl) {
    return {
        diffuse:  getDiffuse(gl),
        specular: getSpecular(gl),
        normal:   getNormal(gl),
    };
}

export { getCheckerboardTextures };
