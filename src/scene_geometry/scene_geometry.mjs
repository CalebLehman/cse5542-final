import { unknot }
    from "./unknot.mjs"
import { torusKnot }
    from "./torus_knot.mjs"
import { figureEightKnot }
    from "./figure_eight_knot.mjs"
import { pillar }
    from "./pillar.mjs"

function initSceneGeometry(gl) {
    unknot.init(gl, "high-poly");
    torusKnot.init(gl, "high-poly");
    figureEightKnot.init(gl, "high-poly");
    pillar.init(gl, "high-poly");
}

function getSceneGeometry() {
    return {
        unknot:          unknot,
        torusKnot:       torusKnot,
        figureEightKnot: figureEightKnot,
        pillar:          pillar,
    };
}

export { getSceneGeometry, initSceneGeometry };
