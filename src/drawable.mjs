class Drawable {
    constructor(
        posBuffer,
        normalBuffer,
        ambientBuffer,
        diffuseBuffer,
        specularBuffer,
        shineBuffer
    ) {
        this.posBuffer = posBuffer;
        this.normalBuffer = normalBuffer;
        this.ambientBuffer = ambientBuffer;
        this.diffuseBuffer = diffuseBuffer;
        this.specularBuffer = specularBuffer;
        this.shineBuffer = shineBuffer;
    }
}

export { Drawable };
