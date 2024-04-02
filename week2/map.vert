// Built-in transformation matrices.
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

// Mesh attributes.
attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aVertexColor;

// Custom uniforms.
uniform float uTime;
uniform vec2 uResolution;

// Passed attributes.
varying vec2 vTexCoord;
varying vec3 vVertexColor;

void main() 
{
  vec3 pos = aPosition;
  float level = pos.z;
  pos.z = 0.0;
  
  // center
  pos.xy -= uResolution * 0.5;


  float dir = mod(level, 2.0) == 0.0 ? 1.0 : -1.0;
  float angle = uTime * 0.1 * dir;
  // mat3 rotation = mat3(
  //   cos(angle), -sin(angle), 0.0,
  //   sin(angle), cos(angle), 0.0,
  //   0.0, 0.0, 1.0
  // );
  // pos = rotation * pos;
  
  // Set the clip space position.
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);

  // Pass data to the fragment shader.
  vTexCoord = aTexCoord;
  vVertexColor = aVertexColor;
}