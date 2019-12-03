## Project overview

My overall idea is to have a small \"museum\" dedicated to some simple knots.
Each knot will be placed on one of several pedestals and the user will be able
to walk around the scene and view the knots.

### Goals

The full goals for the project can be found
[here](http://web.cse.ohio-state.edu/~shen.94/5542/Site/Lab5.html) or
[here](../assignment/assignment.html) (local copy).
The following is a summary of the goals for the final project.  The
following sections detail how my project addresses them.

- [ ] [Texture mapping on a surface](#texture-mapping)
- [ ] [Parametric surface](#parametric-surface)
- [ ] [Environment cube mapping](#environment-cube-mapping)
- [ ] [Semester content](#semester-content)
- [ ] [Bump mapping](#bump-mapping) (Note: bonus)

#### Texture mapping

The scene must contain a plane with a texture mapped onto it.

My scene will have a texture (english words) mapped onto
a plane (descriptive placard) behind each knot.

#### Parametric surface

The scene must contain some parametric surface(s). The user
must be able to toggle the models between

* wire-frame
* flat color (with lighting)
* textured (with lighting)
* reflective (using WebGL/OpenGL environment cube mapping)

In my scene, the user will be able to toggle the knots between

* wire-frame mode
* glossy \"plastic\" mode
* rope mode (\"scaly\" if making rope texture ends up being too difficult)
* reflective mode

#### Environment cube mapping

The scene must have 6 walls an some objects which are reflective, using the
enivornment cube mapping feature in WebGl.

My scene will have an toggle to make both the pedestals (geometric primitive)
and knots (parametric surfaces) reflective.

#### Semester content

The scene must have

* hierarchical modeling
* lighting
* local and \"global\" transformations
* some animation

My scene will have

* knots on top of pedestals on top of the ground
* phong shading
* player can move around, rotate view, and rotate knots
* knots will have \"creation\" animation

#### Bump mapping

The scene should implement bump mapping.

My scene will have bump mapping on the knots, either for the rope texture or
the \"scaly\" texture.
