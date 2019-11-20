import { setProgram }
    from "./shaders.mjs"

const graphicsHandler = (function () {
    var canvas;
    var gl;
    var program;

    var clearColor = [0.0, 0.0, 0.0, 1.0];

    var positionBuffers = new Object();
    var indexBuffers    = new Object();
    var normalBuffers   = new Object();
    var ambientBuffers  = new Object();
    var diffuseBuffers  = new Object();
    var specularBuffers = new Object();
    var shineBuffers    = new Object();

    function init() {
        canvas = document.querySelector("#canvas");
        gl     = canvas.getContext("webgl");
        if (!gl) {
            console.log("Failed to init WebGL.");
            return;
        };

        program = setProgram(gl);

        draw();
    }

    function draw() {
        // Clear screen
        gl.clearColor(...clearColor);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // TODO: draw objects
    }

    return {
        init: init,
    }
}());

function init() {
    const canvas  = document.querySelector("#canvas");
    canvas.width  = window.innerWidth  * 0.8;
    canvas.height = window.innerHeight * 0.7;

    graphicsHandler.init();
}

export { init, graphicsHandler }
