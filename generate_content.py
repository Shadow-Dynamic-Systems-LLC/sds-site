import os
import json
import markdown
import yaml

def parse_md_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    parts = content.split('---', 2)
    if len(parts) < 3:
        return None, content, [], None

    frontmatter = yaml.safe_load(parts[1])
    md_content = parts[2].strip()

    # Extract summary from the first paragraph of markdown content
    summary = ''
    # Split by double newline to find paragraphs, then take the first non-empty one
    for p in md_content.split('\n\n'):
        if p.strip():
            summary = p.strip().split('\n')[0] # Take the first line of the first paragraph
            break

    html_content = markdown.markdown(md_content, extensions=['fenced_code', 'markdown_mermaid'])

    # Find images
    images = []
    lines = md_content.split('\n')
    for line in lines:
        if line.strip().startswith('!['):
            try:
                img_path = line.split('(')[1].split(')')[0]
                images.append(img_path)
            except IndexError:
                continue

    return frontmatter, html_content, images, summary

def generate_json(source_dir, output_file):
    items = []
    all_images = []
    if not os.path.exists(source_dir):
        os.makedirs(source_dir)
        print(f"Created directory: {source_dir}")
        # Create a sample file if the directory is new
        if source_dir == 'projects':
            with open(os.path.join(source_dir, 'sample_project.md'), 'w') as f:
                f.write('---\ntitle: "Sample Project"\ndescription: "This is a sample project to demonstrate the structure."\nimage: "assets/sample_project_image.png"\n---\n\nThis is the content of the sample project.')

    for filename in os.listdir(source_dir):
        if filename.endswith('.md'):
            file_path = os.path.join(source_dir, filename)
            metadata, content_html, images, summary = parse_md_file(file_path)
            if metadata:
                item = metadata
                item['content'] = content_html
                item['summary'] = summary
                item['file'] = os.path.join(source_dir, filename).replace('\\', '/')
                items.append(item)
                all_images.extend(images)

    # Sort blog posts by date, newest first
    if source_dir == 'blog':
        items.sort(key=lambda x: x.get('date'), reverse=True)

    with open(output_file, 'w') as f:
        json.dump(items, f, indent=4)
    
    return all_images

def main():
    print("Generating content...")
    
    # Process blog posts
    generate_json('blog', 'blog_posts.json')
    print("Generated blog_posts.json")

    # Process projects
    generate_json('projects', 'projects.json')
    print("Generated projects.json")

    print("Content generation complete.")

if __name__ == '__main__':
    main()
