class Drawable {
    constructor(
        posBuffer,
        baryBuffer,
        tangentBuffer,
        normalBuffer,
        bitangentBuffer,
        textureBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shine,
        numItems,
        offset
    ) {
        this.posBuffer       = posBuffer;
        this.baryBuffer      = baryBuffer;
        this.tangentBuffer   = tangentBuffer;
        this.normalBuffer    = normalBuffer;
        this.bitangentBuffer = bitangentBuffer;;
        this.textureBuffer   = textureBuffer;
        this.ambientBuffer   = ambientBuffer;
        this.diffuseBuffer   = diffuseBuffer;
        this.specularBuffer  = specularBuffer;
        this.shine           = shine;
        this.numItems        = numItems;
        this.offset          = offset;
    }
}

export { Drawable };
