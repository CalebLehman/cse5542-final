import { compileShader }
    from "./shaders.mjs"
import { Light }
    from "../common/light.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"

var shaderQuadWireframe = (function () {
    var program = null;

    const vertexShader = `
        uniform mat4 pvmMatrix;

        attribute vec3 vertexPosModelSpace;
        attribute vec3 vertexPosBarySpace;
        attribute vec3 vertexAmbient;

        varying vec3 fragmentPosBarySpace;
        varying vec3 fragmentAmbient;

        void main() {
            gl_PointSize = 1.0;

            vec4 position          = vec4(vertexPosModelSpace, 1.0);
            gl_Position            = pvmMatrix * position;
            fragmentPosBarySpace   = vertexPosBarySpace;
            fragmentPosBarySpace.y = 1.0;
            fragmentAmbient        = vertexAmbient;
        }
    `;

    const fragmentShader = `
        #extension GL_OES_standard_derivatives : enable
        precision mediump float;

        varying vec3 fragmentPosBarySpace;
        varying vec3 fragmentAmbient;

        const float thickness = 1.0;
        void main() {
            vec3 normalizationFactor = fwidth(fragmentPosBarySpace);
            vec3 smoothStepDistance  = smoothstep(
                vec3(0.0),
                normalizationFactor * thickness,
                fragmentPosBarySpace
            );
            float smallest           = min(
                smoothStepDistance.x,
                min(
                    smoothStepDistance.y,
                    smoothStepDistance.z
                )
            );

            gl_FragColor = vec4(fragmentAmbient, 1.0 - smallest);
        }
    `;

    function setProgram(gl) {
        var shaderProgram = null;
        if (!program) {
            shaderProgram = gl.createProgram();
            gl.attachShader(
                shaderProgram,
                compileShader(
                    gl,
                    vertexShader,
                    gl.VERTEX_SHADER
                )
            );
            gl.attachShader(
                shaderProgram,
                compileShader(
                    gl,
                    fragmentShader,
                    gl.FRAGMENT_SHADER
                )
            );

            gl.linkProgram(shaderProgram);
            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                console.log("Failed linking program");
            }

            var uniforms = {
                pvmMatrix:
                    gl.getUniformLocation(shaderProgram, "pvmMatrix"),
            }

            var attributes = {
                vertexPosModelSpace:
                    gl.getAttribLocation(shaderProgram, "vertexPosModelSpace"),
                vertexPosBarySpace:
                    gl.getAttribLocation(shaderProgram, "vertexPosBarySpace"),
                vertexAmbient:
                    gl.getAttribLocation(shaderProgram, "vertexAmbient"),
            }

            program = {
                shaders: shaderProgram,
                uniforms: uniforms,
                attributes: attributes,
            };
        }

        gl.enableVertexAttribArray(
            program.attributes.vertexPosModelSpace
        );
        gl.enableVertexAttribArray(
            program.attributes.vertexPosBarySpace
        );
        gl.enableVertexAttribArray(
            program.attributes.vertexAmbient
        );

        shaderProgram = program.shaders;
        gl.useProgram(shaderProgram);
    }

    function unsetProgram(gl) {
        gl.disableVertexAttribArray(
            program.attributes.vertexPosModelSpace
        );
        gl.disableVertexAttribArray(
            program.attributes.vertexPosBarySpace
        );
        gl.disableVertexAttribArray(
            program.attributes.vertexAmbient
        );
    }

    function drawDrawable(
        gl,
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
        gl.uniformMatrix4fv(
            program.uniforms.pvmMatrix,
            false,
            pvmMatrix
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
            drawable.baryBuffer.buffer
        );
        gl.vertexAttribPointer(
            program.attributes.vertexPosBarySpace,
            drawable.baryBuffer.itemSize,
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

        gl.drawArrays(
            gl.TRIANGLES,
            drawable.offset,
            drawable.numItems,
        );
        return;
    }

    function drawHierarchy(gl, camera, light, root) {
        // Setup rendering context
        gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

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

        var mMatrix  = mat4.create();
        var stack    = [root];
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
                gl,
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

    return {
        setProgram:     setProgram,
        unsetProgram:   unsetProgram,
        drawHierarchy:  drawHierarchy,
    }
})();

export { shaderQuadWireframe };
