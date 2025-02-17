const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const Mainloop = imports.mainloop;
const ExtensionUtils = imports.misc.extensionUtils;

let countdown;

function init() {}

function enable() {
  countdown = new CountdownWidget();
  Main.panel.addToStatusArea('countdown-widget', countdown);
}

function disable() {
  if (countdown) {
    countdown.destroy();
    countdown = null;
  }
}

var CountdownWidget = class extends PanelMenu.Button {
  constructor() {
    super(0.0, "Countdown Widget", false);
    this._label = new St.Label({ text: 'Loading...', y_align: Clutter.ActorAlign.CENTER });
    this.add_child(this._label);
    this._targetDate = this._getTargetDate();
    this._update();
  }

  _getTargetDate() {
    // Read target date from GSettings (format: "YYYY-MM-DD")
    let settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.countdown');
    let dateStr = settings.get_string('target-date') || "2025-01-01";
    let parts = dateStr.split('-');
    if (parts.length !== 3) return new Date(2025, 0, 1);
    let year = parseInt(parts[0]);
    let month = parseInt(parts[1]) - 1;
    let day = parseInt(parts[2]);
    return new Date(year, month, day);
  }

  _update() {
    let now = new Date();
    let diffDays = Math.ceil((this._targetDate - now) / (1000 * 60 * 60 * 24));
    this._label.text = diffDays + ' days left';
    // Update every hour
    this._timeout = Mainloop.timeout_add_seconds(3600, () => {
      this._update();
      return true;
    });
  }

  destroy() {
    if (this._timeout) {
      Mainloop.source_remove(this._timeout);
      this._timeout = null;
    }
    super.destroy();
  }
};
