import { noiseGLSL } from './noise';

export const flowStateFrag = `
${noiseGLSL}

uniform sampler2D u_prevState;
uniform float u_time;
uniform float u_dt;
uniform vec2 u_res;
uniform vec2 u_dir; 
uniform float u_intensity;

// Params - Bolder Flow
const float speed = 0.15; // Faster
const float burnRate = 0.4;
const float roughRate = 0.3;
const float residueDecay = 0.5;
const float heatNoiseScale = 2.0;

void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    float dt = u_dt;
    
    vec4 prev = texture2D(u_prevState, uv);
    
    // Directional Flow
    float proj = dot(uv, normalize(u_dir));
    float phase = u_time * speed;
    
    // Turbulence
    vec2 turb = vec2(fbm(uv*5.0 + u_time), fbm(uv*5.0 - u_time));
    
    // Wave
    // Use sine wave modulated by noise for "rivers"
    float wave = sin(proj * 15.0 - phase * 6.28 + turb.x * 2.0);
    float band = smoothstep(0.8, 1.0, wave); // Sharp bursts
    
    // Modulate intensity
    float instHeat = band * u_intensity;
    
    // 2. Burn / Roughness
    float burn = prev.r;
    burn = max(burn, burn + instHeat * burnRate * dt * 5.0);
    burn = min(burn, 1.0);
    
    float rough = prev.g;
    rough = max(rough, rough + instHeat * roughRate * dt * 5.0);
    rough = min(rough, 1.0);
    
    // 3. Heat Residue
    float residue = prev.b;
    residue = max(residue, instHeat);
    residue = max(0.0, residue * exp(-residueDecay * dt * 5.0));
    
    // Advect heat slightly?
    
    gl_FragColor = vec4(burn, rough, residue, 1.0);
}
`;
