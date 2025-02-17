#!/bin/bash
set -e

EXT_ID="countdown@widget"
EXT_DIR="$HOME/.local/share/gnome-shell/extensions/$EXT_ID"
SCHEMAS_DIR="$EXT_DIR/schemas"

# Create extension directory
mkdir -p "$EXT_DIR"

# Copy extension files (run this script from the folder containing metadata.json and extension.js)
cp metadata.json extension.js "$EXT_DIR/"

# If schemas directory exists, copy it and compile schemas
if [ -d "schemas" ]; then
  cp -r schemas "$EXT_DIR/"
  glib-compile-schemas "$SCHEMAS_DIR"
fi

# Enable extension if gnome-extensions command is available
if command -v gnome-extensions &>/dev/null; then
  gnome-extensions enable "$EXT_ID" && echo "Extension enabled."
else
  echo "Installation complete. Enable the extension via GNOME Tweak Tool."
fi
