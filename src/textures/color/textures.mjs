import { PixelTexture }
    from "../../common/pixel_texture.mjs"

function getColorTextures(gl, color) {
    const texture = new PixelTexture(
        gl,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.UNSIGNED_BYTE,
        new Uint8Array(color)
    );

    return {
        diffuse:  texture,
        specular: texture,
        normal:   texture,
    };
}

export { getColorTextures };
