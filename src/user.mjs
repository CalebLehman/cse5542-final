import { camera }
    from "./camera.mjs"
import { draw }
    from "./graphics.mjs"

// WASD parameters
const speed = 5.0 / 60;
var movingForwards  = false;
var movingBackwards = false;
var movingLeft      = false;
var movingRight     = false;

// Mouse parameters
var sensitivity = 2 * Math.PI / 2000;

var canvas = null;

function init() {
    // WASD movement
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease);

    // Mouse movement
    canvas = document.querySelector("#canvas");
    canvas.requestPointerLock = canvas.requestPointerLock ||
                                canvas.mozRequestPointerLock ||
                                canvas.webkitRequestPointerLock;
    canvas.onclick = function() { canvas.requestPointerLock(); }
    document.addEventListener('pointerlockchange', pointerLockUnlock, false);
    document.addEventListener('mozpointerlockchange', pointerLockUnlock, false);

    // Rendering
    window.requestAnimationFrame(main);
}

function pointerLockUnlock() {
    if (document.pointerLockElement    === canvas ||
        document.mozPointerLockElement === canvas) {
        document.addEventListener("mousemove", handleMouseMove, false);
    } else {
        document.removeEventListener("mousemove", handleMouseMove, false);
    }
}

function handleMouseMove(e) {
    camera.turn  += e.movementX * sensitivity;
    camera.pitch += e.movementY * sensitivity;

    camera.tilt = mat4.create();
    mat4.rotate(
        camera.tilt,
        camera.tilt,
        camera.pitch,
        [1.0, 0.0, 0.0]
    );
    mat4.rotate(
        camera.tilt,
        camera.tilt,
        camera.turn,
        [0.0, 1.0, 0.0]
    );
}

function handleKeyPress(e) {
    // WASD movement
    if (e.keyCode === 87) { // w
        movingForwards = true;
    }
    if (e.keyCode === 83) { // s
        movingBackwards = true;
    }
    if (e.keyCode === 65) { // a
        movingLeft = true;
    }
    if (e.keyCode === 68) { // d
        movingRight = true;
    }

    // Shader selection
    if (e.keyCode === 59) { // 1
        // TODO selectShader("standard");
    }
    if (e.keyCode === 60) { // 2
        // TODO selectShader("wireframe");
    }
}

function handleKeyRelease(e) {
    // WASD movement
    if (e.keyCode === 87) { // w
        movingForwards = false;
    }
    if (e.keyCode === 83) { // s
        movingBackwards = false;
    }
    if (e.keyCode === 65) { // a
        movingLeft = false;
    }
    if (e.keyCode === 68) { // d
        movingRight = false;
    }
}

function main() {
    var cameraPosition = vec3.fromValues(...camera.position);
    var targetPosition = vec3.fromValues(...camera.coi);

    var x = vec3.create();
    vec3.subtract(x, targetPosition, cameraPosition);
    var turnMatrix = mat4.create();
    mat4.rotate(
        turnMatrix,
        turnMatrix,
        -1.0 * camera.turn,
        [0.0, 1.0, 0.0]
    )
    vec3.transformMat4(x, x, turnMatrix);

    var y = vec3.fromValues(...camera.upVector);

    var z = vec3.create();
    vec3.cross(z, x, y);

    vec3.normalize(x, x);
    vec3.normalize(y, y);
    vec3.normalize(z, z);

    if (movingForwards) {
        vec3.scaleAndAdd(cameraPosition, cameraPosition, x, +1.0 * speed);
        vec3.scaleAndAdd(targetPosition, targetPosition, x, +1.0 * speed);
    }

    if (movingBackwards) {
        vec3.scaleAndAdd(cameraPosition, cameraPosition, x, -1.0 * speed);
        vec3.scaleAndAdd(targetPosition, targetPosition, x, -1.0 * speed);
    }

    if (movingRight) {
        vec3.scaleAndAdd(cameraPosition, cameraPosition, z, +1.0 * speed);
        vec3.scaleAndAdd(targetPosition, targetPosition, z, +1.0 * speed);
    }

    if (movingLeft) {
        vec3.scaleAndAdd(cameraPosition, cameraPosition, z, -1.0 * speed);
        vec3.scaleAndAdd(targetPosition, targetPosition, z, -1.0 * speed);
    }

    camera.position = cameraPosition;
    camera.coi      = targetPosition;
    draw();
    window.requestAnimationFrame(main);
}

export { init };
