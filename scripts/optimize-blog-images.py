import os
from PIL import Image

def optimize_images():
    blog_dir = 'public/images/blog'
    files = os.listdir(blog_dir)
    
    for file in files:
        if file.endswith('.png'):
            png_path = os.path.join(blog_dir, file)
            webp_name = file.rsplit('.', 1)[0] + '.webp'
            webp_path = os.path.join(blog_dir, webp_name)
            
            print(f"Convertiendo {file} a WebP...")
            try:
                with Image.open(png_path) as img:
                    img.save(webp_path, 'WEBP', quality=85)
                
                original_size = os.path.getsize(png_path)
                new_size = os.path.getsize(webp_path)
                reduction = (1 - (new_size / original_size)) * 100
                print(f"✓ Guardado: {webp_name} | {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({reduction:.1f}% reducción)")
                
            except Exception as e:
                print(f"✗ Error al convertir {file}: {e}")

if __name__ == "__main__":
    optimize_images()
