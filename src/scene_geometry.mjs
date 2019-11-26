import { HierarchyNode }
    from "./hierarchy_node.mjs"
import { getCube, getPlane, getTorus }
    from "./primitives.mjs"

var pillar = null;
var unknot  = null;

function initGeometry(gl) {
    pillar = new HierarchyNode(
        getCube(gl),
        [0.0, 0.0, 0.0],
        {angle: 0.0, axis: [0.0, 1.0, 0.0]},
        [1.0, 1.0, 1.0]
    );

    unknot = new HierarchyNode(
        getTorus(gl, 3, 2),
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

function getUnknot() {
    if (!unknot) {
        console.log("Retrieving uninitialized geometry");
    }
    return unknot;
}

export { initGeometry, getPillar, getUnknot };
