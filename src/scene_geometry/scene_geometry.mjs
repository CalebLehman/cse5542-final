import { unknot }
    from "./unknot.mjs"
import { torusKnot }
    from "./torus_knot.mjs"
import { figureEightKnot }
    from "./figure_eight_knot.mjs"
import { pillar }
    from "./pillar.mjs"

function getSceneGeometry() {
    return {
        unknot:          unknot,
        torusKnot:       torusKnot,
        figureEightKnot: figureEightKnot,
        pillar:          pillar,
    };
}

export { getSceneGeometry };
