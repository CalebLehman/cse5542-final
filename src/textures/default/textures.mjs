import { getColorTextures }
    from "../color/textures.mjs"

function getDiffuse(gl) {
    return getColorTextures(gl, [128,128,128,255]).diffuse;
}

function getSpecular(gl) {
    return getColorTextures(gl, [255,255,255,255]).specular;
}

function getNormal(gl) {
    return getColorTextures(gl, [128,128,255,255]).normal;
}

function getDefaultTextures(gl) {
    return {
        diffuse:  getDiffuse(gl),
        specular: getSpecular(gl),
        normal:   getNormal(gl),
    };
}

export { getDefaultTextures };
