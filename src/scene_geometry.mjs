import { HierarchyNode }
    from "./hierarchy_node.mjs"
import { getCube, getPlane }
    from "./primitives.mjs"

var pillar = null;
function initGeometry(gl) {
    pillar = new HierarchyNode(
        getCube(gl),
        [0.0, 0.0, 0.0],
        {angle: 0.0, axis: [0.0, 1.0, 0.0]},
        [1.0, 1.0, 1.0]
    );
}

function getPillar() {
    if (!pillar) {
        console.log("Retrieving uninitialized geometry");
    }
    return pillar;
}

export { initGeometry, getPillar };
