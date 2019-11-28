class PixelTexture {
    constructor(
        gl,
        level,
        format,
        width,
        height,
        border,
        type,
        pixels
    ) {
        this.gl     = gl;
        this.level  = level;
        this.format = format;
        this.width  = width;
        this.height = height;
        this.border = border;
        this.type   = type;
        this.pixels = pixels;

        this.loadTexture();
    }

    loadTexture() {
        this.texture = this.gl.createTexture();

        this.gl.bindTexture(
            this.gl.TEXTURE_2D,
            this.texture
        );
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            this.level,
            this.format,
            this.width,
            this.height,
            this.border,
            this.format,
            this.type,
            this.pixels
        );

        this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST
        );
        this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR
        );
        this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_WRAP_S, this.gl.MIRRORED_REPEAT
        );
        this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_WRAP_T, this.gl.MIRRORED_REPEAT
        );
    }
}

export { PixelTexture };
