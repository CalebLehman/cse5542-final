import { CubeMapTexture }
    from "../../common/cube_map_texture.mjs"
import { ImageTexture }
    from "../../common/image_texture.mjs"

var cubeMapTextures = null;
function getNoneCubeMapTextures(gl) {
    if (!cubeMapTextures) {
        cubeMapTextures = new CubeMapTexture(
            gl,
            0,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            "./src/cube_maps/none/gray.png",
            "./src/cube_maps/none/gray.png",
            "./src/cube_maps/none/gray.png",
            "./src/cube_maps/none/gray.png",
            "./src/cube_maps/none/gray.png",
            "./src/cube_maps/none/gray.png"
        );
    }

    return cubeMapTextures;
}

var imageTextures = null;
function getNoneImageTextures(gl) {
    if (!imageTextures) {
        imageTextures   = [];
        const srcs = [
            "./src/cube_maps/none/gray.png",
            "./src/cube_maps/none/gray.png",
            "./src/cube_maps/none/gray.png",
            "./src/cube_maps/none/gray.png",
            "./src/cube_maps/none/gray.png",
            "./src/cube_maps/none/gray.png"
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

export { getNoneCubeMapTextures, getNoneImageTextures };
