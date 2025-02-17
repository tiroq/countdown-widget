# Countdown Widget

A GNOME Shell extension for Ubuntu that displays a countdown to a target date, configurable via GSettings.

## Features
- Shows days remaining until the target date.
- Configurable target date (format: YYYY-MM-DD) via `org.gnome.shell.extensions.countdown`.
- Automated installation script included.

## Installation

1. **Clone the Repository**
  ```bash
  git clone https://github.com/yourusername/countdown-widget.git
  cd countdown-widget

2. **Run the Installer**

  ```bash
  chmod +x install.sh
  ./install.sh
  ```

3. **Restart GNOME Shell** Press `Alt+F2`, type `r`, and press Enter.

4. **Enable the Extension Use GNOME Tweak Tool or:

  ```bash
  gnome-extensions enable countdown@widget
  ```

## Configuration
Adjust the target date using a tool like dconf-editor:

  ```swift
  /org/gnome/shell/extensions/countdown/target-date
  ```

  Format: `YYYY-MM-DD`

## Development

- Files:
  - metadata.json – Extension metadata.
  - extension.js – Main extension code.
  - schemas/org.gnome.shell.extensions.countdown.gschema.xml – GSettings schema.

- Compile Schemas:
  ```bash
  glib-compile-schemas schemas/
  ```
