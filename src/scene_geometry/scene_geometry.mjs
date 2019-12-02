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
import { walls }
    from "./walls.mjs"

var mainRoot = null;
var wallRoot = null;
function initSceneGeometry(gl, poly) {
    unknot.init(gl, poly);
    torusKnot.init(gl, poly);
    figureEightKnot.init(gl, poly);
    pillars.init(gl, poly);
    walls.init(gl, poly);

    if (!mainRoot) {
        mainRoot = new HierarchyNode(
            null,
            [0, 0, 0],
            {angle: 0.0, axis: [0,1,0]},
            [1, 1, 1],
            null,
            null,
            null
        );

        const pillarUnknotNode       = pillars.get()[0];
        pillarUnknotNode.translation = [-9.0, +1.5, +0.0];
        pillarUnknotNode.scale       = [+1.5, +1.5, +1.5];
        mainRoot.addChild(pillarUnknotNode);

        const unknotNode       = unknot.get();
        unknotNode.translation = [+0.0, +1.6, +0.0];
        unknotNode.scale       = [+0.8, +0.8, +0.8];
        pillarUnknotNode.addChild(unknotNode);

        const pillarTorusKnotNode       = pillars.get()[1];
        pillarTorusKnotNode.translation = [+0.0, +1.5, +0.0];
        pillarTorusKnotNode.scale       = [+1.5, +1.5, +1.5];
        mainRoot.addChild(pillarTorusKnotNode);

        const torusKnotNode       = torusKnot.get();
        torusKnotNode.translation = [+0.0, +1.6, +0.0];
        torusKnotNode.scale       = [+0.7, +0.7, +0.7];
        pillarTorusKnotNode.addChild(torusKnotNode);

        const pillarFigureEightKnotNode       = pillars.get()[2];
        pillarFigureEightKnotNode.translation = [+9.0, +1.5, +0.0];
        pillarFigureEightKnotNode.scale       = [+1.5, +1.5, +1.5];
        mainRoot.addChild(pillarFigureEightKnotNode);

        const figureEightKnotNode       = figureEightKnot.get();
        figureEightKnotNode.translation = [+0.0, +1.6, +0.0];
        figureEightKnotNode.scale       = [+0.45, +0.45, +0.45];
        pillarFigureEightKnotNode.addChild(figureEightKnotNode);
    }

    if (!wallRoot) {
        wallRoot = new HierarchyNode(
            null,
            [0, 0, 0],
            {angle: 0.0, axis: [0,1,0]},
            [1, 1, 1],
            null,
            null,
            null
        );
        const D = 500.0;
        const S = D + 1.0;

        const posXRoot = walls.get()[0];
        posXRoot.translation = [+D, 0, 0];
        posXRoot.rotation    = {angle: -2 * Math.PI / 3, axis: [-1, -1, 1]};
        posXRoot.scale       = [S, S, S];
        wallRoot.addChild(posXRoot);

        const negXRoot = walls.get()[1];
        negXRoot.translation = [-D, 0, 0];
        negXRoot.rotation    = {angle: 2 * Math.PI / 3, axis: [1, -1, 1]};
        negXRoot.scale       = [S, S, S];
        wallRoot.addChild(negXRoot);

        const posYRoot = walls.get()[2];
        posYRoot.translation = [0, +D, 0];
        posYRoot.rotation    = {angle: 0, axis: [0, 0, 1]};
        posYRoot.scale       = [S, S, S];
        wallRoot.addChild(posYRoot);

        const negYRoot = walls.get()[3];
        negYRoot.translation = [0, -D, 0];
        negYRoot.rotation    = {angle: Math.PI, axis: [1, 0, 0]};
        negYRoot.scale       = [S, S, S];
        wallRoot.addChild(negYRoot);

        const posZRoot = walls.get()[4];
        posZRoot.translation = [0, 0, +D];
        posZRoot.rotation    = {angle: Math.PI / 2, axis: [1, 0, 0]};
        posZRoot.scale       = [S, S, S];
        wallRoot.addChild(posZRoot);

        const negZRoot = walls.get()[5];
        negZRoot.translation = [0, 0, -D];
        negZRoot.rotation    = {angle: Math.PI, axis: [0, -1, 1]};
        negZRoot.scale       = [S, S, S];
        wallRoot.addChild(negZRoot);
    }
}

function getSceneHierarchy() {
    // Call 'get' on geometry to get updates
    unknot.get();
    torusKnot.get();
    figureEightKnot.get();
    pillars.get();
    walls.get();

    return {
        mainRoot: mainRoot,
        wallRoot: wallRoot,
    }
}

function textureSceneGeometry(knotTextures, pillarTextures, shine) {
    unknot.texture(knotTextures, shine);
    torusKnot.texture(knotTextures, shine);
    figureEightKnot.texture(knotTextures, shine);
    pillars.texture(pillarTextures, shine);
}

function textureSceneWalls(imageTextures) {
    walls.texture(imageTextures);
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
}

const minHeight = 1.6;
const maxHeight = 9.0;
function setKnotsHeight(userX, userY, userZ, pitch) {
    const unknotNode = unknot.get();
    const unknotDist = -1.5 + Math.sqrt(
        Math.pow(userX - pillars.get()[0].translation[0], 2)
        +
        Math.pow(userZ - pillars.get()[0].translation[2], 2)
    );
    const torusKnotNode = torusKnot.get();
    const torusKnotDist = -1.5 + Math.sqrt(
        Math.pow(userX - pillars.get()[1].translation[0], 2)
        +
        Math.pow(userZ - pillars.get()[1].translation[2], 2)
    );
    const figureEightKnotNode = figureEightKnot.get();
    const figureEightKnotDist = -1.5 + Math.sqrt(
        Math.pow(userX - pillars.get()[2].translation[0], 2)
        +
        Math.pow(userZ - pillars.get()[2].translation[2], 2)
    );

    const dist = Math.min(
        unknotDist,
        Math.min(
            torusKnotDist,
            figureEightKnotDist
        )
    );
    const knotY = Math.max(minHeight,
        Math.min(maxHeight,
            dist * Math.tan(pitch) + (userY - 1.5) - 1.5
        )
    );
    unknotNode.translation[1] = knotY;
    torusKnotNode.translation[1] = knotY;
    figureEightKnotNode.translation[1] = knotY;
}

export { initSceneGeometry
       , getSceneHierarchy
       , textureSceneGeometry
       , animateKnots
       , setKnotsHeight
       , setKnotsRotation
       , textureSceneWalls
       };
