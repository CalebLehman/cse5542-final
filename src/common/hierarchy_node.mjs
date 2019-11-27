class HierarchyNode {
    constructor(
        drawable,
        translation,
        rotation,
        scale
    ) {
        this.parent    = null;
        this.children  = [];
        this.isPrimary = true;

        this.drawable    = drawable;
        this.translation = translation;
        this.rotation    = rotation;
        this.scale       = scale;
    }

    addChild(child) {
        child.parent    = this;
        this.children.push(child);
        child.isPrimary = this.children.length === 1;
    }
}

export { HierarchyNode };
