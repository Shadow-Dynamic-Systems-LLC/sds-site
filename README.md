# Shadow Dynamic Systems LLC - Website

This repository contains the source code and content for the official website of Shadow Dynamic Systems LLC. It's a static site generated from Markdown files, designed for performance, security, and easy content management.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development Workflow](#development-workflow)
  - [1. Managing Content](#1-managing-content)
  - [2. Processing Images](#2-processing-images)
  - [3. Generating Site Data](#3-generating-site-data)
  - [4. Running the Local Server](#4-running-the-local-server)

---

## Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Content:** Markdown for blog posts and project descriptions.
- **Tooling:**
    - **Python 3:** For scripting and content generation.
    - **ImageMagick:** For image processing and optimization.
    - **Bash:** For utility scripts.

## Project Structure

```
.sds-site/
├── assets/                # All static assets (images, CSS, etc.)
│   └── unprocessed/       # Raw, high-resolution images go here
├── blog/                  # Markdown files for blog posts
├── projects/              # Markdown files for project descriptions
├── scripts/               # Utility and helper scripts
│   └── image_converter.sh # Script for batch image processing
├── .gitignore             # Specifies intentionally untracked files
├── blog_posts.json        # Generated data file for blog posts
├── generate_content.py    # Python script to parse Markdown and create JSON files
├── index.html             # The main entry point of the website
├── projects.json          # Generated data file for projects
└── README.md              # This file
```

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

1.  **Python 3:** [Download Python](https://www.python.org/downloads/)
2.  **ImageMagick:** [Install ImageMagick](https://imagemagick.org/script/download.php)
    - On macOS (via Homebrew): `brew install imagemagick`
    - On Debian/Ubuntu: `sudo apt-get install imagemagick`

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd sds-site
    ```

2.  **Install Python dependencies:**
    It's recommended to use a virtual environment.
    ```bash
    # Create and activate a virtual environment (optional but recommended)
    python3 -m venv .venv
    source .venv/bin/activate

    # Install required packages
    pip install PyYAML Markdown markdown-mermaid
    ```

## Development Workflow

Follow these steps to update the website's content.

### 1. Managing Content

- **Blog Posts:** To add or edit a blog post, create or modify a `.md` file in the `/blog` directory.
- **Projects:** To add or edit a project, create or modify a `.md` file in the `/projects` directory.

Each Markdown file must begin with a YAML "frontmatter" block, like this:

```yaml
---
title: "Your Title Here"
date: "YYYY-MM-DD"
author: "Your Name"
image: "assets/your-image.webp" # Path to the optimized header image
---

Your markdown content starts here...
```

### 2. Processing Images

To ensure fast load times, all images should be optimized and converted to `.webp` format.

1.  Place your raw, high-resolution images (e.g., `.png`, `.jpg`) into the `assets/unprocessed/` directory.
2.  Run the image conversion script to process them.

**To process a single image:**
```bash
./scripts/image_converter.sh process_image_to_webp assets/unprocessed/your-image.png
```

**To process all images in the `unprocessed` directory:**
```bash
./scripts/image_converter.sh process_directory assets/unprocessed/
```

The script will create optimized `.webp` versions in the same directory. Move these final images to the main `assets/` folder and update the `image:` path in your Markdown frontmatter accordingly.

### 3. Generating Site Data

After you've updated your Markdown files or images, you must run the content generation script. This script parses your `.md` files and updates the `blog_posts.json` and `projects.json` files that the website uses to display content.

```bash
python3 generate_content.py
```

### 4. Running the Local Server

To preview your changes locally, run the built-in Python web server from the root of the project directory:

```bash
python3 -m http.server 8000
```

Then, open your web browser and navigate to [http://localhost:8000](http://localhost:8000).

### 5. Debugging github workflows
make a change he-re
