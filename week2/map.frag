#ifdef GL_ES
precision mediump float;
#endif

uniform float uTime;
uniform vec2 uDimensions;
uniform float uOffset;

varying vec2 vTexCoord;
varying vec3 vVertexColor;
uniform sampler2D uTexMap;

float dist(vec2 coord, vec2 coord2) {
  float x = coord.x;
  float y = coord.y;
  float x2 = coord2.x;
  float y2 = coord2.y;
  return sqrt((x2-x)*(x2-x) + (y2-y)*(y2-y));
}

void main() {
  vec4 avgCol = texture2D(uTexMap, vTexCoord);

  vec2 off = vec2(1.0 / uDimensions.x, 1.0 / uDimensions.y) * 24.0;
  
  // blur
  vec4 leftCol = texture2D(uTexMap, vTexCoord + vec2(-off.x, 0));
  vec4 rightCol = texture2D(uTexMap, vTexCoord + vec2(off.x, 0));
  vec4 upCol = texture2D(uTexMap, vTexCoord + vec2(0, -off.y));
  vec4 downCol = texture2D(uTexMap, vTexCoord + vec2(0, off.y));
  avgCol = (leftCol + rightCol + upCol + downCol) / 4.0;
  
  // rgb shift
  float r = texture2D(uTexMap, vTexCoord + vec2(off.x, 0)).r;
  float g = texture2D(uTexMap, vTexCoord + vec2(off.x/2.0, off.y/2.0)).g;
  float b = texture2D(uTexMap, vTexCoord + vec2(0, off.y)).b;
  
  avgCol = vec4(r, g, b, 1.0);
 
   // color blocks
  avgCol[0] *= 1.2 + (dist(vTexCoord, vec2(0.0, 0.0)) - 0.5);
  avgCol[2] *= 1.5 + (dist(vTexCoord, vec2(1.0, 1.0)) - 0.8);
  if (vTexCoord.x > 0.75 && vTexCoord.y < 0.75) {
    avgCol[1] = 1.0;
  }

  // vertex colors
  avgCol += vec4(vVertexColor, 1.0) * 1.0;
  
  gl_FragColor = avgCol;
}