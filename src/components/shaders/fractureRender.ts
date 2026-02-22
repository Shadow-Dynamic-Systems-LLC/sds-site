import { noiseGLSL } from './noise';

export const fractureRenderFrag = `
${noiseGLSL}

uniform sampler2D u_stateTex;
uniform vec2 u_res;
uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    vec4 state = texture2D(u_stateTex, uv);
    
    // Channels recovered from State
    float depth = state.g; 
    float heat = state.b;  
    
    // Base: Dark Grey (Stone/Obsidian)
    vec3 baseCol = vec3(0.08, 0.08, 0.09); 
    
    // Surface noise
    float surf = fbm(uv * 15.0);
    baseCol += vec3(surf * 0.02);
    
    // Lava Coloring
    float noiseVar = fbm(uv * 50.0);
    float localHeat = clamp(heat + (noiseVar - 0.5) * 0.2, 0.0, 1.0);
    
    // Deep Red -> Orange
    vec3 cDeep = vec3(0.1, 0.0, 0.0);    
    vec3 cMid = vec3(0.8, 0.1, 0.0);     
    vec3 cHot = vec3(1.0, 0.5, 0.05);    
    
    vec3 lavaCol = vec3(0.0);
    if (localHeat < 0.5) lavaCol = mix(cDeep, cMid, localHeat * 2.0);
    else lavaCol = mix(cMid, cHot, (localHeat - 0.5) * 2.0);
    
    // MASKING LOGIC
    
    // 1. THE VOID (Crack > 0.002) -> PURE BLACK
    float voidThreshold = 0.002; // Microscopic visibility
    float voidMask = smoothstep(voidThreshold, voidThreshold + 0.05, depth);
    
    // 2. THE MAGMA (Crack > 0.15)
    // Delayed reveal
    float magmaThreshold = 0.15;
    float magmaMask = smoothstep(magmaThreshold, magmaThreshold + 0.1, depth);
    
    // Comp
    baseCol = mix(baseCol, vec3(0.0), voidMask);
    
    // Apply Magma
    vec3 finalLava = lavaCol * 1.5; 
    baseCol = mix(baseCol, finalLava, magmaMask);

    // Vignette
    vec2 vUV = uv * (1.0 - uv.yx);
    float vig = pow(vUV.x * vUV.y * 15.0, 0.25);
    baseCol *= vig;

    gl_FragColor = vec4(baseCol, 1.0);
}
`;
