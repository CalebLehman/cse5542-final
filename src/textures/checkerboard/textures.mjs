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

function getSpecular(gl) {
    return getColorTextures(gl, [255,255,255,255]).specular;
}

function getNormal(gl) {
    return getColorTextures(gl, [128,128,255,255]).normal;
}

function getCheckerboardTextures(gl) {
    return {
        diffuse:  getDiffuse(gl),
        specular: getSpecular(gl),
        normal:   getNormal(gl),
    };
}

export { getCheckerboardTextures };
