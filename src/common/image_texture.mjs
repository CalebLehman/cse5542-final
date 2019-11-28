class ImageTexture {
    constructor(
        gl,
        level,
        format,
        type,
        src
    ) {
        this.gl     = gl;
        this.level  = level;
        this.format = format;
        this.type   = type;
        this.src    = src;

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
            0,
            this.gl.RGBA,
            1,
            1,
            0,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            new Uint8Array([255, 0, 0, 255])
        );

        const image  = new Image();
        // TODO
        var gl = this.gl;
        var texture = this.texture;
        var level = this.level;
        var format = this.format;
        var type = this.type;
        image.onload = function() {
            gl.bindTexture(
                gl.TEXTURE_2D,
                texture
            );
            gl.texImage2D(
                gl.TEXTURE_2D,
                level,
                format,
                format,
                type,
                image
            );

            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_MAG_FILTER, gl.LINEAR
            );
            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_MIN_FILTER, gl.LINEAR
            );
            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT
            );
            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT
            );
        }
        image.src = this.src;
    }
}

export { ImageTexture };
