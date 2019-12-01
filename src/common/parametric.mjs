// Re-parametrize path:[a, b] -> R^3
// to constant speed path:[0, 1] -> R^3.
function constantSpeedPath(path, a, b, tDivisions) {
    const derivative = function(t) {
        const h   = (b-a) / tDivisions;
        const r   = Math.min(t+h, b);
        const l   = Math.max(t-h, a);
        const f_r = path(r);
        const f_l = path(l);
        vec3.subtract(f_r, f_r, f_l);
        vec3.scale(f_r, f_r, 1.0 / (2.0 * h));
        return f_r;
    };

    // Compute arc length
    var arcLength = new Array(tDivisions + 1);
    arcLength[0]  = 0.0;
    for (var i = 1; i <= tDivisions; ++i) {
        const delta  = (b - a) / tDivisions;
        const tPrev  = a + (i - 1) * delta;
        const speed  = vec3.length(derivative(tPrev));
        arcLength[i] = arcLength[i-1] + speed * delta;
    }

    // Normalize arc length
    const totalLength = arcLength[tDivisions];
    for (var i = 0; i <= tDivisions; ++i) {
        arcLength[i] /= totalLength;
    }

    // Compute a constant speed re-parametrization
    const constantSpeedPath = new Array(tDivisions + 1);
    constantSpeedPath[0]    = path(a);
    var   currIdx           = 0;
    for (var i = 1; i <= tDivisions; ++i) {
        const delta  = 1.0 / tDivisions;
        const s      = i * delta;

        while (arcLength[currIdx] < s) { ++currIdx; }
        const tLeft  = (s - arcLength[currIdx - 1])
        const tL = a + (b - a) * (currIdx - 1) / tDivisions;
        const sL = arcLength[currIdx - 1];
        const tR = a + (b - a) * currIdx / tDivisions;
        const sR = arcLength[currIdx];
        const t  = tL + (s - sL) * (tR - tL) / (sR - sL);

        constantSpeedPath[i] = path(t);
    }
    arcLength = null;

    return function(s) {
        const i  = s * tDivisions;
        const iL = Math.floor(i);
        const pL = vec3.clone(constantSpeedPath[iL]);
        const iR = Math.ceil(i);
        const pR = vec3.clone(constantSpeedPath[iR]);

        if (iR !== iL) {
            vec3.subtract(pR, pR, pL);
            vec3.scaleAndAdd(pL, pL, pR, (i - iL) / (iR - iL));
        }
        return pL;
    }
}

// Sample given path and return (quick lookup)
// path, tangent, normal, and binormal
// functions.
// To make it simple for this project,
// assumes that path is never travelling
// perfectly vertically (+/-y direction)
function samplePath(path, a, b, tDivisions) {
    // Functions to compute path properties
    const derivative = function(t) {
        const h   = (b-a) / tDivisions;
        const r   = Math.min(t+h, b);
        const l   = Math.max(t-h, a);
        const f_r = path(r);
        const f_l = path(l);
        vec3.subtract(f_r, f_r, f_l);
        vec3.scale(f_r, f_r, 1.0 / (2.0 * h));
        return f_r;
    };

    const tangent = function(t) {
        const dp = derivative(t);
        vec3.normalize(dp, dp);
        return dp;
    };

    const binormal = function(t) {
        const dp = derivative(t);
        const y  = vec3.fromValues(0.0, 1.0, 0.0);
        vec3.cross(dp, dp, y);
        vec3.normalize(dp, dp);
        return dp;
    };

    const normal = function(t) {
        const T = tangent(t);
        const B = binormal(t);
        vec3.cross(T, B, T);
        return T;
    };

    // Sample path properties
    const sampledPath     = new Array(tDivisions + 1);
    const sampledTangent  = new Array(tDivisions + 1);
    const sampledNormal   = new Array(tDivisions + 1);
    const sampledBinormal = new Array(tDivisions + 1);

    sampledPath    [0] = path(a);
    sampledTangent [0] = tangent(a);
    sampledNormal  [0] = normal(a);
    sampledBinormal[0] = binormal(a);
    for (var i = 1; i < tDivisions; ++i) {
        const t = a + (b - a) * i / tDivisions;
        sampledPath    [i] = path(t);
        sampledTangent [i] = tangent(t);
        sampledNormal  [i] = normal(t);
        sampledBinormal[i] = binormal(t);
    }
    sampledPath    [tDivisions] = path(b);
    sampledTangent [tDivisions] = tangent(b);
    sampledNormal  [tDivisions] = normal(b);
    sampledBinormal[tDivisions] = binormal(b);

    // Functions to use samples
    const newPath = function(t) {
        const idx = tDivisions * (t - a) / (b - a);
        const iL  = Math.floor(idx);
        const pL  = vec3.clone(sampledPath[iL]);
        const iR  = Math.ceil(idx);
        const pR  = vec3.clone(sampledPath[iR]);

        if (iL !== iR) {
            vec3.subtract(pR, pR, pL);
            vec3.scaleAndAdd(pL, pL, pR, (idx - iL) / (iR -iL));
        }
        return pL;
    };

    const newTangent = function(t) {
        const idx = tDivisions * (t - a) / (b - a);
        const iL  = Math.floor(idx);
        const TL  = vec3.clone(sampledTangent[iL]);
        const iR  = Math.ceil(idx);
        const TR  = vec3.clone(sampledTangent[iR]);

        if (iL !== iR) {
            vec3.subtract(TR, TR, TL);
            vec3.scaleAndAdd(TL, TL, TR, (idx - iL) / (iR -iL));
        }
        return TL;
    };

    const newNormal = function(t) {
        const idx = tDivisions * (t - a) / (b - a);
        const iL  = Math.floor(idx);
        const NL  = vec3.clone(sampledNormal[iL]);
        const iR  = Math.ceil(idx);
        const NR  = vec3.clone(sampledNormal[iR]);

        if (iL !== iR) {
            vec3.subtract(NR, NR, NL);
            vec3.scaleAndAdd(NL, NL, NR, (idx - iL) / (iR -iL));
        }
        return NL;
    };

    const newBinormal = function(t) {
        const idx = tDivisions * (t - a) / (b - a);
        const iL  = Math.floor(idx);
        const BL  = vec3.clone(sampledBinormal[iL]);
        const iR  = Math.ceil(idx);
        const BR  = vec3.clone(sampledBinormal[iR]);

        if (iL !== iR) {
            vec3.subtract(BR, BR, BL);
            vec3.scaleAndAdd(BL, BL, BR, (idx - iL) / (iR -iL));
        }
        return BL;
    };

    return {
        path:     newPath,
        tangent:  newTangent,
        normal:   newNormal,
        binormal: newBinormal,
    };
}

export { constantSpeedPath, samplePath };
