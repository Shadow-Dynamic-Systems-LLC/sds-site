export const crackTextureVert = `
varying vec2 vUv;

void main() {
    // ScreenQuad passes position in clip space (-1 to 1)
    // Convert to UV (0 to 1)
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const crackTextureFrag = `
uniform sampler2D u_crack1;
uniform sampler2D u_crack2;
uniform sampler2D u_crack3;

uniform float u_time;
uniform vec2 u_res;

// Per-crack transforms (position, scale, rotation)
uniform vec2 u_pos1;
uniform vec2 u_pos2;
uniform vec2 u_pos3;
uniform float u_scale1;
uniform float u_scale2;
uniform float u_scale3;
uniform float u_rot1;
uniform float u_rot2;
uniform float u_rot3;

// Time thresholds for fade-in
// Crack 1: starts at 120s (2min), full at 240s (4min)
// Crack 2: starts at 240s (4min), full at 480s (8min)
// Crack 3: starts at 480s (8min), full at 720s (12min)

varying vec2 vUv;

vec2 rotateUV(vec2 uv, vec2 center, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    uv -= center;
    vec2 rotated = vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
    return rotated + center;
}

vec4 sampleCrack(sampler2D tex, vec2 uv, vec2 pos, float scale, float rot, float opacity) {
    if (opacity <= 0.0) return vec4(0.0);

    // Transform UV to crack space
    vec2 crackUV = uv - pos + 0.5;
    crackUV = rotateUV(crackUV, vec2(0.5), rot);
    crackUV = (crackUV - 0.5) / scale + 0.5;

    // Check bounds
    if (crackUV.x < 0.0 || crackUV.x > 1.0 || crackUV.y < 0.0 || crackUV.y > 1.0) {
        return vec4(0.0);
    }

    vec4 crack = texture2D(tex, crackUV);

    // Use texture's actual alpha channel (images have transparent backgrounds)
    // Pulse the glow subtly
    float pulse = 1.0 + 0.15 * sin(u_time * 0.5 + pos.x * 10.0);

    // Edge fade - smooth falloff near bounds
    float edgeFade = 1.0;
    float fadeWidth = 0.3;
    edgeFade *= smoothstep(0.0, fadeWidth, crackUV.x);
    edgeFade *= smoothstep(0.0, fadeWidth, 1.0 - crackUV.x);
    edgeFade *= smoothstep(0.0, fadeWidth, crackUV.y);
    edgeFade *= smoothstep(0.0, fadeWidth, 1.0 - crackUV.y);

    crack.rgb *= pulse * opacity * 0.75; // 75% overall brightness
    crack.a *= opacity * edgeFade;

    return crack;
}

float getFadeIn(float startTime, float endTime) {
    return clamp((u_time - startTime) / (endTime - startTime), 0.0, 1.0);
}

void main() {
    vec2 uv = vUv;

    // Aspect ratio correction
    float aspect = u_res.x / u_res.y;
    vec2 aspectUV = vec2(uv.x * aspect, uv.y);

    // Base color - dark obsidian
    vec3 baseCol = vec3(0.06, 0.06, 0.07);

    // Subtle surface noise
    float noise = fract(sin(dot(uv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
    baseCol += vec3(noise * 0.015);

    // Calculate fade-in for each crack
    float fade1 = getFadeIn(120.0, 240.0);
    float fade2 = getFadeIn(240.0, 480.0);
    float fade3 = getFadeIn(480.0, 720.0);

    // Sample each crack
    vec4 crack1 = sampleCrack(u_crack1, aspectUV, u_pos1 * vec2(aspect, 1.0), u_scale1, u_rot1, fade1);
    vec4 crack2 = sampleCrack(u_crack2, aspectUV, u_pos2 * vec2(aspect, 1.0), u_scale2, u_rot2, fade2);
    vec4 crack3 = sampleCrack(u_crack3, aspectUV, u_pos3 * vec2(aspect, 1.0), u_scale3, u_rot3, fade3);

    // Additive blend (screen-like for glowing cracks)
    vec3 finalCol = baseCol;
    finalCol = finalCol + crack1.rgb * crack1.a;
    finalCol = finalCol + crack2.rgb * crack2.a;
    finalCol = finalCol + crack3.rgb * crack3.a;

    // Subtle vignette
    vec2 vigUV = uv * (1.0 - uv);
    float vig = pow(vigUV.x * vigUV.y * 15.0, 0.3);
    finalCol *= mix(0.7, 1.0, vig);

    gl_FragColor = vec4(finalCol, 1.0);
}
`;
