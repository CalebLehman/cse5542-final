import { Geometry }
    from "../common/geometry.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"
import { getCube }
    from "../common/primitives.mjs"
import { getDefaultTextures }
    from "../textures/default/textures.mjs"

var pillar = (function() {
    var pillar = null;

    var textures = null;

    const color    = [1.0, 0.0, 0.0, 1.0];
    const specular = [1.0, 1.0, 1.0, 1.0];
    var   shine    = 100.0;

    var cachedDrawable = null;
    function init(gl, poly, force=false) {
        if (!textures) {
            textures = getDefaultTextures(gl);
        }

        if (!pillar) {
            pillar = new HierarchyNode(
                null,
                [0.0, 0.0, 0.0],
                {angle: 0.0, axis: [0.0, 1.0, 0.0]},
                [1.0, 1.0, 1.0],
                null,
                null,
                null
            );
        }

        if (!force && cachedDrawable) {
            pillar.drawable = cachedDrawable;
        } else {
            const pillarDrawable = getCube(
                gl,
                color,
                color,
                specular,
                shine
            );
            pillar.drawable = pillarDrawable;
            cachedDrawable  = pillarDrawable;
        }
    }

    function animate(length) {
    }
    
    function get(gl) {
        if (!pillar) {
            console.log("Retrieving uninitialized geometry");
        }

        if (pillar.drawable) {
            pillar.textureDiffuse  = textures.diffuse;
            pillar.textureSpecular = textures.specular;
            pillar.textureNormal   = textures.normal;
        }

        return pillar;
    }

    function texture(newTextures) {
        textures = newTextures;
    }
    function texture(newTextures, newShine) {
        if (newTextures) {
            textures = newTextures;
        }
        if (newShine) {
            shine = newShine;
            if (cachedDrawable) {
                cachedDrawable.shine = newShine;
            }
        }
    }

    return new Geometry(init, animate, get, texture);
})();

export { pillar };
