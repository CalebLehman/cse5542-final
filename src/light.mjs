class Light {
    constructor(
        position,
        ambient,
        diffuse,
        specular
    ) {
        this.position = position;
        this.ambient  = ambient;
        this.diffuse  = diffuse;
        this.specular = specular;
    }
}

export { Light };
