const camera = {
    position: [0, 1, 0],
    coi:      [1, 1, 1],
    upVector: [0, 1, 0],
    tilt:     mat4.create(),
    pitch:    0.0,
    turn:     0.0,
    fovy:     1.0,
    aspect:   1.0,
    near:     1.0,
    far:      10.0,
}

function setCameraParams(fovy, aspect, near, far) {
    camera.fovy   = fovy;
    camera.aspect = aspect;
    camera.near   = near;
    camera.far    = far;
}

export { camera, setCameraParams };
