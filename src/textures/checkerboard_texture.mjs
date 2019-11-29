import { ImageTexture }
    from "../common/image_texture.mjs"

var texture = null;
function getCheckerboardTexture(gl) {
    if (!texture) {
        texture = new ImageTexture(
            gl,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            "./src/textures/gradient.png" // TODO
        );
    }

    return texture;
}

export { getCheckerboardTexture };
