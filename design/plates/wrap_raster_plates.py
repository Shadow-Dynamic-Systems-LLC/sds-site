from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parents[2]
PUBLIC_ASSETS = ROOT / "public" / "assets"
SRC = ROOT / "assets"
FONTS = PUBLIC_ASSETS / "fonts"

W = H = 1024
M = 56
PAPER = (251, 250, 247)
PAPER_2 = (244, 242, 236)
INK = (20, 20, 20)
GRAPHITE = (66, 63, 57)
GRAPHITE_SOFT = (140, 134, 122)
HAIR = (217, 211, 199)


DISPLAY = ImageFont.truetype(str(FONTS / "SquadaOne.woff2"), 40)
MONO_15 = ImageFont.truetype(str(FONTS / "IBMPlexMono-400.woff2"), 15)
MONO_13 = ImageFont.truetype(str(FONTS / "IBMPlexMono-400.woff2"), 13)


PLATES = [
    {
        "source": SRC / "new-unprocessed" / "glyph-communication.png",
        "target": PUBLIC_ASSETS / "glyph-communication.webp",
        "fig": "FIG. 0x07",
        "series": "SIGNAL SPECIMENS",
        "title": "Communication Glyph",
        "subtitle": "MESSAGE SURFACE",
    },
    {
        "source": SRC / "new-unprocessed" / "glyph-globe-web.png",
        "target": PUBLIC_ASSETS / "globe-web.webp",
        "fig": "FIG. 0x08",
        "series": "NETWORK SPECIMENS",
        "title": "Network Globe",
        "subtitle": "GLOBAL ROUTING SURFACE",
    },
    {
        "source": SRC / "new-unprocessed" / "glyph-reason.png",
        "target": PUBLIC_ASSETS / "glyph-reason.webp",
        "fig": "FIG. 0x09",
        "series": "COGNITION SPECIMENS",
        "title": "Reasoning Head",
        "subtitle": "COGNITION WITHOUT AUTHORITY",
    },
    {
        "source": SRC / "new-unprocessed" / "glyph-recursion.png",
        "target": PUBLIC_ASSETS / "glyph-recursion.webp",
        "fig": "FIG. 0x0A",
        "series": "RECURSION SPECIMENS",
        "title": "Recursive Mark",
        "subtitle": "FEEDBACK UNDER BOUNDARY",
    },
    {
        "source": SRC / "new-unprocessed" / "glyph-spellbook.jpeg",
        "target": PUBLIC_ASSETS / "spellbook.webp",
        "fig": "FIG. 0x0B",
        "series": "PROTOCOL SPECIMENS",
        "title": "Protocol Codex",
        "subtitle": "RULES BEFORE EFFECTS",
    },
    {
        "source": SRC / "new-unprocessed" / "memory-mesh.jpeg",
        "target": PUBLIC_ASSETS / "memory-mesh-1.webp",
        "fig": "FIG. 0x0C",
        "series": "MEMORY SPECIMENS",
        "title": "Memory Mesh",
        "subtitle": "DISTRIBUTED CONTEXT FIELD",
    },
    {
        "source": SRC / "new-unprocessed" / "memory-mesh.jpeg",
        "target": PUBLIC_ASSETS / "memory-mesh-2-4x3.webp",
        "fig": "FIG. 0x0C",
        "series": "MEMORY SPECIMENS",
        "title": "Memory Mesh",
        "subtitle": "DISTRIBUTED CONTEXT FIELD",
    },
    {
        "source": SRC / "new-unprocessed" / "memory-mesh.jpeg",
        "target": PUBLIC_ASSETS / "memory-mesh-3-4x3.webp",
        "fig": "FIG. 0x0C",
        "series": "MEMORY SPECIMENS",
        "title": "Memory Mesh",
        "subtitle": "DISTRIBUTED CONTEXT FIELD",
    },
    {
        "source": SRC / "phoenix-standard-trans.png",
        "target": PUBLIC_ASSETS / "phoenix-logo.png",
        "fig": "FIG. 0x06",
        "series": "FIELD MARK",
        "title": "Phoenix Standard",
        "subtitle": "AUTHORITY, RECORDED",
    },
]


