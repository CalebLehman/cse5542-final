import { Geometry }
    from "../common/geometry.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"
import { getCube }
    from "../common/primitives.mjs"
import { getDefaultTextures }
    from "../textures/default/textures.mjs"

var pillars = (function() {
    var   pillars    = null;
    const numPillars = 3;

    var textures = null;

    const color    = [1.0, 0.0, 0.0, 1.0];
    const specular = [1.0, 1.0, 1.0, 1.0];
    var   shine    = 100.0;

    var cachedDrawable = null;
    function init(gl, poly, force=false) {
        if (!textures) {
            textures = getDefaultTextures(gl);
        }

        if (!pillars) {
            pillars = [];
            for (var i = 0; i < numPillars; ++i) {
                pillars.push(new HierarchyNode(
                    null,
                    [0.0, 0.0, 0.0],
                    {angle: 0.0, axis: [0.0, 1.0, 0.0]},
                    [1.0, 1.0, 1.0],
                    null,
                    null,
                    null
                ));
            }
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
            for (var i = 0; i < pillars.length; ++i) {
                pillars[i].drawable = pillarDrawable;
            }
            cachedDrawable  = pillarDrawable;
        }
    }

    function animate(length) {
    }
    
    function get() {
        if (!pillars) {
            console.log("Retrieving uninitialized geometry");
        }

        for (var i = 0; i < pillars.length; ++i) {
            const pillar = pillars[i];
            if (pillar.drawable) {
                pillar.textureDiffuse  = textures.diffuse;
                pillar.textureSpecular = textures.specular;
                pillar.textureNormal   = textures.normal;
            }
        }

        return pillars;
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

export { pillars };
