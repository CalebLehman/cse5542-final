import { camera }
    from "./camera.mjs"
import { draw }
    from "./graphics.mjs"

var speed = 5.0 / 60;
var movingForwards  = false;
var movingBackwards = false;
var movingLeft      = false;
var movingRight     = false;

function init() {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease);
    window.requestAnimationFrame(main);
}

function handleKeyPress(e) {
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
}

function handleKeyRelease(e) {
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

    var y = vec3.fromValues(...camera.upVector);
    var x = vec3.create();
    vec3.subtract(x, targetPosition, cameraPosition);

    vec3.transformMat4(x, x, camera.tilt);
    vec3.transformMat4(y, y, camera.tilt);

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
