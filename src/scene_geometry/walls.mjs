import { Geometry }
    from "../common/geometry.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"
import { getPlane }
    from "../common/primitives.mjs"

import { getColorTextures }
    from "../textures/color/textures.mjs"
import { getParkImageTextures }
    from "../cube_maps/park/cube_map.mjs"

var walls = (function() {
    var   walls    = null;
    const numWalls = 6;

    var textures      = null;
    var blankSpecular = null;
    var blankNormal   = null;

    const color    = [1.0, 0.0, 0.0, 1.0];
    const specular = [1.0, 1.0, 1.0, 1.0];
    var   shine    = 100.0;

    var cachedDrawable = null;
    function init(gl, poly, force=false) {
        if (!textures) {
            textures = getParkImageTextures(gl);
            blankSpecular = getColorTextures(gl, [255, 255, 255, 255]).specular;
            blankNormal   = getColorTextures(gl, [128, 128, 255, 255]).normal;
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
            const wall = walls[i];
            if (wall.drawable) {
                wall.textureDiffuse  = textures[i];
                wall.textureSpecular = blankSpecular;
                wall.textureNormal   = blankNormal;
            }
        }

        return walls;
    }

    function texture(newTextures) {
        textures = newTextures;
    }

    return new Geometry(init, animate, get, texture);
})();

export { walls };
