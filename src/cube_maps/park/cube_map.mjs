import { CubeMapTexture }
    from "../../common/cube_map_texture.mjs"
import { ImageTexture }
    from "../../common/image_texture.mjs"

var cubeMapTextures = null;
function getParkCubeMapTextures(gl) {
    if (!cubeMapTextures) {
        cubeMapTextures = new CubeMapTexture(
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

    return cubeMapTextures;
}

var imageTextures = null;
function getParkImageTextures(gl) {
    if (!imageTextures) {
        imageTextures   = [];
        const srcs = [
            "./src/cube_maps/park/posx.jpg",
            "./src/cube_maps/park/negx.jpg",
            "./src/cube_maps/park/posy.jpg",
            "./src/cube_maps/park/negy.jpg",
            "./src/cube_maps/park/posz.jpg",
            "./src/cube_maps/park/negz.jpg"
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

export { getParkCubeMapTextures, getParkImageTextures };
