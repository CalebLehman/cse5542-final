import { CubeMapTexture }
    from "../../common/cube_map_texture.mjs"
import { ImageTexture }
    from "../../common/image_texture.mjs"

var cubeMapTextures = null;
function getBeachCubeMapTextures(gl) {
    if (!cubeMapTextures) {
        cubeMapTextures = new CubeMapTexture(
            gl,
            0,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            "./src/cube_maps/beach/posx.jpg",
            "./src/cube_maps/beach/negx.jpg",
            "./src/cube_maps/beach/posy.jpg",
            "./src/cube_maps/beach/negy.jpg",
            "./src/cube_maps/beach/posz.jpg",
            "./src/cube_maps/beach/negz.jpg"
        );
    }

    return cubeMapTextures;
}

var imageTextures = null;
function getBeachImageTextures(gl) {
    if (!imageTextures) {
        imageTextures   = [];
        const srcs = [
            "./src/cube_maps/beach/posx.jpg",
            "./src/cube_maps/beach/negx.jpg",
            "./src/cube_maps/beach/posy.jpg",
            "./src/cube_maps/beach/negy.jpg",
            "./src/cube_maps/beach/posz.jpg",
            "./src/cube_maps/beach/negz.jpg"
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

export { getBeachCubeMapTextures, getBeachImageTextures };
