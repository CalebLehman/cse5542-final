import { CubeMapTexture }
    from "../../common/cube_map_texture.mjs"
import { ImageTexture }
    from "../../common/image_texture.mjs"

var cubeMapTextures = null;
function getCityCubeMapTextures(gl) {
    if (!cubeMapTextures) {
        cubeMapTextures = new CubeMapTexture(
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

    return cubeMapTextures;
}

var imageTextures = null;
function getCityImageTextures(gl) {
    if (!imageTextures) {
        imageTextures   = [];
        const srcs = [
            "./src/cube_maps/city/posx.jpg",
            "./src/cube_maps/city/negx.jpg",
            "./src/cube_maps/city/posy.jpg",
            "./src/cube_maps/city/negy.jpg",
            "./src/cube_maps/city/posz.jpg",
            "./src/cube_maps/city/negz.jpg"
        ];
        for (var i = 0; i < srcs.length; ++i) {
            imageTextures.push(new ImageTexture(
                gl,
                0,
                gl.RGB,
                gl.UNSIGNED_BYTE,
                srcs[i]
            ));
        }
    }

    return imageTextures;
}

export { getCityCubeMapTextures, getCityImageTextures };
