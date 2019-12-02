import { CubeMapTexture }
    from "../../common/cube_map_texture.mjs"

var textures = null;
function getCityCubeMapTextures(gl) {
    if (!textures) {
        textures = new CubeMapTexture(
            gl,
            0,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            "./src/cube_maps/city/posx.jpg",
            "./src/cube_maps/city/negx.jpg",
            "./src/cube_maps/city/posy.jpg",
            "./src/cube_maps/city/negy.jpg",
            "./src/cube_maps/city/posz.jpg",
            "./src/cube_maps/city/negz.jpg"
        );
    }

    return textures;
}

export { getCityCubeMapTextures };
