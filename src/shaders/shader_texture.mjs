import { compileShader }
    from "./shaders.mjs"
import { Light }
    from "../common/light.mjs"
import { HierarchyNode }
    from "../common/hierarchy_node.mjs"

var shaderTexture = (function () {
    var program = null;

    const vertexShader = `
        uniform vec3 lightPosWorldSpace;

        uniform mat4 pvmMatrix;
        uniform mat4 vmMatrix;
        uniform mat4 vMatrix;
        uniform mat4 normalMatrix;

        attribute vec3 vertexPosModelSpace;
        attribute vec3 vertexNormalModelSpace;
        attribute vec2 vertexPosTextureSpace;

        attribute vec3  vertexSpecular;
        attribute float vertexShine;

        varying vec3 fragmentPosEyeSpace;
        varying vec3 lightPosEyeSpace;
        varying vec3 fragmentNormalEyeSpace;
        varying vec2 fragmentPosTextureSpace;

        varying vec3  fragmentSpecular;
        varying float fragmentShine;
        void main() {
            gl_PointSize = 1.0;

            vec4 position = vec4(vertexPosModelSpace, 1.0);
            vec4 normal   = vec4(vertexNormalModelSpace, 0.0);

            gl_Position            = pvmMatrix * position;
            fragmentPosEyeSpace    = vec3(vmMatrix * position);
            lightPosEyeSpace       = vec3(vMatrix * vec4(lightPosWorldSpace, 1.0));
            fragmentNormalEyeSpace = vec3(normalMatrix * normal);

            fragmentPosTextureSpace = vertexPosTextureSpace;
            fragmentSpecular        = vertexSpecular;
            fragmentShine           = vertexShine;
        }
    `;

    const fragmentShader = `
        precision mediump float;

        uniform sampler2D texture;

        uniform vec3 lightAmbient;
        uniform vec3 lightDiffuse;
        uniform vec3 lightSpecular;

        varying vec3 fragmentPosEyeSpace;
        varying vec3 lightPosEyeSpace;
        varying vec3 fragmentNormalEyeSpace;
        varying vec2 fragmentPosTextureSpace;

        varying vec3  fragmentSpecular;
        varying float fragmentShine;
        void main() {
            vec3 L = normalize(lightPosEyeSpace - fragmentPosEyeSpace);
            vec3 N = normalize(fragmentNormalEyeSpace);
            vec3 R = reflect(-L, N);
            vec3 V = normalize(-fragmentPosEyeSpace);

            vec3 textureColor = vec3(
                texture2D(
                    texture,
                    fragmentPosTextureSpace
                )
            );
            gl_FragColor      = vec4(
                textureColor * lightAmbient +
                textureColor * lightDiffuse * max(0.0, dot(N, L)) +
                fragmentSpecular * lightSpecular * pow(
                    max(0.0, dot(R, V)), fragmentShine
                ),
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
                texture:
                    gl.getUniformLocation(shaderProgram, "texture"),
                lightPosWorldSpace:
                    gl.getUniformLocation(shaderProgram, "lightPosWorldSpace"),
                lightAmbient:
                    gl.getUniformLocation(shaderProgram, "lightAmbient"),
                lightDiffuse:
                    gl.getUniformLocation(shaderProgram, "lightDiffuse"),
                lightSpecular:
                    gl.getUniformLocation(shaderProgram, "lightSpecular"),
                pvmMatrix:
                    gl.getUniformLocation(shaderProgram, "pvmMatrix"),
                vmMatrix:
                    gl.getUniformLocation(shaderProgram, "vmMatrix"),
                vMatrix:
                    gl.getUniformLocation(shaderProgram, "vMatrix"),
                normalMatrix:
                    gl.getUniformLocation(shaderProgram, "normalMatrix"),
            }

            var attributes = {
                vertexPosModelSpace:
                    gl.getAttribLocation(shaderProgram, "vertexPosModelSpace"),
                vertexNormalModelSpace:
                    gl.getAttribLocation(shaderProgram, "vertexNormalModelSpace"),
                vertexPosTextureSpace:
                    gl.getAttribLocation(shaderProgram, "vertexPosTextureSpace"),
                vertexSpecular:
                    gl.getAttribLocation(shaderProgram, "vertexSpecular"),
                vertexShine:
                    gl.getAttribLocation(shaderProgram, "vertexShine"),
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
            program.attributes.vertexPosTextureSpace
        );
        gl.enableVertexAttribArray(
            program.attributes.vertexSpecular
        );
        gl.enableVertexAttribArray(
            program.attributes.vertexShine
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
            program.attributes.vertexPosTextureSpace
        );
        gl.disableVertexAttribArray(
            program.attributes.vertexSpecular
        );
        gl.disableVertexAttribArray(
            program.attributes.vertexShine
        );
    }

    function drawDrawable(
        gl,
        drawable,
        pMatrix,
        vMatrix,
        mMatrix,
        texture
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
        
        // Pass texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(program.uniforms.texture, 0);

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
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            drawable.textureBuffer.buffer
        );
        gl.vertexAttribPointer(
            program.attributes.vertexPosTextureSpace,
            drawable.textureBuffer.itemSize,
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
            drawable.offset * 4 * 4
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
            drawable.offset * 1 * 4
        );

        gl.drawArrays(
            gl.TRIANGLES,
            0,
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
                mMatrix,
                currNode.texture.texture
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

export { shaderTexture };
