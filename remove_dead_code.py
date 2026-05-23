"""
Fix #1 v3: Limpieza quirúrgica del estado actual del archivo.
Estado actual (verificado):
  L668: (spaces only)
  L669: (empty)
  L670: // Parallax en los Halos de Luz de fondo (Orbs radiales)
  L671:         });
  L672:     });
  L673: }
  L674: (empty)
  L675: // Entrada de tarjetas...

Necesitamos eliminar L668-L674 (índices 667-673) 
y restaurar un solo salto de línea de separación.
"""
path = r'src\pages\index.astro'

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total líneas antes: {len(lines)}")

# Mostrar el área problemática
for i in range(664, 680):
    print(f"  L{i+1}: {repr(lines[i])}")

# Identificar rangos exactos
# Buscamos la línea del comentario "// Parallax"
comment_idx = None
end_idx = None

for i, line in enumerate(lines):
    if '// Parallax en los Halos' in line and comment_idx is None:
        comment_idx = i

if comment_idx is None:
    print("ERROR: No se encontró el comentario // Parallax")
    exit(1)

print(f"\nComentario encontrado en L{comment_idx+1}")

# Buscar el fin del bloque: línea con solo '}' más una línea vacía
i = comment_idx
while i < len(lines):
    stripped = lines[i].strip()
    if stripped == '}' and i > comment_idx:
        end_idx = i
        break
    i += 1

if end_idx is None:
    print("ERROR: No se encontró el cierre del bloque")
    exit(1)

print(f"Cierre encontrado en L{end_idx+1}: {repr(lines[end_idx])}")

# Retroceder para incluir líneas vacías antes del comentario
actual_start = comment_idx
while actual_start > 0 and lines[actual_start-1].strip() == '':
    actual_start -= 1

print(f"\nEliminando L{actual_start+1} a L{end_idx+1}")
for j in range(actual_start, end_idx+1):
    print(f"  L{j+1}: {repr(lines[j])}")

# Reconstruir: antes del bloque + una línea vacía de separación + después del bloque
lines_new = lines[:actual_start] + ['\n'] + lines[end_idx+1:]

print(f"\nTotal líneas después: {len(lines_new)}")
print(f"Área resultante:")
for j in range(max(0, actual_start-2), min(len(lines_new), actual_start+4)):
    print(f"  L{j+1}: {repr(lines_new[j])}")

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(lines_new)

print("\n¡Hecho! Dead code eliminado correctamente.")
