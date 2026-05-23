# Línea gráfica Tap — Luxury Tech / Premium Instrument Panel

**Documento normativo.** Toda pieza del Tap-Design-Team debe cumplirlo **sin excepción**. La creatividad opera **solo** dentro de los ejes de variación permitidos al final; lo demás es **inmutable**.

## Referencias canónicas (obligatorio leer antes de producir)

| Archivo | Contenido |
|---------|-----------|
| `public/images/brand-reference/tap-luxury-tech-objects-grid.png` | Macro 4 objetos: brújula, dial, lupa+datos, palanca+indicadores |
| `public/images/brand-reference/tap-luxury-tech-hero-layout.png` | Layout hero: texto izquierda + panel 3D derecha, logo TAP-IA |

El Director **debe** abrir/verificar estas imágenes en cada encargo con assets visuales.

---

## ADN visual (inmutable — cero desviación)

### Universo

**“Sala de control ejecutiva premium”** — instrumentos físicos de precisión (no UI flat, no ilustración cartoon, no stock tech genérico). Cada pieza parece **hardware de lujo** fotografiado o render 3D fotorrealista.

### Paleta exclusiva

| Rol | Valor | Uso |
|-----|-------|-----|
| Fondo | `#000000` – `#0B0B0E` (negro carbón mate) | Superficies, paneles, entorno |
| Oro pulido | `#D4AF37` – `#C9A227` | Bordes, objetos protagonistas, highlights |
| Oro satinado / latón cepillado | `#B8965A` – `#8B7355` | Planos secundarios metálicos |
| Glow datos / UI | `#E8B84A` – `#FFB020` (ámbar cálido) | Gráficos, indicadores, notches activos |
| Texto principal | `#FFFFFF` | Headlines, máximo impacto |
| Texto secundario | `#C9A227` / `#B8A88A` (gold muted) | Labels, cuerpo, caps |

**Prohibido:** azules/cyan neón, morados, verdes saturados, gradientes rainbow, modo claro como fondo dominante, colores pastel, estética “startup colorida”.

### Materiales (siempre presentes)

- Oro **pulido** (specular alto) en bordes y objetos hero.
- Metal **cepillado** oscuro en caras superiores de diales/controles.
- **Knurling** (estría diamantada) en agarres cilíndricos.
- Paneles **negro mate** con micro-grano sutil.
- **Cristal** con reflejo en lentes (lupa).
- Líneas **inlaid** doradas finas (escalas, rejillas, circuit decorativo).

### Iluminación (inmutable)

- **Low-key** dramático; fondo casi negro.
- Luz principal **superior-derecha** (45° aprox.).
- **Rim light** dorado en bordes metálicos.
- Glow **interno ámbar** en datos/indicadores activos (no bloom excesivo).
- **Profundidad de campo** shallow en macros; panel completo puede tener más profundidad pero sujeto nítido.

### Línea y UI gráfica

- Trazos **ultra finos** dorados (escalas, bordes de módulos, separadores).
- Gráficos de datos: **líneas y barras** doradas luminosas sobre negro (estilo HUD discreto).
- Indicadores: rectángulos/notches **ámbar** en filas verticales u horizontales.
- Sin iconografía flat tipo Material/iOS.

### Tipografía (layout con texto)

- Sans geométrica moderna (Inter, Montserrat, Sohne o equivalente del proyecto).
- **Headline:** bold, blanco, grande, alineación izquierda.
- **Labels:** small caps, oro muted.
- **Cuerpo:** oro/tan, peso regular.
- Separadores: **línea horizontal dorada fina** entre bloques.
- Logo TAP-IA: icono pirámide/triángulo metálico + wordmark blanco (cuando aplique).

### Composición tipo layout

- **Asimétrico:** bloque tipográfico **izquierda** (40–45% ancho); visual 3D **derecha**.
- Panel de control en **perspectiva suave** (no frontal plano).
- **Espacio negativo** generoso; densidad baja; cada elemento intencional.

### Metáforas permitidas (objetos 3D)

Objetos del universo “instrumento de precisión”:

| Objeto | Significado típico |
|--------|-------------------|
| Brújula | Estrategia, dirección, norte |
| Dial / perilla knurled | Optimización, ajuste fino |
| Lupa sobre gráfico | Análisis, auditoría, insight |
| Palanca / throttle T | Ejecución, activación, decisión |
| Interruptores / notches | Estado, niveles, progreso |
| Rejilla / slots horizontales | Módulos, flujo, infraestructura |

**Prohibido como protagonista:** cohetes, cerebros IA, robots humanoides, personas stock, globos terráqueos cliché, engranajes genéricos flat.

---

## Ejes de variación creativa (obligatorio cambiar en cada pieza)

Para **no repetir** el mismo diseño, cada entrega debe documentar variación en **≥3 de 5** ejes:

| Eje | Ejemplos de variación |
|-----|----------------------|
| **1. Objeto protagonista** | brújula → dial → lupa → palanca → módulo nuevo del mismo universo |
| **2. Encuadre** | macro 1 objeto / panel 2×2 / hero panel completo / detalle knurling |
| **3. Narrativa** | estrategia / datos / ejecución / control / crecimiento medido |
| **4. Composición** | texto izq+visual der / visual centrado simétrico excepcional / solo objeto (social) |
| **5. Dato visual** | barras / línea / notches / escala circular / grid sutil |

**Registro anti-repetición:** el Director compara con las **2 últimas piezas** del hilo o rutas indicadas por el usuario; si el mismo eje coincide 2 veces seguidas, **rechazar** y pedir nuevo eje al subagente Marca.

---

## Checklist binario (Director — cada ítem PASS/FAIL)

1. [ ] Solo paleta negro + oro/ámbar + blanco texto
2. [ ] Materiales metálicos táctiles creíbles (no plástico mate genérico)
3. [ ] Iluminación low-key con rim dorado
4. [ ] Sin colores fuera de paleta
5. [ ] Sin estilo flat/vector/cartoon
6. [ ] Sin clichés tech prohibidos
7. [ ] Líneas doradas finas donde hay UI/gráficos
8. [ ] Jerarquía tipográfica blanco/oro si hay texto
9. [ ] Sensación “premium instrument panel”
10. [ ] ≥3 ejes de variación documentados vs piezas anteriores
11. [ ] No es duplicado compositivo de referencias (mismo encuadre sin cambio narrativo)

**Umbral de entrega:** 11/11 PASS. Con cualquier FAIL → **no entregar**; iterar.

---

## Prompt base Tap (bloque obligatorio en GenerateImage)

Añadir siempre al final del prompt:

```text
Tap-IA luxury tech instrument panel aesthetic, photorealistic 3D product render, deep matte black background #0B0B0E, polished gold #D4AF37 and brushed brass accents, knurled metal textures, thin gold inlaid lines, warm amber glow on data indicators, dramatic low-key lighting from upper right, rim light on gold edges, shallow depth of field, premium executive control room, no blue neon, no purple, no flat illustration, no cartoon, no stock photo people, no generic AI brain, no bright saturated colors outside black and gold palette
```

---

## Do / Don't global

### Do

- Macro con craftsmanship visible (tornillos, escala, knurling).
- HUD de datos **mínimo** y elegante.
- Panel modular con bordes dorados finos.
- Dejar zonas para overlay de copy en layout hero.

### Don't

- Desviar paleta “un poco” (no negociable).
- Repetir misma composición 4-panel o mismo objeto sin cambio de eje.
- Texto largo generado dentro de la imagen IA.
- Mezclar estilos (foto lifestyle + panel 3D stock).
- Simplificar a iconos planos dorados sobre negro (eso no es la línea).
