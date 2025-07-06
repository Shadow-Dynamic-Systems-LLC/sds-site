#!/bin/bash

# ==============================================================================
# Image Conversion Utility for Shadow Dynamic Systems Website
#
# This script provides functions to streamline image processing for the website.
# It uses ImageMagick to convert and optimize images for web use.
#
# Dependencies:
#   - ImageMagick (ensure 'convert' command is available)
#
# To make this script executable:
#   chmod +x scripts/image_converter.sh
#
# To use the functions in your shell, source the script:
#   source scripts/image_converter.sh
#
# Then you can call the functions directly:
#   process_image_to_webp path/to/your/image.png
# ==============================================================================

# ------------------------------------------------------------------------------
# Function: process_image_to_webp
#
# Converts an image to a high-quality, web-optimized WebP file.
#
# - Resizes to a maximum width of 1200px (maintaining aspect ratio).
# - Strips all metadata to reduce file size.
# - Sets WebP quality to 82 (a good balance of quality and size).
# - Outputs the file with the same name but a .webp extension.
#
# Usage:
#   process_image_to_webp <input_file>
#
# Example:
#   process_image_to_webp unprocessed/my-cool-image.png
#   # This will create 'unprocessed/my-cool-image.webp'
# ------------------------------------------------------------------------------
process_image_to_webp() {
    # 1. Validate input
    if [[ -z "$1" ]]; then
        echo "Error: No input file specified."
        echo "Usage: process_image_to_webp <path_to_image>"
        return 1
    fi

    if [[ ! -f "$1" ]]; then
        echo "Error: File not found at '$1'"
        return 1
    fi

    local input_file="$1"
    # 2. Derive output filename
    local output_file="${input_file%.*}.webp"

    # 3. Explain the operation
    echo "Processing:"
    echo "  Input  -> $input_file"
    echo "  Output -> $output_file"

    # 4. Execute the conversion
    # The '>' in '1200x>' is quoted to prevent shell redirection.
    # This ensures the image is resized only if its width is > 1200px.
    convert "$input_file" -resize '1200x>' -strip -quality 82 "$output_file"

    # 5. Report result
    if [[ $? -eq 0 ]]; then
        echo "✅ Success: Image converted and optimized."
    else
        echo "❌ Error: ImageMagick conversion failed."
        return 1
    fi
}

# ------------------------------------------------------------------------------
# Function: process_directory
#
# Finds all .png, .jpg, and .jpeg files in a source directory and converts
# them to .webp using the process_image_to_webp function.
#
# Usage:
#   process_directory <source_directory>
#
# Example:
#   process_directory unprocessed/
# ------------------------------------------------------------------------------
process_directory() {
    if [[ -z "$1" ]]; then
        echo "Error: No source directory specified."
        echo "Usage: process_directory <source_directory>"
        return 1
    fi

    if [[ ! -d "$1" ]]; then
        echo "Error: Directory not found at '$1'"
        return 1
    fi

    local source_dir="$1"
    echo "🔍 Searching for images in '$source_dir'..."

    # Find and process files
    find "$source_dir" -maxdepth 1 \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -print0 | while IFS= read -r -d $'\0' file; do
        echo "----------------------------------------"
        process_image_to_webp "$file"
    done

    echo "----------------------------------------"
    echo "✅ All images in directory processed."
}

# This allows running functions directly from command line
# e.g. ./scripts/image_converter.sh process_directory unprocessed
"$@"
