class ImageTexture {
    constructor(
        gl,
        level,
        format,
        type,
        src
    ) {
        this.texture = gl.createTexture();

        gl.bindTexture(
            gl.TEXTURE_2D,
            this.texture
        );
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            new Uint8Array([255, 255, 255, 255])
        );

        var texture = this.texture;
        const image  = new Image();
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
                gl.TEXTURE_WRAP_S, gl.REPEAT
            );
            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_T, gl.REPEAT
            );
        }
        image.src = src;
    }

    loadTexture() {
    }
}

export { ImageTexture };
