import math
import os
from plate_common import (
    W, H, M, GRAPHITE, GRAPHITE_SOFT, INK, HAIR, BRASS, RUST, MAGMA, PAPER,
    frame_open, frame_close, path, circle, line, rect, beat,
)

CX, CY = W / 2, 512  # visual center of the content band

OUT_DIR = os.path.dirname(os.path.abspath(__file__))


def arc_path(cx, cy, r, a0, a1):
    x0, y0 = cx + r * math.cos(a0), cy + r * math.sin(a0)
    x1, y1 = cx + r * math.cos(a1), cy + r * math.sin(a1)
    large = 1 if abs(a1 - a0) > math.pi else 0
    sweep = 1 if a1 > a0 else 0
    return f"M {x0:.1f} {y0:.1f} A {r:.1f} {r:.1f} 0 {large} {sweep} {x1:.1f} {y1:.1f}"


# ---------------------------------------------------------------- ASSEMBLY HALL
def assembly_hall():
    parts = []
    cx, cy = CX, 760  # focal point low in the frame, tiers rise above it
    tiers = [(300, 118), (255, 108), (210, 100), (165, 94), (120, 90)]
    a0, a1 = math.radians(200), math.radians(340)
    for r, _ in tiers:
        parts.append(path(arc_path(cx, cy, r, a0, a1), stroke=GRAPHITE, width=2.2, opacity=0.85))
    # radiating aisle spokes
    for deg in range(200, 341, 20):
        a = math.radians(deg)
        x0, y0 = cx + 95 * math.cos(a), cy + 95 * math.sin(a)
        x1, y1 = cx + 305 * math.cos(a), cy + 305 * math.sin(a)
        parts.append(line(x0, y0, x1, y1, stroke=GRAPHITE, width=1.1, opacity=0.4))
    # crosshatched "shell" behind the tiers, upper vault
    parts.append(f'<path d="{arc_path(cx, cy, 340, math.radians(198), math.radians(342))} '
                 f'L {cx + 340*math.cos(math.radians(342)):.1f} {cy + 340*math.sin(math.radians(342))-40:.1f} '
                 f'L {cx + 340*math.cos(math.radians(198)):.1f} {cy + 340*math.sin(math.radians(198))-40:.1f} Z" '
                 f'fill="url(#hatchFine)" stroke="none" opacity="0.5"/>')
    # convergence podium
    parts.append(rect(cx - 30, cy - 6, 60, 20, stroke=GRAPHITE, width=2.5, fill=PAPER))
    parts.append(beat(cx, cy - 4, r=5))
    # two flanking pillars
    for sign in (-1, 1):
        px = cx + sign * 330
        parts.append(line(px, cy - 310, px, cy + 6, stroke=GRAPHITE, width=3))
        parts.append(line(px - 18, cy + 6, px + 18, cy + 6, stroke=GRAPHITE, width=3))
    return "\n".join(parts)


# ------------------------------------------------------------- MONOLITH TERMINAL
def monolith_terminal():
    parts = []
    base_y = 830
    top_y = 190
    bw, tw = 240, 170  # base half-width*2 effectively via left/right below
    left_bx, right_bx = CX - 150, CX + 150
    left_tx, right_tx = CX - 95, CX + 95
    body = (f"M {left_bx} {base_y} L {left_tx} {top_y} L {right_tx} {top_y} "
            f"L {right_bx} {base_y} Z")
    parts.append(f'<path d="{body}" fill="url(#hatch45)" stroke="{GRAPHITE}" stroke-width="3"/>')
    # plinth
    parts.append(rect(left_bx - 40, base_y, (right_bx - left_bx) + 80, 26, stroke=GRAPHITE, width=3, fill=PAPER))
    # screen slit
    slit_x0, slit_x1 = CX - 34, CX + 34
    slit_y0, slit_y1 = top_y + 70, base_y - 90
    parts.append(rect(slit_x0, slit_y0, slit_x1 - slit_x0, slit_y1 - slit_y0, stroke=GRAPHITE, width=2.5, fill=PAPER))
    # scan lines within slit
    y = slit_y0 + 18
    while y < slit_y1 - 10:
        parts.append(line(slit_x0 + 8, y, slit_x1 - 8, y, stroke=GRAPHITE_SOFT, width=1, opacity=0.5))
        y += 16
    # cursor beat, blinking mid-slit
    parts.append(beat(CX, (slit_y0 + slit_y1) / 2, r=5))
    # base shadow hatch
    parts.append(f'<rect x="{left_bx-40}" y="{base_y+26}" width="{(right_bx-left_bx)+80}" height="14" '
                 f'fill="url(#hatchFine)" opacity="0.6"/>')
    return "\n".join(parts)


