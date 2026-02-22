import { noiseGLSL } from './noise';

export const fractureStateFrag = `
${noiseGLSL}

uniform sampler2D u_prevState;
uniform float u_time;
uniform float u_dt;
uniform vec2 u_res;
uniform float u_intensity;
uniform float u_seed;

// GEOLOGICAL TIMEFRAME (v6: "Gradient Resistance")
// Key Feature: Cracks follow the "Path of Least Resistance" (Center of Fault).
// Widening requires significantly more pressure than lengthening.

const float ACCUMULATION_RATE = 0.08; 
const float DECAY_RATE = 0.05; 
const float STRESS_CAP = 4.0; 

const float TRANSFER_RATE = 0.05; 
const float PROPAGATION_THRESH = 2.0;

// Fault Lines with GRADIENT
// Returns 0.0 -> 1.0, where 1.0 is the exact center of the fault.
float getFaultLines(vec2 uv) {
    vec2 seedOffset = vec2(u_seed * 100.0, u_seed * 50.0);
    vec2 warp = vec2(fbm((uv+seedOffset)*6.0), fbm((uv+seedOffset)*6.0+4.1)) * 0.04;
    vec2 p = uv + warp + seedOffset;
    
    float f1 = voronoiBorder(p * 3.0);
    float f2 = voronoiBorder(vec2(p.y, p.x) * 6.0); 
    
    // Gradient: 0.95 to 1.0
    // Pixels at 0.95 are "Edge", 1.0 are "Center".
    // This gives us a 5% gradient to play with for resistance.
    float lines = smoothstep(0.95, 1.0, max(f1, f2));
    
    // Mask Connectivity (Low freq chunks)
    float mask = fbm(uv * 1.5 + u_seed); 
    if (mask < 0.45) lines = 0.0;
    
    return lines;
}

float getHotspots(vec2 uv) {
    vec2 p = uv * 2.0; 
    vec2 i = floor(p);
    float h = fract(sin(dot(i + u_seed, vec2(12.9898, 78.233))) * 43758.5453);
    if (h < 0.8) return 0.0; 
    return 1.0;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    vec2 pixel = 1.0 / u_res; 
    float dt = u_dt;
    
    // 1. GRID PHYSICS
    float GRID_SCALE = 50.0;
    vec2 gridUV = uv * GRID_SCALE;
    vec2 cellCenter = (floor(gridUV) + 0.5) / GRID_SCALE;
    vec4 prev = texture2D(u_prevState, uv); 
    vec4 cellState = texture2D(u_prevState, cellCenter); 
    float myStress = cellState.r; 
    
    float faultStrength = getFaultLines(uv);
    float cellFault = getFaultLines(cellCenter);
    
    float pressure = u_intensity * ACCUMULATION_RATE * dt;
    float hotspot = getHotspots(uv);
    float noiseVar = 0.5 + 0.5 * fbm(uv * 2.0);
    
    // Stress Concentration:
    // We allow global accumulation (Grid Pressure) so the simulation isn't "Dead"
    // The Fault Line check is done at the BREAK point, not the ACCUMULATION point.
    // However, hotspots focus the stress.
    
    myStress += pressure * (1.0 + hotspot * 3.0) * noiseVar;
    
    // Propagation
    vec2 stride = vec2(1.0 / GRID_SCALE, 0.0);
    float nN = texture2D(u_prevState, cellCenter + stride.yx).r; 
    float nS = texture2D(u_prevState, cellCenter - stride.yx).r; 
    float nE = texture2D(u_prevState, cellCenter + stride).r;    
    float nW = texture2D(u_prevState, cellCenter - stride).r;    
    
    float incoming = 0.0;
    if (nN > PROPAGATION_THRESH) incoming += (nN - PROPAGATION_THRESH);
    if (nS > PROPAGATION_THRESH) incoming += (nS - PROPAGATION_THRESH);
    if (nE > PROPAGATION_THRESH) incoming += (nE - PROPAGATION_THRESH);
    if (nW > PROPAGATION_THRESH) incoming += (nW - PROPAGATION_THRESH);
    
    // Neighbors push stress onto me
    myStress += incoming * dt * TRANSFER_RATE; 
    myStress -= DECAY_RATE * dt;
    myStress = clamp(myStress, 0.0, STRESS_CAP);
    
    float stress = myStress; 

    // 2. CRACK MECHANICS via GRADIENT RESISTANCE
    float crack = prev.g;
    
    // We only allow cracking if faultStrength > 0.
    // AND we scale the stress threshold by (1.0 / faultStrength)
    // Center (1.0) -> Thr 1.0
    // Edge (0.5) -> Thr 2.0
    
    float maxAdj = 0.0;
    maxAdj = max(maxAdj, texture2D(u_prevState, uv + vec2(pixel.x, 0.0)).g);
    maxAdj = max(maxAdj, texture2D(u_prevState, uv - vec2(pixel.x, 0.0)).g);
    maxAdj = max(maxAdj, texture2D(u_prevState, uv + vec2(0.0, pixel.y)).g);
    maxAdj = max(maxAdj, texture2D(u_prevState, uv - vec2(0.0, pixel.y)).g);
    
    float newCrack = 0.0;
    
    // Resistance Logic
    // High fault strength (center) = Low Resistance (1.0)
    // Low fault strength (edge) = High Resistance (up to Infinity)
    float resistance = (faultStrength > 0.001) ? (1.0 / (faultStrength * faultStrength)) : 999.0;
    
    // GENESIS
    // Standard Thr 2.5 * Resistance
    // Cap resistance to avoid infinite impossible breaks
    float effectiveRes = min(resistance, 10.0);
    
    if (maxAdj == 0.0 && stress > (2.5 * effectiveRes) && faultStrength > 0.01) {
         newCrack = 0.005;
    }
    
    // PROPAGATION / ZIP
    if (maxAdj > 0.002 && faultStrength > 0.01) {
        // Standard Thr 1.0 * Resistance
        if (stress > (1.0 * effectiveRes * effectiveRes)) { // Squared for extra edge stiffness
            newCrack = 0.005;
        }
    }
    
    crack = max(crack, newCrack);
    
    // 3. WIDENING (Sub-Pixel Creep + Exponential Resistance)
    if (crack > 0.0) {
        float widthRes = 1.0 + crack * 75.0; // Halved resistance
        float widen = (0.002 * dt * stress) / widthRes; 
        crack += widen;
    }
    // Strict Cap slightly tighter
    crack = min(crack, 0.3);

    // 4. ENERGY RELEASE (Soft)
    // If cracked, we don't hold stress well.
    // Instead of snapping to 0.0, we just increase decay heavily.
    if (crack > 0.05) {
        stress -= 2.0 * dt; // Rapid drain, but continuous.
    }
    
    // 2. THE MAGMA (Crack > 0.15)
    float magmaThreshold = 0.15;
    float magmaMask = smoothstep(magmaThreshold, magmaThreshold + 0.1, crack); 
    
    // 5. HEAT
    float heat = prev.b;
    // Heat up sooner so we don't have cold wide cracks
    if (crack > 0.1) { // 10% (Lead visible lava slightly)
        heat = mix(heat, 1.0, 0.8 * dt); 
    } else {
        heat -= 0.2 * dt; 
    }
    heat = clamp(heat, 0.0, 1.0);

    gl_FragColor = vec4(stress, crack, heat, 1.0);
}
`;
