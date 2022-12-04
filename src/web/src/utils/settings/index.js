// Prod

fs = window.fs;
path = window.path;
homeDir = window.homeDir;

// Development

// const fs = require('fs');
// const homeDir = require('os').homedir();
// const path = require('path');

const paths = require('./paths')
const SETTINGS_FILES = paths.configFiles;

const defaultConfigs = require("./defaultConfig")
const { configs } = defaultConfigs;

let SETTINGS_PATH = path.join(homeDir, ".proton")

class SettingsLoader {
    constructor() {
        this.createFiles()
    }

    createFiles() {
        if (!fs.existsSync(SETTINGS_PATH)) fs.mkdirSync(SETTINGS_PATH, { recursive: true })
        SETTINGS_FILES.map(file => {
            const filePath = path.join(SETTINGS_PATH, file)
            if (!fs.existsSync(filePath)) fs.writeFile(filePath, JSON.stringify({}), (err) => {
                if (err) throw err;
            })
            // console.log(filePath)
        });
    }

    resetConfig() {
        this.createFiles()
        // WARNING: THIS WILL OVERWRITE ANY PAST CONFIG OF THIS APPLICATION. DO AT YOUR OWN RISK.
        SETTINGS_FILES.map((file) => {
            const filePath = path.join(SETTINGS_PATH, file);
            fs.writeFile(filePath, JSON.stringify(configs[file]), (err) => {
                if (err) throw err;
            })
        })
    }

    modifySetting(settingsFile, settingsKey, value, cb) {
        this.getSettings(settingsFile,
            (settings) => {
                const newSettings = settings;
                newSettings[settingsKey] = value;
                
                fs.writeFile(path.join(SETTINGS_PATH, settingsFile), JSON.stringify(newSettings), (err) => {
                    if (err) throw err;
                })
                if (cb) cb(newSettings);
            }
        )
    }

    getSetting(settingsFile, setting_key, cb) {
        this.getSettings(settingsFile,
            (settings) => {
                if (cb) cb(settings[setting_key])
            }
        )
    }

    getSettings(settingsFile, cb) {
        this.createFiles()
        fs.readFile(path.join(SETTINGS_PATH, settingsFile), { encoding: 'utf8' }, (err, data) => {
            if (err) throw err;

            if (cb) cb(JSON.parse(data || "{}"));
        })
    }
}

// const settingsLoader = new SettingsLoader()
// // settingsLoader.createFiles()
// settingsLoader.resetConfig()
// settingsLoader.modifySetting("personalization.json", "darkMode", true, () => {
//     settingsLoader.getSetting("personalization.json", "darkMode", (darkMode) => {
//         console.log(darkMode)
//     })
// })

export {
    SettingsLoader
}
