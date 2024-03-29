import { compileShader }
    from "./shaders.mjs"
import { Light }
    from "../common/light.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"

var shaderPhong = (function () {
    var program = null;

    const vertexShader = `
        uniform vec3 lightPosWorldSpace;

        uniform mat4 pvmMatrix;
        uniform mat4 vmMatrix;
        uniform mat4 vMatrix;
        uniform mat4 vmTangentSpaceMatrix;

        attribute vec3  vertexPosModelSpace;
        attribute vec3  vertexNormalModelSpace;

        attribute vec3  vertexAmbient;
        attribute vec3  vertexDiffuse;
        attribute vec3  vertexSpecular;
        attribute float vertexShine;

        varying vec3 fragmentPosEyeSpace;
        varying vec3 lightPosEyeSpace;
        varying vec3 fragmentNormalEyeSpace;

        varying vec3  fragmentAmbient;
        varying vec3  fragmentDiffuse;
        varying vec3  fragmentSpecular;
        void main() {
            gl_PointSize = 1.0;

            vec4 position = vec4(vertexPosModelSpace, 1.0);
            vec4 normal   = vec4(vertexNormalModelSpace, 0.0);

            gl_Position            = pvmMatrix * position;
            fragmentPosEyeSpace    = vec3(vmMatrix * position);
            lightPosEyeSpace       = vec3(vMatrix * vec4(lightPosWorldSpace, 1.0));
            fragmentNormalEyeSpace = vec3(vmTangentSpaceMatrix * normal);

            fragmentAmbient  = vertexAmbient;
            fragmentDiffuse  = vertexDiffuse;
            fragmentSpecular = vertexSpecular;
        }
    `;

    const fragmentShader = `
        precision mediump float;

        uniform vec3 lightAmbient;
        uniform vec3 lightDiffuse;
        uniform vec3 lightSpecular;

        varying vec3 fragmentPosEyeSpace;
        varying vec3 lightPosEyeSpace;
        varying vec3 fragmentNormalEyeSpace;

        varying vec3  fragmentAmbient;
        varying vec3  fragmentDiffuse;
        varying vec3  fragmentSpecular;
        uniform float shine;

        void main() {
            vec3 L = normalize(lightPosEyeSpace - fragmentPosEyeSpace);
            vec3 N = normalize(fragmentNormalEyeSpace);
            vec3 R = reflect(-L, N) * step(0.0, dot(L, N));
            vec3 V = normalize(-fragmentPosEyeSpace);

            gl_FragColor = vec4(
                fragmentAmbient * lightAmbient
                +
                fragmentDiffuse * lightDiffuse *
                    max(0.0, dot(N, L))
                +
                fragmentSpecular * lightSpecular *
                    pow(max(0.0, dot(R, V)), shine)
                ,
                1.0
            );
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
                lightPosWorldSpace:
                    gl.getUniformLocation(shaderProgram, "lightPosWorldSpace"),
                lightAmbient:
                    gl.getUniformLocation(shaderProgram, "lightAmbient"),
                lightDiffuse:
                    gl.getUniformLocation(shaderProgram, "lightDiffuse"),
                lightSpecular:
                    gl.getUniformLocation(shaderProgram, "lightSpecular"),
                shine:
                    gl.getUniformLocation(shaderProgram, "shine"),
                pvmMatrix:
                    gl.getUniformLocation(shaderProgram, "pvmMatrix"),
                vmMatrix:
                    gl.getUniformLocation(shaderProgram, "vmMatrix"),
                vMatrix:
                    gl.getUniformLocation(shaderProgram, "vMatrix"),
                vmTangentSpaceMatrix:
                    gl.getUniformLocation(shaderProgram, "vmTangentSpaceMatrix"),
            }

            var attributes = {
                vertexPosModelSpace:
                    gl.getAttribLocation(shaderProgram, "vertexPosModelSpace"),
                vertexNormalModelSpace:
                    gl.getAttribLocation(shaderProgram, "vertexNormalModelSpace"),
                vertexAmbient:
                    gl.getAttribLocation(shaderProgram, "vertexAmbient"),
                vertexDiffuse:
                    gl.getAttribLocation(shaderProgram, "vertexDiffuse"),
                vertexSpecular:
                    gl.getAttribLocation(shaderProgram, "vertexSpecular"),
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
        gl.enableVertexAttribArray(
            program.attributes.vertexAmbient
        );
        gl.enableVertexAttribArray(
            program.attributes.vertexDiffuse
        );
        gl.enableVertexAttribArray(
            program.attributes.vertexSpecular
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
        gl.disableVertexAttribArray(
            program.attributes.vertexAmbient
        );
        gl.disableVertexAttribArray(
            program.attributes.vertexDiffuse
        );
        gl.disableVertexAttribArray(
            program.attributes.vertexSpecular
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
        var vmTangentSpaceMatrix = mat4.clone(vmMatrix);
        mat4.transpose(vmTangentSpaceMatrix, vmTangentSpaceMatrix);
        mat4.invert(vmTangentSpaceMatrix, vmTangentSpaceMatrix);
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
            program.uniforms.vmTangentSpaceMatrix,
            false,
            vmTangentSpaceMatrix
        );

        // Pass shine
        gl.uniform1f(
            program.uniforms.shine,
            drawable.shine
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

        gl.drawArrays(
            gl.TRIANGLES,
            drawable.offset,
            drawable.numItems,
        );
        return;
    }

    function drawHierarchy(gl, camera, light, root) {
        // Setup rendering context
        gl.enable(gl.DEPTH_TEST);

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

export { shaderPhong };
