import { setProgram, unsetProgram, drawHierarchy }
    from "./shaders/shaders.mjs"
import { camera, setCameraParams }
    from "./common/camera.mjs"
import { Light }
    from "./common/light.mjs"
import { initSceneGeometry, getSceneHierarchy, textureSceneWalls }
    from "./scene_geometry/scene_geometry.mjs"
import { getParkCubeMapTextures, getParkImageTextures }
    from "./cube_maps/park/cube_map.mjs"
import { getCityCubeMapTextures, getCityImageTextures }
    from "./cube_maps/city/cube_map.mjs"
import { getBeachCubeMapTextures, getBeachImageTextures }
    from "./cube_maps/beach/cube_map.mjs"
import { getNoneCubeMapTextures, getNoneImageTextures }
    from "./cube_maps/none/cube_map.mjs"

const webglGraphics = (function () {
    var canvas;
    var gl;
    var shaderType;

    var light;
    var clearColor = [0.3, 0.3, 0.3, 1.0];
    var cubeMapTextures = null;

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
            1000.0
        );
        camera.position = [0.0, 5.5, 15.0];
        camera.coi      = [0.0, 5.5,  0.0];
        // Setup light
        light = new Light(
            [20, 5, 5],
            [0.5, 0.5, 0.5],
            [0.5, 0.5, 0.5],
            [1.0, 1.0, 1.0]
        );
        // Get and initialize geometry
        initSceneGeometry(gl, "high-poly");
        // Setup cube map environment
        selectEnvironment("none");
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

        // Draw main geometry
        setProgram(gl, shaderType);
        drawHierarchy(gl, shaderType, camera, light, getSceneHierarchy().mainRoot, cubeMapTextures.texture);
        unsetProgram(gl, shaderType);

        // Draw walls
        const wallShaderType = "flat-image";
        setProgram(gl, wallShaderType);
        drawHierarchy(gl, wallShaderType, camera, light, getSceneHierarchy().wallRoot, cubeMapTextures.texture);
        unsetProgram(gl, wallShaderType);
    }

    function selectShader(type) {
        shaderType = type;
    }

    function setLight(position, ambient, diffuse, specular) {
        if (position) {
            light.position = position;
        }
        if (ambient) {
            light.ambient = ambient;
        }
        if (diffuse) {
            light.diffuse = diffuse;
        }
        if (specular) {
            light.specular = specular;
        }
    }

    function selectEnvironment(type) {
        switch (type) {
            case "none":
                cubeMapTextures = getNoneCubeMapTextures(gl);
                textureSceneWalls(getNoneImageTextures(gl));
                setLight([-85, 100, -100], null, null, null);
                break;
            case "park":
                cubeMapTextures = getParkCubeMapTextures(gl);
                textureSceneWalls(getParkImageTextures(gl));
                setLight([0, 100, 0], null, null, null);
                break;
            case "city":
                cubeMapTextures = getCityCubeMapTextures(gl);
                textureSceneWalls(getCityImageTextures(gl));
                setLight([0, 100, 100], null, null, null);
                break;
            case "beach":
                cubeMapTextures = getBeachCubeMapTextures(gl);
                textureSceneWalls(getBeachImageTextures(gl));
                setLight([-85, 100, -100], null, null, null);
                break;
            default:
                console.log("Unknown environment type " + type);
        }
    }

    return {
        init:              init,
        draw:              draw,
        selectShader:      selectShader,
        setLight:          setLight,
        selectEnvironment: selectEnvironment,
    }
}());

function init() {
    const canvas  = document.querySelector("#canvas");
    canvas.width  = window.innerWidth  * 0.60;
    canvas.height = window.innerHeight * 0.80;

    webglGraphics.init();
}

function draw() {
    webglGraphics.draw();
}

function selectShader(type) {
    webglGraphics.selectShader(type);
}

function setLight(position, ambient, diffuse, specular) {
    webglGraphics.setLight(position, ambient, diffuse, specular);
}

function selectEnvironment(type) {
    webglGraphics.selectEnvironment(type);
}

export { init, draw, selectShader, setLight, selectEnvironment }
