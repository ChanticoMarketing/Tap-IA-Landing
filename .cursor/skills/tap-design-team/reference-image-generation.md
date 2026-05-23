# Referencia — Generación de imágenes (Tap-Design-Team)

**Precondición:** leer [reference-tap-visual-line.md](reference-tap-visual-line.md). Sin el bloque Tap al final del prompt, el asset es **inválido**.

## Referencias adjuntas a GenerateImage

Cuando uses `GenerateImage`, incluir si es posible:

```json
"reference_image_paths": [
  "public/images/brand-reference/tap-luxury-tech-objects-grid.png",
  "public/images/brand-reference/tap-luxury-tech-hero-layout.png"
]
```

## Plantilla de prompt Tap (obligatoria)

```text
[SUBJECT]: [objeto 3D del universo instrument panel — variar respecto a pieza anterior]
[COMPOSITION]: [macro / panel modular / hero layout texto izq espacio der / etc.]
[STYLE]: photorealistic 3D product render, luxury executive control room hardware
[LIGHTING]: dramatic low-key, key light upper right 45°, golden rim light, soft amber glow on active indicators
[COLOR]: deep matte black #0B0B0E, polished gold #D4AF37, brushed brass, amber data glow #E8B84A only
[MOOD]: precise, authoritative, premium, tactile
[FORMAT]: [ratio del canal], [negative space para copy si aplica]
[QUALITY]: ultra sharp focus on hero object, shallow depth of field, no watermark
[AVOID]: blue neon, purple, flat UI, cartoon, stock people, AI brain, rockets, bright colors outside black-gold, readable text in image, generic tech clipart
[TAP-LINE-BLOCK]: Tap-IA luxury tech instrument panel aesthetic, photorealistic 3D product render, deep matte black background #0B0B0E, polished gold #D4AF37 and brushed brass accents, knurled metal textures, thin gold inlaid lines, warm amber glow on data indicators, dramatic low-key lighting from upper right, rim light on gold edges, shallow depth of field, premium executive control room, no blue neon, no purple, no flat illustration, no cartoon, no stock photo people, no generic AI brain, no bright saturated colors outside black and gold palette
```

## Ejemplos por pieza (variar objeto cada vez)

**Macro brújula (estrategia)**

```text
[SUBJECT]: luxury gold compass with multi-point rose on black instrument face, fine degree markings, polished gold housing
[COMPOSITION]: macro close-up, shallow DOF, object lower left, dark void upper right for headline overlay
...
[TAP-LINE-BLOCK]: (bloque completo)
```

**Dial optimización**

```text
[SUBJECT]: precision knurled gold control dial on matte black panel, brushed dark metal top, golden circular scale with tick marks
[COMPOSITION]: top-down 3/4 angle, single hero dial
...
```

**Lupa + datos (análisis)**

```text
[SUBJECT]: gold-framed magnifying glass over glowing amber bar chart and line graph recessed in black panel
[COMPOSITION]: magnifier as hero, data visible through lens, horizontal gold slot details on panel
...
```

**Palanca ejecución**

```text
[SUBJECT]: polished gold T-shaped lever in recessed track, vertical row of glowing amber rectangular level indicators
[COMPOSITION]: module with thin gold border frame, cinematic macro
...
```

**Hero panel completo (layout referencia)**

```text
[SUBJECT]: modular black control panel with four gold instruments (compass, magnifier on chart, knurled dial, T-lever), perspective 3/4, gold trim recesses
[COMPOSITION]: panel on right 55% of frame, large clean black negative space on left 45% for typography overlay (do not render text in image)
[FORMAT]: 16:9
...
```

## Iteración

| Ronda | Cambiar |
|-------|---------|
| 1 | Objeto o encuadre |
| 2 | Iluminación o ángulo (no paleta) |
| 3 | Narrativa del módulo (datos vs escala vs indicadores) |

**Nunca** iterar repitiendo el mismo prompt. **Nunca** relajar el bloque Tap.

## Texto

- Copy en **overlay** post-generación (Figma/código).
- Imagen = `base-notext` siempre que haya titular/CTA.

## Anti-repetición en prompts

Antes de generar, el Director anota el prompt anterior. El nuevo prompt debe diferir en **SUBJECT** y al menos un campo más entre COMPOSITION, FORMAT, [narrativa implícita].
