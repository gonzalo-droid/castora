#!/usr/bin/env python3
"""Contraste WCAG entre dos colores.

Uso:
  contraste.py "#6f6359" "#f1e8dc"            -> ratio y si pasa AA
  contraste.py "#f8f3ea" "#8f5e36" --alpha 0.8 -> primer color con opacidad sobre el segundo
"""
import argparse


def rgb(h: str):
    h = h.lstrip("#")
    return [int(h[i : i + 2], 16) for i in (0, 2, 4)]


def luminance(c):
    def ch(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4

    r, g, b = (ch(v) for v in c)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def main():
    p = argparse.ArgumentParser()
    p.add_argument("fg")
    p.add_argument("bg")
    p.add_argument("--alpha", type=float, default=1.0, help="opacidad del primer color (ej. 0.8 para /80)")
    a = p.parse_args()

    fg, bg = rgb(a.fg), rgb(a.bg)
    fg = [round(f * a.alpha + b * (1 - a.alpha)) for f, b in zip(fg, bg)]
    l1, l2 = sorted([luminance(fg), luminance(bg)], reverse=True)
    ratio = (l1 + 0.05) / (l2 + 0.05)

    ok = lambda x: "pasa" if x else "NO pasa"
    print(f"{ratio:.2f}:1")
    print(f"  texto normal (4.5): {ok(ratio >= 4.5)}")
    print(f"  texto grande / bordes de controles (3.0): {ok(ratio >= 3)}")


if __name__ == "__main__":
    main()
