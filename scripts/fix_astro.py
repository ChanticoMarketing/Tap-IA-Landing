import re

def fix_astro_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split frontmatter from template
    parts = content.split('---')
    if len(parts) >= 3:
        frontmatter = parts[1]
        # rejoin the rest in case there are other '---' in the file (unlikely but safe)
        template = '---'.join(parts[2:])
    else:
        frontmatter = ''
        template = content

    # 1. Replace React JSX comments {/* ... */} with HTML comments <!-- ... -->
    template = re.sub(r'\{\s*/\*\s*(.*?)\s*\*/\s*\}', r'<!-- \1 -->', template)

    # 2. Replace className= with class=
    template = re.sub(r'\bclassName\s*=', r'class=', template)

    # 3. Double-check any htmlFor= and replace with for=
    template = re.sub(r'\bhtmlFor\s*=', r'for=', template)

    # Reassemble
    if frontmatter:
        new_content = f"---{frontmatter}---{template}"
    else:
        new_content = template

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Successfully processed and fixed: {file_path}")

if __name__ == '__main__':
    fix_astro_file('src/pages/infraestructura-digital.astro')
