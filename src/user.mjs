import { camera }
    from "./common/camera.mjs"
import { draw, selectShader }
    from "./graphics.mjs"
import { initSceneGeometry, getSceneHierarchy, textureSceneGeometry, animateKnots }
    from "./scene_geometry/scene_geometry.mjs"

import { getDefaultTextures }
    from "./textures/default/textures.mjs"
import { getCheckerboardTextures }
    from "./textures/checkerboard/textures.mjs"
import { getRopeTextures }
    from "./textures/rope/textures.mjs"
import { getBrickTextures }
    from "./textures/brick/textures.mjs"
import { getScalesTextures }
    from "./textures/scales/textures.mjs"
import { getOrganicTextures }
    from "./textures/organic/textures.mjs"

// WASD parameters
const speed = 15.0 / (2 * 60);
var movingForwards  = false;
var movingBackwards = false;
var movingLeft      = false;
var movingRight     = false;

// Mouse parameters
const sensitivity = 2 * Math.PI / 2000;

// Wireframe parameter
var wireframePoly = "low-poly";

var canvas   = null;
var gl       = null;
var geometry = null;

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
    gl = canvas.getContext("webgl");
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

const minPitch = -1.0 * Math.PI / 2;
const maxPitch = +1.0 * Math.PI / 2;
function handleMouseMove(e) {
    camera.turn  += e.movementX * sensitivity;
    camera.pitch += e.movementY * sensitivity;
    camera.pitch  = Math.max(camera.pitch, minPitch);
    camera.pitch  = Math.min(camera.pitch, maxPitch);

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
    if (e.keyCode === 49) { // 1
        selectShader("standard");
        makeGeometry("high-poly");
    }
    if (e.keyCode === 50) { // 2
        selectShader("quad-wireframe");
        makeGeometry(wireframePoly);
    }
    if (e.keyCode === 51) { // 3
        selectShader("tri-wireframe");
        makeGeometry(wireframePoly);
    }
    if (e.keyCode === 52) { // 4
        selectShader("texture");
        makeGeometry("high-poly");
    };
    if (e.keyCode === 53) { // 5
        selectShader("cube-map");
        makeGeometry("high-poly");
    };

    // Animation
    if (e.keyCode === 67) { // c
        animateKnots([3000, 4000, 6000]);
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

function makeGeometry(poly) {
    initSceneGeometry(gl, poly);
}

function selectTextures(type, shine) {
    var textures = null;
    switch (type) {
        case "default":
            textures = getDefaultTextures(gl);
            break;
        case "checkerboard":
            textures = getCheckerboardTextures(gl);
            break;
        case "rope":
            textures = getRopeTextures(gl);
            break;
        case "brick":
            textures = getBrickTextures(gl);
            break;
        case "scales":
            textures = getScalesTextures(gl);
            break;
        case "organic":
            textures = getOrganicTextures(gl);
            break;
        case null:
            // leave as null, indicates no update
            break;
        default:
            console.log("Unknown texture type: " + type);
    }

    textureSceneGeometry(textures, shine);
}

function selectWireframe(poly) {
    wireframePoly = poly;
}

export { init, selectTextures, selectWireframe };
