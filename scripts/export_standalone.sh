#!/bin/sh

set -e

# Check if a filename was provided as an argument
if [ -z "$1" ]; then
	echo "Error: Please provide a filename as an argument!"
	exit 1
fi

APP_NAME="fm-collage"
DIST_DIR="dist"
EXPORT_DIR="export"
ZIP_FILE="$1"

# Cleans the export folder (if it exists)
echo "Cleaning the $EXPORT_DIR directory (if it exists)..."
rm -rf "$EXPORT_DIR"
mkdir -p "$EXPORT_DIR"

# Cleans the dist folder (if it exists)
echo "Cleaning the $DIST_DIR directory (if it exists)..."
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

# Copies the contents of .next/standalone, including hidden files
cp -r .next/standalone/. "$DIST_DIR/"
echo "Copied .next/standalone."

# Copies .next/static to dist/.next
mkdir -p "$DIST_DIR/.next"
cp -r .next/static "$DIST_DIR/.next/"
echo "Copied .next/static."

# Copies public if exists
if [ -d public ]; then
	cp -r public "$DIST_DIR/"
	echo "Copied public."
fi

# Removes .env file from dist, if it exists
echo "Removing .env file from $DIST_DIR (if it exists)..."
rm -f "$DIST_DIR/.env"

# Temporary rename dist dir to app rename
mv "$DIST_DIR" "$APP_NAME"

# Packages into a zip file
echo "Packaging app into $ZIP_FILE..."
zip -rq "$EXPORT_DIR/$ZIP_FILE" "$APP_NAME" >/dev/null 2>&1
echo "Packaging complete."

# Restore original dist dir name
mv "$APP_NAME" "$DIST_DIR"