# ----------------------------------------------------------- INDUSTRIAL INTEGRITY
def industrial_integrity():
    parts = []
    panel_w, panel_h = 360, 480
    gap = 40
    left_x = CX - panel_w - gap / 2
    right_x = CX + gap / 2
    top_y = 200
    for x in (left_x, right_x):
        parts.append(rect(x, top_y, panel_w, panel_h, stroke=GRAPHITE, width=2, fill="none", opacity=0.9))
    # left: fractured pane
    fcx, fcy = left_x + panel_w / 2, top_y + panel_h / 2
    parts.append(rect(left_x + 30, top_y + 30, panel_w - 60, panel_h - 60, stroke=GRAPHITE, width=2, fill="url(#hatchFine)", opacity=0.9))
    cracks = [
        (fcx, fcy, fcx - 90, fcy - 140), (fcx, fcy, fcx + 70, fcy - 160),
        (fcx, fcy, fcx - 60, fcy + 150), (fcx, fcy, fcx + 100, fcy + 120),
        (fcx, fcy, fcx - 150, fcy + 10), (fcx, fcy, fcx + 150, fcy - 10),
    ]
    for x0, y0, x1, y1 in cracks:
        parts.append(line(x0, y0, x1, y1, stroke=GRAPHITE, width=2.2))
    parts.append(circle(fcx, fcy, 10, stroke=GRAPHITE, width=2, fill=PAPER))
    # right: triangulated truss lattice
    rcx = right_x + panel_w / 2
    rows = 4
    rh = (panel_h - 60) / rows
    nodes = []
    for i in range(rows + 1):
        y = top_y + 30 + i * rh
        offset = (panel_w - 60) / 2 * (i % 2)
        nodes.append((right_x + 30, y))
        nodes.append((right_x + panel_w - 30, y))
    for i in range(rows):
        y0 = top_y + 30 + i * rh
        y1 = y0 + rh
        xl, xr = right_x + 30, right_x + panel_w - 30
        parts.append(line(xl, y0, xr, y1, stroke=GRAPHITE, width=2.2))
        parts.append(line(xr, y0, xl, y1, stroke=GRAPHITE, width=2.2))
        parts.append(line(xl, y0, xl, y1, stroke=GRAPHITE, width=2.2))
        parts.append(line(xr, y0, xr, y1, stroke=GRAPHITE, width=2.2))
    # central node beat marking the redirected-stress joint
    parts.append(beat(rcx, top_y + 30 + rh * 2, r=6))
    # vs mark between panels
    parts.append(f'<text x="{CX}" y="{top_y + panel_h/2 + 8}" font-family="IBM Plex Mono" '
                 f'font-size="15" fill="{GRAPHITE}" text-anchor="middle" opacity="0.6">/</text>')
    return "\n".join(parts)


# ------------------------------------------------------------------ ARCHIVE / LEDGER
def filing_cabinet():
    parts = []
    cab_w, cab_h = 420, 560
    x0, y0 = CX - cab_w / 2, 220
    parts.append(rect(x0, y0, cab_w, cab_h, stroke=GRAPHITE, width=3, fill=PAPER))
    rows, cols = 5, 3
    drawer_w = cab_w / cols
    drawer_h = cab_h / rows
    flagged = (2, 1)  # (row, col) drawer that carries the single magma tab
    for r in range(rows):
        for c in range(cols):
            dx, dy = x0 + c * drawer_w, y0 + r * drawer_h
            parts.append(rect(dx + 6, dy + 6, drawer_w - 12, drawer_h - 12, stroke=GRAPHITE, width=1.6, fill="none", opacity=0.85))
            # pull handle
            hx = dx + drawer_w / 2
            hy = dy + drawer_h / 2
            parts.append(line(hx - 16, hy, hx + 16, hy, stroke=GRAPHITE, width=3))
            # label tab
            parts.append(rect(dx + drawer_w/2 - 20, dy + 10, 40, 10, stroke=GRAPHITE, width=1, fill="none", opacity=0.6))
            if (r, c) == flagged:
                parts.append(beat(dx + drawer_w - 16, dy + 16, r=5))
    # base plinth + subtle hatch shadow beneath
    parts.append(rect(x0 - 16, y0 + cab_h, cab_w + 32, 22, stroke=GRAPHITE, width=2.5, fill=PAPER))
    parts.append(f'<rect x="{x0-16}" y="{y0+cab_h+22}" width="{cab_w+32}" height="12" fill="url(#hatchFine)" opacity="0.55"/>')
    return "\n".join(parts)


