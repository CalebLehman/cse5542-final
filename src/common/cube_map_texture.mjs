class CubeMapTexture {
    constructor(
        gl,
        level,
        format,
        type,
        srcPosX,
        srcNegX,
        srcPosY,
        srcNegY,
        srcPosZ,
        srcNegZ
    ) {
        this.texture = gl.createTexture();

        // Initial binds as temporaries until images load
        gl.bindTexture(
            gl.TEXTURE_CUBE_MAP,
            this.texture
        );
        const tempPixels = new Uint8Array([128,128,255,255]);
        gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            tempPixels
        );
        gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            tempPixels
        );
        gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            tempPixels
        );
        gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            tempPixels
        );
        gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            tempPixels
        );
        gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            tempPixels
        );

        const imgPosX  = new Image();
        const imgNegX  = new Image();
        const imgPosY  = new Image();
        const imgNegY  = new Image();
        const imgPosZ  = new Image();
        const imgNegZ  = new Image();
        const texture = this.texture;
        imgPosX.onload = function() {
            handleImage(
                texture,
                gl,
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                level,
                format,
                type,
                imgPosX
            );
        };
        imgNegX.onload = function() {
            handleImage(
                texture,
                gl,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                level,
                format,
                type,
                imgNegX
            );
        };
        imgPosY.onload = function() {
            handleImage(
                texture,
                gl,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                level,
                format,
                type,
                imgPosY
            );
        };
        imgNegY.onload = function() {
            handleImage(
                texture,
                gl,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                level,
                format,
                type,
                imgNegY
            );
        };
        imgPosZ.onload = function() {
            handleImage(
                texture,
                gl,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                level,
                format,
                type,
                imgPosZ
            );
        };
        imgNegZ.onload = function() {
            handleImage(
                texture,
                gl,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                level,
                format,
                type,
                imgNegZ
            );
        };

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.REPEAT);

        imgPosX.src = srcPosX;
        imgNegX.src = srcNegX;
        imgPosY.src = srcPosY;
        imgNegY.src = srcNegY;
        imgPosZ.src = srcPosZ;
        imgNegZ.src = srcNegZ;
    }
}

function handleImage(texture, gl, glFace, level, format, type, image) {
    gl.bindTexture(
        gl.TEXTURE_CUBE_MAP,
        texture
    );
    gl.texImage2D(
        glFace,
        level,
        format,
        format,
        type,
        image
    );

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.REPEAT);
}

export { CubeMapTexture };
