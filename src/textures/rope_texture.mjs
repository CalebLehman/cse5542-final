import { ImageTexture }
    from "../common/image_texture.mjs"

var texture = null;
function getRopeTexture(gl) {
    if (!texture) {
        texture = new ImageTexture(
            gl,
            0,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            "./src/textures/rope.png"
        );
    }

    return texture;
}

export { getRopeTexture };
