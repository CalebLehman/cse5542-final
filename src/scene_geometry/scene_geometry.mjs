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

var root = null;
function initSceneGeometry(gl, poly) {
    unknot.init(gl, poly);
    torusKnot.init(gl, poly);
    figureEightKnot.init(gl, poly);
    pillars.init(gl, poly);

    if (!root) {
        root = new HierarchyNode(
            null,
            [0, 0, 0],
            {angle: 0.0, axis: [0,1,0]},
            [1, 1, 1],
            null,
            null,
            null
        );

        const pillarUnknotNode       = pillars.get()[0];
        pillarUnknotNode.translation = [-9.0, +1.0, +0.0];
        pillarUnknotNode.scale       = [+1.5, +1.5, +1.5];
        root.addChild(pillarUnknotNode);

        // min height = 1.6 + 1.0 TODO
        //               ^     ^
        //             offset pillar offset
        const unknotNode       = unknot.get();
        unknotNode.translation = [-0.3, +1.6, +0.0];
        unknotNode.scale       = [+0.9, +0.9, +0.9];
        pillarUnknotNode.addChild(unknotNode);

        const pillarTorusKnotNode       = pillars.get()[1];
        pillarTorusKnotNode.translation = [+0.0, +1.0, +0.0];
        pillarTorusKnotNode.scale       = [+1.5, +1.5, +1.5];
        root.addChild(pillarTorusKnotNode);

        // min height = 1.6 + 1.0 TODO
        //               ^     ^
        //             offset pillar offset
        const torusKnotNode       = torusKnot.get();
        torusKnotNode.translation = [+0.0, +1.6, +0.0];
        torusKnotNode.scale       = [+0.7, +0.7, +0.7];
        pillarTorusKnotNode.addChild(torusKnotNode);

        const pillarFigureEightKnotNode       = pillars.get()[2];
        pillarFigureEightKnotNode.translation = [+9.0, +1.0, +0.0];
        pillarFigureEightKnotNode.scale       = [+1.5, +1.5, +1.5];
        root.addChild(pillarFigureEightKnotNode);

        // min height = 1.6 + 1.0 TODO
        //               ^     ^
        //             offset pillar offset
        const figureEightKnotNode       = figureEightKnot.get();
        figureEightKnotNode.translation = [+0.0, +1.6, +0.0];
        figureEightKnotNode.scale       = [+0.45, +0.45, +0.45];
        pillarFigureEightKnotNode.addChild(figureEightKnotNode);
    }
}

function getSceneHierarchy() {
    // Call 'get' on geometry to get updates
    unknot.get();
    torusKnot.get();
    figureEightKnot.get();
    pillars.get();

    return {
        root: root,
    }
}

function textureSceneGeometry(textures, shine) {
    unknot.texture(textures, shine);
    torusKnot.texture(textures, shine);
    figureEightKnot.texture(textures, shine);
    pillars.texture(textures, shine);
}

function animateKnots(lengths) {
    unknot.anim(lengths[0]);
    torusKnot.anim(lengths[1]);
    figureEightKnot.anim(lengths[2]);
}

function setKnotsRotation(rotation) {
    const unknotNode          = unknot.get();
    const torusKnotNode       = torusKnot.get();
    const figureEightKnotNode = figureEightKnot.get();
    unknotNode.rotation          = rotation;
    torusKnotNode.rotation       = rotation;
    figureEightKnotNode.rotation = rotation;
    // TODO
}

function setKnotsHeight() {
    // TODO
}

export { initSceneGeometry, getSceneHierarchy, textureSceneGeometry, animateKnots };
