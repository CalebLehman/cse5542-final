import { ImageTexture }
    from "../../common/image_texture.mjs"

var diffuse = null;
function getDiffuse(gl) {
    if (!diffuse) {
        diffuse = new ImageTexture(
            gl,
            0,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            "./src/textures/scales/diffuse.png" // relative to project.html page
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
            gl.RGB,
            gl.UNSIGNED_BYTE,
            "./src/textures/scales/specular.png" // relative to project.html page
        );
    }

    return specular;
}

var normal = null;
function getNormal(gl) {
    if (!normal) {
        normal = new ImageTexture(
            gl,
            0,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            "./src/textures/scales/normal.png" // relative to project.html page
        );
    }

    return normal;
}

function getScalesTextures(gl) {
    return {
        diffuse:  getDiffuse(gl),
        specular: getSpecular(gl),
        normal:   getNormal(gl),
    };
}

export { getScalesTextures };
