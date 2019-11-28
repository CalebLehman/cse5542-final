import { Geometry }
    from "../common/geometry.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"
import { getCube }
    from "../common/primitives.mjs"
import { getWhiteTexture }
    from "../textures/white_texture.mjs"

import { getCheckerboardTexture } // TODO
    from "../textures/checkerboard_texture.mjs"

var pillar = (function() {
    var pillar = null;

    const color    = [1.0, 0.0, 0.0, 1.0];
    const specular = [1.0, 1.0, 1.0, 1.0];
    const shine    = 100.0;

    function init(gl, poly) {
        var pillarDrawable = getCube(gl);
        pillar = new HierarchyNode(
            pillarDrawable,
            [3.0, 0.0, -3.0],
            {angle: 0.0, axis: [0.0, 1.0, 0.0]},
            [1.0, 1.0, 1.0],
            getCheckerboardTexture(gl),
            getCheckerboardTexture(gl)
        );
    }

    function animate(length) {
    }
    
    function get(gl) {
        if (!pillar) {
            console.log("Retrieving uninitialized geometry");
        }

        return pillar;
    }

    return new Geometry(init, animate, get);
})();

export { pillar };
