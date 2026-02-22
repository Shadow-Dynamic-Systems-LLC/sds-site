import { noiseGLSL } from './noise';

export const flowRenderFrag = `
${noiseGLSL}

uniform sampler2D u_stateTex;
uniform vec2 u_res;

void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    vec4 state = texture2D(u_stateTex, uv);
    
    float burn = state.r;
    float rough = state.g;
    float heat = state.b;
    
    // Base: Dark Obsidian Crust
    vec3 baseCol = vec3(0.02, 0.02, 0.02);
    
    // Details: Char/Ash texture (lighter grey/brown) from 'burn'
    float ash = fbm(uv * 80.0);
    vec3 ashCol = vec3(0.15, 0.12, 0.10);
    // Burn reveals ash/roughness
    baseCol = mix(baseCol, ashCol * ash, burn * rough * 0.8);
    
    // Magma Flow (Heat)
    // Deep Red -> Orange -> Yellow -> White
    vec3 magmaCol = vec3(0.0);
    
    if (heat > 0.05) {
        float h = (heat - 0.05) / 0.95; // Normalize
        // Multi-stop gradient
        vec3 cRed = vec3(0.5, 0.0, 0.0);
        vec3 cOrange = vec3(1.0, 0.4, 0.0);
        vec3 cYellow = vec3(1.0, 0.9, 0.1);
        vec3 cWhite = vec3(1.0, 1.0, 0.8);
        
        if (h < 0.3) magmaCol = mix(cRed, cOrange, h/0.3);
        else if (h < 0.7) magmaCol = mix(cOrange, cYellow, (h-0.3)/0.4);
        else magmaCol = mix(cYellow, cWhite, (h-0.7)/0.3);
    }
    
    // Add Magma (Emissive)
    baseCol += magmaCol * 1.5; 
    
    // Vignette
    vec2 vUV = uv * (1.0 - uv.yx);
    float vig = vUV.x * vUV.y * 15.0;
    vig = pow(vig, 0.2);
    baseCol *= vig;

    baseCol = min(baseCol, vec3(1.0));
    gl_FragColor = vec4(baseCol, 1.0);
}
`;
