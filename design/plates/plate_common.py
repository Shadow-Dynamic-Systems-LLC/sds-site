"""
Shared "naturalist specimen plate" SVG scaffolding for the SDS Forge Restraint
image set. One frame system, reused across six distinct engraved motifs.

Palette (from sds-site src/index.css :root):
  paper   #FBFAF7   ink    #141414   graphite #423f39
  hair    #d9d3c7   brass  #b8860b   rust     #c33000   magma #ff9900
"""

def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


PAPER = "#FBFAF7"
PAPER2 = "#F4F2EC"
INK = "#141414"
GRAPHITE = "#423f39"
GRAPHITE_SOFT = "#8c867a"
HAIR = "#d9d3c7"
BRASS = "#b8860b"
RUST = "#c33000"
MAGMA = "#ff9900"

W = H = 1024
M = 56  # outer margin to hairline frame


def defs_block(seed=0):
    """Crosshatch + stipple patterns used for engraved shading fills."""
    return f'''
  <defs>
    <pattern id="hatch45" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45 0 0)">
      <line x1="0" y1="0" x2="0" y2="9" stroke="{GRAPHITE}" stroke-width="0.9" opacity="0.55"/>
    </pattern>
    <pattern id="crosshatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45 0 0)">
      <line x1="0" y1="0" x2="0" y2="9" stroke="{GRAPHITE}" stroke-width="0.9" opacity="0.55"/>
      <line x1="0" y1="0" x2="9" y2="0" stroke="{GRAPHITE}" stroke-width="0.9" opacity="0.4"/>
    </pattern>
    <pattern id="hatchFine" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45 0 0)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="{GRAPHITE}" stroke-width="0.6" opacity="0.4"/>
    </pattern>
    <pattern id="paperGrain" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="4" fill="{PAPER}"/>
      <circle cx="1" cy="1" r="0.35" fill="{GRAPHITE_SOFT}" opacity="0.06"/>
      <circle cx="3" cy="3" r="0.3" fill="{GRAPHITE_SOFT}" opacity="0.05"/>
    </pattern>
    <radialGradient id="vignette" cx="50%" cy="46%" r="72%">
      <stop offset="0%" stop-color="{PAPER}" stop-opacity="0"/>
      <stop offset="82%" stop-color="{PAPER}" stop-opacity="0"/>
      <stop offset="100%" stop-color="{GRAPHITE}" stop-opacity="0.05"/>
    </radialGradient>
  </defs>
'''


def frame_open(fig_no, series_label):
    """Paper ground, hairline frame with corner ticks, top classification rule."""
    tick = 16
    corners = f'''
    <path d="M {M} {M+tick} V {M} H {M+tick}" stroke="{INK}" stroke-width="1.5" fill="none"/>
    <path d="M {W-M-tick} {M} H {W-M} V {M+tick}" stroke="{INK}" stroke-width="1.5" fill="none"/>
    <path d="M {M} {H-M-tick} V {H-M} H {M+tick}" stroke="{INK}" stroke-width="1.5" fill="none"/>
    <path d="M {W-M-tick} {H-M} H {W-M} V {H-M-tick}" stroke="{INK}" stroke-width="1.5" fill="none"/>
    '''
    return f'''<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
{defs_block()}
  <rect width="{W}" height="{H}" fill="url(#paperGrain)"/>
  <rect width="{W}" height="{H}" fill="url(#vignette)"/>
  <rect x="{M}" y="{M}" width="{W-2*M}" height="{H-2*M}" fill="none" stroke="{HAIR}" stroke-width="1"/>
  {corners}
  <text x="{M+22}" y="{M+40}" font-family="IBM Plex Mono" font-size="15" letter-spacing="3" fill="{GRAPHITE}" opacity="0.75">{esc(fig_no)}</text>
  <text x="{W-M-22}" y="{M+40}" font-family="IBM Plex Mono" font-size="15" letter-spacing="3" fill="{GRAPHITE}" opacity="0.75" text-anchor="end">{esc(series_label)}</text>
  <line x1="{M+22}" y1="{M+54}" x2="{W-M-22}" y2="{M+54}" stroke="{HAIR}" stroke-width="1"/>
'''


def frame_close(title, subtitle, notation):
    """Bottom specimen caption block, mirroring the ai-sys-fail.webp precedent
    (display title + serif subtitle + a single dark notation bar)."""
    band_h = 74
    band_y = H - M - band_h - 30
    return f'''
  <line x1="{M+22}" y1="{H-M-96}" x2="{W-M-22}" y2="{H-M-96}" stroke="{HAIR}" stroke-width="1"/>
  <text x="{M+24}" y="{H-M-56}" font-family="Squada One" font-size="40" letter-spacing="1" fill="{INK}">{esc(title)}</text>
  <text x="{M+24}" y="{H-M-28}" font-family="IBM Plex Mono" font-size="15" letter-spacing="2" fill="{GRAPHITE}" opacity="0.8">{esc(subtitle)}</text>
</svg>'''


def path(d, stroke=GRAPHITE, width=3, fill="none", opacity=1, linecap="round", linejoin="round", dash=None):
    dash_attr = f' stroke-dasharray="{dash}"' if dash else ""
    return f'<path d="{d}" stroke="{stroke}" stroke-width="{width}" fill="{fill}" opacity="{opacity}" stroke-linecap="{linecap}" stroke-linejoin="{linejoin}"{dash_attr}/>'


def circle(cx, cy, r, stroke=GRAPHITE, width=2.5, fill="none", opacity=1):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" stroke="{stroke}" stroke-width="{width}" fill="{fill}" opacity="{opacity}"/>'


def line(x1, y1, x2, y2, stroke=GRAPHITE, width=2, opacity=1, dash=None):
    dash_attr = f' stroke-dasharray="{dash}"' if dash else ""
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{width}" opacity="{opacity}"{dash_attr}/>'


def rect(x, y, w, h, stroke=GRAPHITE, width=2.5, fill="none", opacity=1):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" stroke="{stroke}" stroke-width="{width}" fill="{fill}" opacity="{opacity}"/>'


def beat(cx, cy, r=6):
    """The single permitted magma 'live' accent, with a soft ring — used once per plate."""
    return f'''
    <circle cx="{cx}" cy="{cy}" r="{r+10}" fill="none" stroke="{MAGMA}" stroke-width="1" opacity="0.35"/>
    <circle cx="{cx}" cy="{cy}" r="{r}" fill="{MAGMA}"/>
    '''