# --------------------------------------------------------------- NEUTRAL ORCHESTRATION
def neutral_orchestration():
    parts = []
    cx, cy = CX, 512
    rings = [300, 230, 160]
    for r in rings:
        parts.append(circle(cx, cy, r, stroke=GRAPHITE, width=1.6, opacity=0.7))
    # tick marks around outer ring, compass-rose style
    for deg in range(0, 360, 15):
        a = math.radians(deg)
        r0 = 300
        r1 = 300 + (16 if deg % 90 == 0 else 8)
        x0, y0 = cx + r0 * math.cos(a), cy + r0 * math.sin(a)
        x1, y1 = cx + r1 * math.cos(a), cy + r1 * math.sin(a)
        parts.append(line(x0, y0, x1, y1, stroke=GRAPHITE, width=1.4))
    # radiating spokes at the four cardinal + four ordinal points
    for deg in range(0, 360, 45):
        a = math.radians(deg)
        x1, y1 = cx + 300 * math.cos(a), cy + 300 * math.sin(a)
        parts.append(line(cx, cy, x1, y1, stroke=GRAPHITE, width=1, opacity=0.35))
    # orbit dots at a few ring/spoke intersections
    for deg in (30, 150, 210, 330):
        a = math.radians(deg)
        for r in (230, 160):
            x, y = cx + r * math.cos(a), cy + r * math.sin(a)
            parts.append(circle(x, y, 4, stroke=GRAPHITE, width=1.4, fill=PAPER))
    # neutral fulcrum at center
    parts.append(circle(cx, cy, 26, stroke=GRAPHITE, width=2.5, fill=PAPER))
    parts.append(beat(cx, cy, r=6))
    return "\n".join(parts)


# --------------------------------------------------------------------- FIELD MARK / SEAL
def field_seal():
    parts = []
    cx, top_y, bottom_y = CX, 168, 800
    hw = 240  # shield half-width
    shield = (f"M {cx-hw} {top_y} L {cx+hw} {top_y} L {cx+hw} {top_y+320} "
              f"Q {cx+hw} {bottom_y-40} {cx} {bottom_y} "
              f"Q {cx-hw} {bottom_y-40} {cx-hw} {top_y+320} Z")
    parts.append(f'<path d="{shield}" stroke="{GRAPHITE}" stroke-width="3" fill="none"/>')
    parts.append(f'<path d="{shield}" stroke="none" fill="url(#hatchFine)" opacity="0.3"/>')
    # inner hairline shield
    hw2 = hw - 26
    shield2 = (f"M {cx-hw2} {top_y+22} L {cx+hw2} {top_y+22} L {cx+hw2} {top_y+320-14} "
               f"Q {cx+hw2} {bottom_y-58} {cx} {bottom_y-24} "
               f"Q {cx-hw2} {bottom_y-58} {cx-hw2} {top_y+320-14} Z")
    parts.append(f'<path d="{shield2}" stroke="{GRAPHITE}" stroke-width="1.2" fill="none" opacity="0.6"/>')

    # --- eagle, built as overlapping feather rows fanning from a shoulder joint ---
    bcy = top_y + 250  # shoulder line
    # wings: 4 overlapping rows per side, each row a curved feather bank, growing
    # outward and slightly downward — a heraldic "displayed" wing.
    for sign in (-1, 1):
        rows = 4
        for i in range(rows):
            span = 70 + i * 44
            rise = 30 + i * 4
            drop = 10 + i * 30
            shoulder_x, shoulder_y = cx + sign * 10, bcy - 30 + i * 6
            tip_x, tip_y = cx + sign * span, bcy - rise
            under_x, under_y = cx + sign * (span - 22), bcy + drop
            ctrl_x, ctrl_y = cx + sign * (span * 0.55), bcy - rise * 0.7
            d = (f"M {shoulder_x:.0f} {shoulder_y:.0f} "
                 f"Q {ctrl_x:.0f} {ctrl_y:.0f} {tip_x:.0f} {tip_y:.0f} "
                 f"L {under_x:.0f} {under_y:.0f} "
                 f"Q {(shoulder_x+under_x)/2:.0f} {(shoulder_y+under_y)/2+8:.0f} {shoulder_x:.0f} {shoulder_y:.0f} Z")
            opacity = 0.95 - i * 0.06
            parts.append(f'<path d="{d}" stroke="{GRAPHITE}" stroke-width="1.6" fill="{PAPER}" opacity="{opacity}"/>')
            # feather spine
            parts.append(line(shoulder_x, shoulder_y, tip_x, tip_y, stroke=GRAPHITE, width=0.9, opacity=0.5))

    # body: a full teardrop breast, wider and more present than the wings' root
    parts.append(f'<path d="M {cx} {bcy-56} '
                 f'Q {cx+30} {bcy-30} {cx+26} {bcy+40} '
                 f'Q {cx+18} {bcy+96} {cx} {bcy+116} '
                 f'Q {cx-18} {bcy+96} {cx-26} {bcy+40} '
                 f'Q {cx-30} {bcy-30} {cx} {bcy-56} Z" '
                 f'stroke="{GRAPHITE}" stroke-width="2.6" fill="{PAPER}"/>')
    # breast plumage — a few short curved strokes, not a solid fill
    for i in range(3):
        yy = bcy + 10 + i * 26
        ww = 20 - i * 3
        parts.append(f'<path d="M {cx-ww} {yy} Q {cx} {yy+10} {cx+ww} {yy}" stroke="{GRAPHITE}" '
                     f'stroke-width="1.1" fill="none" opacity="0.5"/>')
    # tail, fanning below the body
    for i, dx in enumerate((-26, -9, 9, 26)):
        parts.append(path(f"M {cx} {bcy+108} L {cx+dx} {bcy+168+abs(dx)*0.6:.0f}", stroke=GRAPHITE, width=1.6, opacity=0.85))

    # head + hooked beak + brow, set proud above the shoulders
    hcy = bcy - 78
    parts.append(circle(cx, hcy, 20, stroke=GRAPHITE, width=2.4, fill=PAPER))
    parts.append(path(f"M {cx+17} {hcy-4} L {cx+38} {hcy+2} L {cx+17} {hcy+10} L {cx+22} {hcy+2} Z",
                       stroke=GRAPHITE, width=1.6, fill=GRAPHITE))
    parts.append(path(f"M {cx+4} {hcy-14} Q {cx+16} {hcy-20} {cx+22} {hcy-10}", stroke=GRAPHITE, width=1.4))
    # single ember accent at the breast — the one live mark
    parts.append(beat(cx, bcy + 28, r=7))
    # banner beneath
    by = bottom_y - 6
    parts.append(line(cx - 150, by, cx + 150, by, stroke=GRAPHITE, width=1.4))
    return "\n".join(parts)


