import { setProgram, unsetProgram, drawHierarchy }
    from "./shaders/shaders.mjs"
import { camera, setCameraParams }
    from "./common/camera.mjs"
import { Light }
    from "./common/light.mjs"
import { getSceneGeometry }
    from "./scene_geometry/scene_geometry.mjs"

const webglGraphics = (function () {
    var canvas;
    var gl;
    var shaderType;

    var light;
    var clearColor = [0.3, 0.3, 0.3, 1.0];

    function init() {
        // Get and setup context
        canvas = document.querySelector("#canvas");
        gl     = canvas.getContext("webgl");
        if (!gl) {
            console.log("Failed to init WebGL.");
            return;
        };
        gl.getExtension('OES_standard_derivatives');
        gl.viewport(
            0,
            0,
            gl.drawingBufferWidth,
            gl.drawingBufferHeight
        );
        gl.enable(gl.DEPTH_TEST);

        // Select initial shader
        selectShader("standard");

        // Setup camera
        setCameraParams(
            1.0,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            100.0
        );
        camera.position = [5, 1, 5];
        // Setup light
        light = new Light(
            [3, 2, 5],
            [0.5, 0.5, 0.5],
            [0.5, 0.5, 0.5],
            [1.0, 1.0, 1.0]
        );
        // Get and initialize geometry TODO
        var geometry = getSceneGeometry();
        geometry.knotA.init(gl, "high-poly");
        geometry.pillar.init(gl, "high-poly");
        // Initial draw routine
        draw();
    }

    function draw() {
        // Clear screen
        gl.clearColor(...clearColor);
        gl.clear(
            gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT
        );

        // Resize canvas, if necessary
        gl.canvas.width  = gl.canvas.clientWidth;
        gl.canvas.height = gl.canvas.clientHeight;

        // Switch to appropriate shader
        setProgram(gl, shaderType);

        // Draw hierarchy
        // TODO sample hierarchy
        var geometry = getSceneGeometry();
        /*
        var date  = new Date();
        var value = date.getMilliseconds() + 1000.0 * date.getSeconds();
        geometry.knotA.get().rotation = {
            angle: 2*Math.PI*value/8000.0,
            axis: [0.5, 0.5, 0.0]
        };
        */
        drawHierarchy(gl, shaderType, camera, light, geometry.knotA.get());
        drawHierarchy(gl, shaderType, camera, light, geometry.pillar.get());

        // Unset shader
        unsetProgram(gl, shaderType);
    }

    function selectShader(type) {
        shaderType = type;
    }

    return {
        init: init,
        draw: draw,
        selectShader: selectShader,
    }
}());

function init() {
    const canvas  = document.querySelector("#canvas");
    canvas.width  = window.innerWidth  * 0.93;
    canvas.height = window.innerHeight * 0.70;

    webglGraphics.init();
}

function draw() {
    webglGraphics.draw();
}

function selectShader(type) {
    webglGraphics.selectShader(type);
}

export { init, draw, selectShader }
