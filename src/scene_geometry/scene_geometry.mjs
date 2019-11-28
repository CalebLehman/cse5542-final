import { knotA }
    from "./knot_a.mjs"
import { pillar }
    from "./pillar.mjs"

function getSceneGeometry() {
    return {
        knotA:  knotA,
        pillar: pillar,
    };
}

export { getSceneGeometry };
