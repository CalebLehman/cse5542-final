class HierarchyNode {
    constructor(
        drawable,
        translation,
        rotation,
        scale,
        textureDiffuse,
        textureSpecular,
        textureNormal
    ) {
        this.parent    = null;
        this.children  = [];
        this.isPrimary = true;

        this.drawable    = drawable;
        this.translation = translation;
        this.rotation    = rotation;
        this.scale       = scale;

        this.textureDiffuse  = textureDiffuse;
        this.textureSpecular = textureSpecular;
        this.textureNormal   = textureNormal;
    }

    addChild(child) {
        child.parent    = this;
        this.children.push(child);
        child.isPrimary = this.children.length === 1;
    }
}

export { HierarchyNode };
