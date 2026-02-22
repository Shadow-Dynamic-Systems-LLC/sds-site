// Basic 2D Simplex Noise
export const noiseGLSL = `
// -----------------------------------
// Simplex Noise 2D
// -----------------------------------
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// -----------------------------------
// FBM (Fractal Brownian Motion)
// -----------------------------------
float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
        v += a * snoise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

// -----------------------------------
// Cellular / Voronoi Noise 2D
// -----------------------------------
vec2 voronoiHash(vec2 p) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

// Returns vec2(F1, F2) - distances to 1st and 2nd closest feature points
vec2 cellular(vec2 P) {
    const float K = 0.142857142857; // 1/7
    const float K2 = 0.071428571428; // K/2
    const float jitter = 1.0; // border irregularity
    
    vec2 Pi = floor(P);
    vec2 Pf = fract(P);
    
    vec2 dists = vec2(1.0); // F1, F2
    
    for(int j=-1; j<=1; j++) {
        for(int i=-1; i<=1; i++) {
            vec2 neighbour = vec2(float(i), float(j));
            vec2 point = voronoiHash(Pi + neighbour);
            // Animate point?
            // point = 0.5 + 0.5*sin(u_time * 0.1 + 6.2831*point); 
            // Static for now, or use jitter
            vec2 diff = neighbour + point - Pf;
            
            float dist = length(diff);
            
            // Branchless F1/F2 update
            if (dist < dists.x) {
                dists.y = dists.x;
                dists.x = dist;
            } else if (dist < dists.y) {
                dists.y = dist;
            }
        }
    }
    return dists;
}

// Border Noise: Returns 1.0 at border, 0.0 at center
// Uses (F2 - F1)
float voronoiBorder(vec2 p) {
    vec2 c = cellular(p);
    float F1 = c.x;
    float F2 = c.y;
    // F2 - F1 is small at boundaries (approx 0), large at centers
    // We want the opposite: 1.0 at boundary (crack), 0.0 elsewhere
    float diff = F2 - F1;
    // Sharpen
    return smoothstep(0.05, 0.0, diff); 
}
`;
