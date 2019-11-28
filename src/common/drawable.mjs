class Drawable {
    constructor(
        posBuffer,
        baryBuffer,
        normalBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shine,
        numItems,
        offset
    ) {
        this.posBuffer      = posBuffer;
        this.baryBuffer     = baryBuffer;
        this.normalBuffer   = normalBuffer;
        this.textureBuffer  = textureBuffer;
        this.ambientBuffer  = ambientBuffer;
        this.diffuseBuffer  = diffuseBuffer;
        this.specularBuffer = specularBuffer;
        this.shine          = shine;
        this.numItems       = numItems;
        this.offset         = offset;
    }
}

export { Drawable };
