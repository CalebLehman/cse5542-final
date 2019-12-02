import { HierarchyNode }
    from "../common/hierarchy_node.mjs"
import { unknot }
    from "./unknot.mjs"
import { torusKnot }
    from "./torus_knot.mjs"
import { figureEightKnot }
    from "./figure_eight_knot.mjs"
import { pillars }
    from "./pillars.mjs"

const root = new HierarchyNode(
    null,
    [0, 0, 0],
    {angle: 0.0, axis: [0,1,0]},
    [1, 1, 1],
    null,
    null,
    null
);
function initSceneGeometry(gl) {
    unknot.init(gl, "high-poly");
    torusKnot.init(gl, "high-poly");
    figureEightKnot.init(gl, "high-poly");
    pillars.init(gl, "high-poly");

    const pillarUnknot       = pillars.get()[0];
    pillarUnknot.translation = [-9.0, +1.0, +0.0];
    pillarUnknot.scale       = [+1.5, +1.5, +1.5];
    root.addChild(pillarUnknot);

    const pillarTorusKnot       = pillars.get()[1];
    pillarTorusKnot.translation = [+0.0, +1.0, +0.0];
    pillarTorusKnot.scale       = [+1.5, +1.5, +1.5];
    root.addChild(pillarTorusKnot);
    torusKnot.get().translation = [+0.0, +1.8, +0.0];
    pillarTorusKnot.addChild(torusKnot.get());


    const pillarFigureEightKnot       = pillars.get()[2];
    pillarFigureEightKnot.translation = [+9.0, +1.0, +0.0];
    pillarFigureEightKnot.scale       = [+1.5, +1.5, +1.5];
    root.addChild(pillarFigureEightKnot);
}

function getSceneGeometry() {
    return {
        unknot:          unknot,
        torusKnot:       torusKnot,
        figureEightKnot: figureEightKnot,
        pillars:         pillars,
    };
}

function getGeometryHierarchy() {
    return {
        root: root,
    }
}

export { initSceneGeometry, getSceneGeometry, getGeometryHierarchy };