def draw_letterspaced(draw, xy, text, font, fill, tracking=3, anchor=None):
    x, y = xy
    if anchor == "ra":
        width = sum(draw.textlength(ch, font=font) + tracking for ch in text) - tracking
        x -= width
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking


def paper_background():
    img = Image.new("RGB", (W, H), PAPER)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for x in range(0, W, 4):
        for y in range(0, H, 4):
            if (x * 17 + y * 31) % 11 == 0:
                d.ellipse((x + 1, y + 1, x + 2, y + 2), fill=(*GRAPHITE_SOFT, 12))
    vignette = Image.new("L", (W, H), 0)
    vd = ImageDraw.Draw(vignette)
    vd.ellipse((-150, -110, W + 150, H + 190), fill=0)
    vignette = Image.eval(vignette.filter(ImageFilter.GaussianBlur(90)), lambda p: min(16, p // 8))
    shade = Image.new("RGBA", (W, H), (*GRAPHITE, 0))
    shade.putalpha(vignette)
    return Image.alpha_composite(img.convert("RGBA"), Image.alpha_composite(overlay, shade))


def draw_frame(img, fig, series, title, subtitle):
    d = ImageDraw.Draw(img)
    tick = 16
    d.rectangle((M, M, W - M, H - M), outline=HAIR, width=1)
    corners = [
        ((M, M + tick), (M, M), (M + tick, M)),
        ((W - M - tick, M), (W - M, M), (W - M, M + tick)),
        ((M, H - M - tick), (M, H - M), (M + tick, H - M)),
        ((W - M - tick, H - M), (W - M, H - M), (W - M, H - M - tick)),
    ]
    for a, b, c in corners:
        d.line((a, b, c), fill=INK, width=2)
    draw_letterspaced(d, (M + 22, M + 25), fig, MONO_15, GRAPHITE, tracking=3)
    draw_letterspaced(d, (W - M - 22, M + 25), series, MONO_15, GRAPHITE, tracking=3, anchor="ra")
    d.line((M + 22, M + 54, W - M - 22, M + 54), fill=HAIR, width=1)
    d.line((M + 22, H - M - 96, W - M - 22, H - M - 96), fill=HAIR, width=1)
    d.text((M + 24, H - M - 88), title, font=DISPLAY, fill=INK)
    draw_letterspaced(d, (M + 24, H - M - 44), subtitle, MONO_13, GRAPHITE, tracking=2)


def place_subject(canvas, source):
    src = Image.open(source).convert("RGBA")
    # Trim transparent assets, but keep illustrated paper edges on opaque rasters.
    if src.getchannel("A").getbbox():
        alpha_bbox = src.getchannel("A").getbbox()
        if alpha_bbox and alpha_bbox != (0, 0, src.width, src.height):
            src = src.crop(alpha_bbox)
    max_w, max_h = 760, 650
    src.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    x = (W - src.width) // 2
    y = 142 + (640 - src.height) // 2
    shadow = Image.new("RGBA", (src.width + 30, src.height + 30), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rectangle((15, 15, src.width + 15, src.height + 15), fill=(20, 20, 20, 22))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    canvas.alpha_composite(shadow, (x - 15, y - 8))
    canvas.alpha_composite(src, (x, y))


def build_plate(plate):
    canvas = paper_background()
    draw_frame(canvas, plate["fig"], plate["series"], plate["title"], plate["subtitle"])
    place_subject(canvas, plate["source"])
    target = plate["target"]
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.suffix.lower() == ".webp":
        canvas.convert("RGB").save(target, "WEBP", quality=88, method=6)
    else:
        canvas.save(target)
    print("wrote", target.relative_to(ROOT))


if __name__ == "__main__":
    for plate in PLATES:
        build_plate(plate)
