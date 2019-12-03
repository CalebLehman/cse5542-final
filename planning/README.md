## Project overview

My overall idea is to have a small display dedicated to some famous knots.
Each knot is placed on one of several pedestals and the user is be able
to walk around the scene and view the knots.

### Goals / Requirements

The given requirements for the project can be found
[here](http://web.cse.ohio-state.edu/~shen.94/5542/Site/Lab5.html) or
[here](../assignment/assignment.html) (local copy).
The following is a summary of the requirements and the
following sections detail how my project addresses them.

- [x] [Texture mapping on a surface](#texture-mapping)
- [x] [Parametric surface](#parametric-surface)
- [x] [Environment cube mapping](#environment-cube-mapping)
- [x] [Semester content (put everything together)](#semester-content)
- [x] [Bump mapping](#bump-mapping) (Note: bonus)

#### Texture mapping

*Requirement* - The scene must contain a planar surface and a parametric surface with textures
mapped onto them.

*My Scene* - By selecting the texture mapping shader and choosing textures, my
scene allows the user to map a texture onto boxes (planar surfaces) and to map
textures onto knots (parametrics surfaces).

#### Parametric surface

*Requirement* - The scene must contain some parametric surface(s). The user
must be able to toggle the models between:

* wire-frame
* flat color (with lighting)
* textured (with lighting)
* reflective (using WebGL/OpenGL environment cube mapping)

*My Scene* - Contains several parametric surfaces (knots) and the
user is be able to toggle the knots between:

* wire-frame mode (barycentric-ish coordinates are used to drive both *quad* and *tri* wire-frame renderers)
* phong shader mode
* texture mode (including normal mapping for some textures)
* reflective mode (using environment cube mapping)

*Parametric Equations Used* -

The following equations define the basic paths in 3-dimensional space
as $t$ varies from $0$ to $1$.
I numerically re-parametrized these path to have constant speed (for easier texturing).
I then used the parametric equations to convert these paths into \"tubes\"
(one parameter follows the path, the other follows a small circle orthogonal
to the path):

$r_1(t) = \langle \frac{3}{2}\cos(2\pi t)$, $0$, $\frac{3}{2}\cos \rangle \qquad (Unknot)$

$r_2(t) = \langle \cos(6\pi t) (1 + \frac{1}{2}\cos(4\pi t))$, $\frac{1}{2}\sin(4\pi t)$, $\sin(6\pi t) (1 + \frac{1}{2}\cos(4\pi t)) \rangle \qquad (Trefoil\text{ }knot)$


$r_3(t) = \langle \cos(6\pi t)(2 + \cos(4\pi t)), \sin(8\pi t), \sin(6\pi t)(2 + \cos(4\pi t))$$\rangle \qquad (Figure-eight\text{ }knot)$

#### Environment cube mapping

*Requirement* - The scene must have 6 walls and some geometric primitives and
parametrics surfaces which are reflective, using the enivornment cube mapping
feature in WebGl.

*My Scene* - Has a toggle to make both the boxes (geometric primitive)
and knots (parametric surfaces) reflective. The user can turn on the reflective shader
and select from several surrounding environments, which will automatically set the light
in the correct position.

#### Semester content

*Requirement* - Put together everything learned in the semester.  In particular, The scene must
have

* hierarchical modeling
* lighting
* local and global transformations
* some animation

*My Scene* -

* knots on top of pedestals (hierarchical modeling)
* phong shading (lighting)
* ability for player can move around, rotate view, and rotate knots (local and global transformations)
* knots which can rotate and \"tie\" themselves in place (animation)

#### Bump mapping

*Requirement* - The scene should implement bump mapping.

*My Scene* - Has bump mapping (normal mapping) implemented in the texture mapping
shader.  In particular, the \"Brick,\" \"Scales,\" and \"Organic\" textures
have non-trivial normal textures).
