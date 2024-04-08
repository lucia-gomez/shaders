#ifdef GL_ES
precision mediump float;
#endif

// Built-in transformation matrices.
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

// Mesh attributes.
attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform vec2 uResolution;

varying vec2 vTexCoord;

void main() 
{
  vec3 pos = aPosition;
  pos.xy -= uResolution * 0.5;

  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);
  
  vTexCoord = aTexCoord;
}