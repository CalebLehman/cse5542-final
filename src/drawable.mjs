class Drawable {
    constructor(
        posBuffer,
        baryBuffer,
        normalBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shineBuffer
    ) {
        this.posBuffer      = posBuffer;
        this.baryBuffer     = baryBuffer;
        this.normalBuffer   = normalBuffer;
        this.ambientBuffer  = ambientBuffer;
        this.diffuseBuffer  = diffuseBuffer;
        this.specularBuffer = specularBuffer;
        this.shineBuffer    = shineBuffer;
    }
}

export { Drawable };
