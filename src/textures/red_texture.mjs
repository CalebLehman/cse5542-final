import { PixelTexture }
    from "../common/pixel_texture.mjs"

var colors = [
    255, 0, 0, 255,
];
var texture = null;
function getRedTexture(gl) {
    if (!texture) {
        texture = new PixelTexture(
            gl,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.UNSIGNED_BYTE,
            new Uint8Array(colors)
        );
    }

    return texture;
}

export { getRedTexture };
