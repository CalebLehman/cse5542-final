import { Geometry }
    from "../common/geometry.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"
import { getPlane }
    from "../common/primitives.mjs"
import { getBrickTextures } // TODO
    from "../textures/brick/textures.mjs"

var walls = (function() {
    var   walls    = null;
    const numWalls = 6;

    var textures = null;

    const color    = [1.0, 0.0, 0.0, 1.0];
    const specular = [1.0, 1.0, 1.0, 1.0];
    var   shine    = 100.0;

    var cachedDrawable = null;
    function init(gl, poly, force=false) {
        if (!textures) {
            textures = getBrickTextures(gl);
        }

        if (!walls) {
            walls = [];
            for (var i = 0; i < numWalls; ++i) {
                walls.push(new HierarchyNode(
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

        if (force || !cachedDrawable) {
            cachedDrawable = getPlane(
                gl,
                color,
                color,
                specular,
                shine
            );
        }
        for (var i = 0; i < walls.length; ++i) {
            walls[i].drawable = cachedDrawable;
        }
    }

    function animate(length) {
    }
    
    function get() {
        if (!walls) {
            console.log("Retrieving uninitialized geometry");
        }

        for (var i = 0; i < walls.length; ++i) {
            const pillar = walls[i];
            if (pillar.drawable) {
                pillar.textureDiffuse  = textures.diffuse;
                pillar.textureSpecular = textures.specular;
                pillar.textureNormal   = textures.normal;
            }
        }

        return walls;
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

export { walls };
