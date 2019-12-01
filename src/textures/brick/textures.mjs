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
            "./src/textures/brick/diffuse.png" // relative to project.html page
        );
    }

    return diffuse;
}

function getSpecular(gl) {
    return getColorTextures(gl, [255,255,255,255]).specular;j
}

var normal = null;
function getNormal(gl) {
    if (!normal) {
        normal = new ImageTexture(
            gl,
            0,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            "./src/textures/brick/normal.png" // relative to project.html page
        );
    }

    return normal;
}

function getBrickTextures(gl) {
    return {
        diffuse:  getDiffuse(gl),
        specular: getSpecular(gl),
        normal:   getNormal(gl),
    };
}

export { getBrickTextures };
