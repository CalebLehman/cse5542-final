import { setProgram }
    from "./shaders.mjs"
import { camera, setCameraParams }
    from "./camera.mjs"
import { Light }
    from "./light.mjs"

// TODO
import { HierarchyNode }
    from "./hierarchy_node.mjs"
import { initCube, getCube, initPlane, getPlane }
    from "./primitives.mjs"

const webglGraphics = (function () {
    var canvas;
    var gl;
    var program;

    var light;
    var clearColor = [0.0, 0.0, 0.0, 1.0];

    function init() {
        // Get and setup context
        canvas = document.querySelector("#canvas");
        gl     = canvas.getContext("webgl");
        if (!gl) {
            console.log("Failed to init WebGL.");
            return;
        };
        gl.viewport(
            0,
            0,
            gl.drawingBufferWidth,
            gl.drawingBufferHeight
        );
        gl.enable(gl.DEPTH_TEST);

        // Setup initial shader program
        program = setProgram(gl);
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
        // Initialize primitives
        initCube(gl);
        initPlane(gl);
        // Initial draw routine
        draw();
    }

    function drawDrawable(
        drawable,
        pMatrix,
        vMatrix,
        mMatrix
    ) {
        if (!drawable) return;

        // Create and pass transformation matrices
        var vmMatrix = mat4.clone(vMatrix);
        mat4.multiply(vmMatrix, vMatrix, mMatrix);
        var pvmMatrix = mat4.create();
        mat4.multiply(pvmMatrix, pMatrix, vmMatrix);
        var normalMatrix = mat4.clone(vmMatrix);
        mat4.transpose(normalMatrix, normalMatrix);
        mat4.invert(normalMatrix, normalMatrix);
        gl.uniformMatrix4fv(
            program.uniforms.pvmMatrix,
            false,
            pvmMatrix
        );
        gl.uniformMatrix4fv(
            program.uniforms.vmMatrix,
            false,
            vmMatrix
        );
        gl.uniformMatrix4fv(
            program.uniforms.vMatrix,
            false,
            vMatrix
        );
        gl.uniformMatrix4fv(
            program.uniforms.normalMatrix,
            false,
            normalMatrix
        );

        // Pass attribute buffers
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            drawable.posBuffer.buffer
        );
        gl.vertexAttribPointer(
            program.attributes.vertexPosModelSpace,
            drawable.posBuffer.itemSize,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            drawable.normalBuffer.buffer
        );
        gl.vertexAttribPointer(
            program.attributes.vertexNormalModelSpace,
            drawable.normalBuffer.itemSize,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            drawable.ambientBuffer.buffer
        );
        gl.vertexAttribPointer(
            program.attributes.vertexAmbient,
            drawable.ambientBuffer.itemSize,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            drawable.diffuseBuffer.buffer
        );
        gl.vertexAttribPointer(
            program.attributes.vertexDiffuse,
            drawable.diffuseBuffer.itemSize,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            drawable.specularBuffer.buffer
        );
        gl.vertexAttribPointer(
            program.attributes.vertexSpecular,
            drawable.specularBuffer.itemSize,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            drawable.shineBuffer.buffer
        );
        gl.vertexAttribPointer(
            program.attributes.vertexShine,
            drawable.shineBuffer.itemSize,
            gl.FLOAT,
            false,
            0,
            0
        );

        gl.drawArrays(
            gl.TRIANGLES,
            0,
            drawable.posBuffer.numItems,
        );
        return;
    }

    function drawHierarchy() {
        // Pass lighting information to GPU
        gl.uniform3fv(
            program.uniforms.lightPosWorldSpace,
            light.position
        );
        gl.uniform3fv(
            program.uniforms.lightAmbient,
            light.ambient
        );
        gl.uniform3fv(
            program.uniforms.lightDiffuse,
            light.diffuse
        );
        gl.uniform3fv(
            program.uniforms.lightSpecular,
            light.specular
        );

        // Generate perspective-view matrix
        var pMatrix = mat4.create();
        mat4.perspective(
            pMatrix,
            camera.fovy,
            camera.aspect,
            camera.near,
            camera.far
        );

        var vMatrix = mat4.create();
        mat4.lookAt(
            vMatrix,
            camera.position,
            camera.coi,
            camera.upVector
        );
        mat4.multiply(
            vMatrix,
            camera.tilt,
            vMatrix
        );

        // TODO hierarchy should be built elsewhere
        // and drawn starting from root (passed parameter)
        var date  = new Date();
        var value = date.getMilliseconds() + 1000.0 * date.getSeconds();
        var cube = new HierarchyNode(
            getCube(),
            [0.0, 0.0, 0.0],
            {angle: 2*Math.PI*value/4000.0, axis: [0.5, 0.5, 0.0]},
            [1.0, 1.0, 1.0]
        );
        var mMatrix  = mat4.create();
        var stack    = [cube];
        var matrices = [mat4.clone(mMatrix)];
        while (stack.length > 0) {
            var currNode = stack.pop();
            if (!currNode.isPrimary) {
                matrices.push(mat4.clone(mMatrix));
            }
            mat4.translate(
                mMatrix,
                mMatrix,
                currNode.translation
            );
            mat4.rotate(
                mMatrix,
                mMatrix,
                currNode.rotation.angle,
                currNode.rotation.axis
            );
            mat4.scale(
                mMatrix,
                mMatrix,
                currNode.scale
            );

            drawDrawable(
                currNode.drawable,
                pMatrix,
                vMatrix,
                mMatrix
            );

            if (currNode.children.length === 0) {
                mMatrix = matrices.pop();
            }

            stack.push(...currNode.children);
        }
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

        drawHierarchy();
    }

    return {
        init: init,
        draw: draw,
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

export { init, draw }
