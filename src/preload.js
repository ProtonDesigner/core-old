const fs = require('fs');
const homeDir = require('os').homedir();
const path = require('path');
const { BrowserWindow, Menu, MenuItem } = require('@electron/remote')

window.fs = fs;
window.homeDir = homeDir;
window.path = path;

window.BrowserWindow = BrowserWindow;
window.Menu = Menu;
window.MenuItem = MenuItem;

window.updateMenu = (template) => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu)
}
