import { CubeMapTexture }
    from "../../common/cube_map_texture.mjs"

var textures = null;
function getParkCubeMapTextures(gl) {
    if (!textures) {
        textures = new CubeMapTexture(
            gl,
            0,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            "./src/cube_maps/park/posx.jpg",
            "./src/cube_maps/park/negx.jpg",
            "./src/cube_maps/park/posy.jpg",
            "./src/cube_maps/park/negy.jpg",
            "./src/cube_maps/park/posz.jpg",
            "./src/cube_maps/park/negz.jpg"
        );
    }

    return textures;
}

export { getParkCubeMapTextures };
