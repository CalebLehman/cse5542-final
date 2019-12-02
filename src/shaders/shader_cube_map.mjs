import { compileShader }
    from "./shaders.mjs"
import { Light }
    from "../common/light.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"

var shaderCubeMap = (function () {
    var program = null;

    const vertexShader = `
        uniform mat4 pvmMatrix;
        uniform mat4 mMatrix;
        uniform mat4 mTangentSpaceMatrix;

        attribute vec3 vertexPosModelSpace;
        attribute vec3 vertexNormalModelSpace;

        varying vec3 fragmentPosWorldSpace;
        varying vec3 fragmentNormalWorldSpace;

        void main() {
            gl_PointSize = 1.0;

            vec4 position  = vec4(vertexPosModelSpace, 1.0);
            vec4 normal    = vec4(vertexNormalModelSpace, 0.0);

            gl_Position              = pvmMatrix * position;
            fragmentPosWorldSpace    = vec3(mMatrix * position);
            fragmentNormalWorldSpace = vec3(mTangentSpaceMatrix * normal);
        }
    `;

    const fragmentShader = `
        precision mediump float;

        uniform samplerCube cubeMap;

        uniform vec3 cameraPosWorldSpace;

        varying vec3 fragmentPosWorldSpace;
        varying vec3 fragmentNormalWorldSpace;

        void main() {
            
            vec3 V = normalize(cameraPosWorldSpace - fragmentPosWorldSpace);
            vec3 N = normalize(fragmentNormalWorldSpace);
            vec3 R = reflect(-V, N) * step(0.0, dot(N, V));

            gl_FragColor = textureCube(cubeMap, R);
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
                mMatrix:
                    gl.getUniformLocation(shaderProgram, "mMatrix"),
                mTangentSpaceMatrix:
                    gl.getUniformLocation(shaderProgram, "mTangentSpaceMatrix"),
                cubeMap:
                    gl.getUniformLocation(shaderProgram, "cubeMap"),
                cameraPosWorldSpace:
                    gl.getUniformLocation(shaderProgram, "cameraPosWorldSpace"),
            }

            var attributes = {
                vertexPosModelSpace:
                    gl.getAttribLocation(shaderProgram, "vertexPosModelSpace"),
                vertexNormalModelSpace:
                    gl.getAttribLocation(shaderProgram, "vertexNormalModelSpace"),
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
            program.attributes.vertexNormalModelSpace
        );

        shaderProgram = program.shaders;
        gl.useProgram(shaderProgram);
    }

    function unsetProgram(gl) {
        gl.disableVertexAttribArray(
            program.attributes.vertexPosModelSpace
        );
        gl.disableVertexAttribArray(
            program.attributes.vertexNormalModelSpace
        );
    }

    function drawDrawable(
        gl,
        drawable,
        pMatrix,
        vMatrix,
        mMatrix
    ) {
        // Create and pass transformation matrices
        var vmMatrix = mat4.clone(vMatrix);
        mat4.multiply(vmMatrix, vMatrix, mMatrix);
        var pvmMatrix = mat4.create();
        mat4.multiply(pvmMatrix, pMatrix, vmMatrix);
        var mTangentSpaceMatrix = mat4.clone(mMatrix);
        mat4.transpose(mTangentSpaceMatrix, mTangentSpaceMatrix);
        mat4.invert(mTangentSpaceMatrix, mTangentSpaceMatrix);
        gl.uniformMatrix4fv(
            program.uniforms.pvmMatrix,
            false,
            pvmMatrix
        );
        gl.uniformMatrix4fv(
            program.uniforms.mMatrix,
            false,
            mMatrix
        );
        gl.uniformMatrix4fv(
            program.uniforms.mTangentSpaceMatrix,
            false,
            mTangentSpaceMatrix
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
            drawable.offset * 3 * 4
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
            drawable.offset * 3 * 4
        );

        gl.drawArrays(
            gl.TRIANGLES,
            0,
            drawable.numItems,
        );
        return;
    }

    function drawHierarchy(gl, camera, light, root, cubeMapTexture) {
        // Setup rendering context
        gl.enable(gl.DEPTH_TEST);

        // Pass cube map environment to GPU
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(
            gl.TEXTURE_CUBE_MAP,
            cubeMapTexture
        );
        gl.uniform1i(
            program.uniforms.cubeMap,
            0
        );
        gl.uniform3fv(
            program.uniforms.cameraPosWorldSpace,
            camera.position
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

            if (currNode.drawable) {
                drawDrawable(
                    gl,
                    currNode.drawable,
                    pMatrix,
                    vMatrix,
                    mMatrix
                );
            }

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

export { shaderCubeMap };
