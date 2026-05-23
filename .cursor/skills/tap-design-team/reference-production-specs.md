# Referencia — Especificaciones de producción (Tap-Design-Team)

**Línea visual:** siempre [reference-tap-visual-line.md](reference-tap-visual-line.md). Estas specs son de **formato y export**; no autorizan cambios de estilo.

## Dimensiones por canal (px, @1x)

### Redes sociales

| Pieza | Dimensiones | Ratio | Notas |
|-------|-------------|-------|-------|
| IG/FB post cuadrado | 1080 × 1080 | 1:1 | Safe 80px lateral |
| IG portrait | 1080 × 1350 | 4:5 | Mejor reach orgánico IG |
| Story / Reels cover | 1080 × 1920 | 9:16 | Safe top 250px, bottom 350px (UI) |
| LinkedIn post | 1200 × 627 | ~1.91:1 | Texto fuera de bordes |
| LinkedIn carousel | 1080 × 1080 | 1:1 | Consistencia slide a slide |
| X/Twitter post | 1600 × 900 | 16:9 | Texto grande |
| YouTube thumbnail | 1280 × 720 | 16:9 | Overlay blanco/oro Tap |

### Web

| Pieza | Dimensiones | Notas |
|-------|-------------|-------|
| Hero desktop | 1920 × 1080 o 2400 × 1200 | Espacio izq 45% para copy; webp q80–85 |
| Hero mobile | 750 × 1334 crop | Objeto 3D centrado o parte inferior |
| OG / social share | 1200 × 630 | Línea Tap obligatoria |
| Blog hero | 1600 × 900 | Peso < 200KB ideal |

## Naming Tap

```
tap-[pieza]-[objeto-metáfora]-[ratio]-v[N].webp
```

Ejemplo: `tap-hero-dial-knurled-16x9-v1.webp`

## Tipografía en layouts con texto

| Rol | Color | Peso |
|-----|-------|------|
| Headline | `#FFFFFF` | Bold |
| Label caps | `#C9A227` | Medium, small caps |
| Body | `#B8A88A` | Regular |
| Separador | línea 1px `#D4AF37` | — |

## Handoff desarrollo

Variables CSS sugeridas alineadas a línea Tap:

```css
--tap-bg: #0B0B0E;
--tap-gold: #D4AF37;
--tap-gold-muted: #B8A88A;
--tap-amber-glow: #E8B84A;
--tap-text: #FFFFFF;
```