PLATES = [
    dict(
        key="assembly-hall",
        fig_no="FIG. 0x01",
        series="CONVERGENT STRUCTURES",
        title="Assembly Hall",
        subtitle="COMMON FORM UNDER SHARED VOCABULARY",
        notation="SDS.ASSEMBLY",
        builder=assembly_hall,
    ),
    dict(
        key="monolith-terminal",
        fig_no="FIG. 0x02",
        series="INTERFACE SPECIMENS",
        title="Monolith Terminal",
        subtitle="THE THRESHOLD AWAITING INPUT",
        notation="SDS.TERMINAL",
        builder=monolith_terminal,
    ),
    dict(
        key="industrial-integrity",
        fig_no="FIG. 0x03",
        series="STRUCTURAL INTEGRITY",
        title="Fracture & Lattice",
        subtitle="SINGLE VECTOR VS. REDIRECTED STRESS",
        notation="SDS.INTEGRITY",
        builder=industrial_integrity,
    ),
    dict(
        key="filing-cabinet",
        fig_no="FIG. 0x04",
        series="ARCHIVAL SPECIMENS",
        title="The Ledger",
        subtitle="A RECORD IS NOT A DECISION",
        notation="SDS.LEDGER",
        builder=filing_cabinet,
    ),
    dict(
        key="neutral-orchestration",
        fig_no="FIG. 0x05",
        series="INSTRUMENT SPECIMENS",
        title="The Compass",
        subtitle="NEUTRAL BY CONSTRUCTION",
        notation="SDS.COMPASS",
        builder=neutral_orchestration,
    ),
    dict(
        key="phoenix-logo",
        fig_no="FIG. 0x06",
        series="FIELD MARK",
        title="Attestation Seal",
        subtitle="AUTHORITY, RECORDED",
        notation="SDS.FIELDMARK",
        builder=field_seal,
    ),
]


def build(plate):
    svg = frame_open(plate["fig_no"], plate["series"])
    svg += plate["builder"]()
    svg += frame_close(plate["title"], plate["subtitle"], plate["notation"])
    out_path = os.path.join(OUT_DIR, f'{plate["key"]}.svg')
    with open(out_path, "w") as f:
        f.write(svg)
    return out_path


if __name__ == "__main__":
    for p in PLATES:
        path_out = build(p)
        print("wrote", path_out)
