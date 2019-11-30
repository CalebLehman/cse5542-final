import { ImageTexture }
    from "../../common/image_texture.mjs"

var diffuse = null;
function getDiffuse(gl) {
    if (!diffuse) {
        diffuse = new ImageTexture(
            gl,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            "./src/textures/scales/diffuse.png"
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
            "./src/textures/scales/specular.png"
        );
    }

    return specular;
}

function getScalesTextures(gl) {
    return {
        diffuse:  getDiffuse(gl),
        specular: getSpecular(gl),
    };
}

export { getScalesTextures };
