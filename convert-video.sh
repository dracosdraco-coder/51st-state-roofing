#!/bin/bash

# Navigate to project directory
cd "$(dirname "$0")"

# Source video
SOURCE="public/hero-roofing-footage.mov"
DEST_MP4="public/hero-roofing-footage.mp4"

echo "Converting video to MP4 format..."
echo "Source: $SOURCE"
echo "Destination: $DEST_MP4"

# Convert MOV to MP4 (optimized for web)
ffmpeg -i "$SOURCE" \
  -c:v libx264 \
  -preset medium \
  -crf 28 \
  -c:a aac \
  -b:a 128k \
  "$DEST_MP4"

echo "✓ Conversion complete!"
echo "File size:"
ls -lh "$DEST_MP4"
