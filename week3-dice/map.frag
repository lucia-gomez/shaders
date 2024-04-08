#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uResolution;
uniform int uTime;

vec3 circle(vec2 pos, vec2 center) {
  float r = distance(pos, center);
  float pct = step(0.1, r);
  return vec3(pct);
}

vec3 one(vec2 pos, vec2 center) {
  return circle(pos, center);
}

vec3 two(vec2 pos, vec2 center) {
  vec3 dot1 = circle(pos, vec2(center.x*1.5, center.y*0.5));
  vec3 dot2 = circle(pos, vec2(center.x*0.5, center.y*1.5));
  return dot1 * dot2;
}

vec3 three(vec2 pos, vec2 center) {
  return one(pos, center)*two(pos, center);
}

vec3 four(vec2 pos, vec2 center) {
  vec3 topRight = circle(pos, vec2(center.x * 1.5, center.y * 1.5));
  vec3 bottomLeft = circle(pos, vec2(center.x * 0.5, center.y * 0.5));
  return  topRight * bottomLeft * two(pos, center);
}

vec3 five(vec2 pos, vec2 center) {
  return one(pos, center) * four(pos, center);
}

vec3 six(vec2 pos, vec2 center) {
  vec3 topLeft = circle(pos, vec2(center.x * 0.5, center.y * 1.6));
  vec3 topRight = circle(pos, vec2(center.x * 1.5, center.y * 1.6));
  vec3 middleLeft = circle(pos, vec2(center.x * 0.5, center.y));
  vec3 middleRight = circle(pos, vec2(center.x * 1.5, center.y));
   vec3 bottomLeft = circle(pos, vec2(center.x * 0.5, center.y * 0.4));
  vec3 bottomRight = circle(pos, vec2(center.x * 1.5, center.y * 0.4));
  return topRight * topLeft * middleRight * middleLeft * bottomRight * bottomLeft;
}

float roundedSquare(vec2 p, float size, float radius) {
    vec2 d = abs(p) - vec2(size - radius);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;
}

float random(int x) {
  return fract(sin(float(x))*100000.0);
}

void main() {
  vec2 st = gl_FragCoord.xy/(uResolution.xy*2.0);
  vec3 color = vec3(1.0);
  
  st *= 9.0; 
  
  int cellX = int(st.x + float(uTime));
  int cellY = int(st.y + float(uTime));
  
  st = fract(st);
  
  float size = 0.46; // half size of the square
  float radius = 0.1; // radius of the corners
  float dist = roundedSquare(st - vec2(0.5), size, radius);

  float outlineWidth = 0.01;
  float outlineDist = abs(dist) - outlineWidth;
  float alpha = smoothstep(0.0, 1.0, outlineDist);

  if (dist > -outlineWidth && dist < outlineWidth) {
      color = vec3(0.0); // Inside the outline
  } 
  
  int rand = int(floor(random(cellX + cellY*cellY) * 5.0 + 0.5));
  
  if (rand == 0) {
    color *= one(st, vec2(0.5, 0.5));
  } 
  if (rand == 1) {
     color *= two(st, vec2(0.5, 0.5));
  }
  if (rand == 2) {
     color *= three(st, vec2(0.5, 0.5));
  }
  if (rand == 3){
     color *= four(st, vec2(0.5, 0.5));
  }
  if (rand == 4){
     color *= five(st, vec2(0.5, 0.5));
  }
   if (rand == 5){
     color *= six(st, vec2(0.5, 0.5));
  }
  
  gl_FragColor = vec4(color,1.0);
}