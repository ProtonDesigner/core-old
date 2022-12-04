import React, { useState, useEffect } from "react";
import "./Settings.scss";

import { SettingsLoader } from "../../utils/settings";

const SidebarElement = (props) => {
    return <div className="settings__element" onClick={props.onClick}>
        <h4>{props.name}</h4>
    </div>
}

const SettingsSidebar = (props) => {
    return <>
        <div className="sidebar__sep"></div>
        <div className="settings__sidebar">
            <h3>Settings</h3>
            <br/>
            <div className="sidebar__boarder" />
            <br/>
            {props.pages && Object.keys(props.pages).map((page_index) => {
                const page = props.pages[page_index];
                return <SidebarElement name={page.name} onClick={() => {
                    console.log(page_index)
                    props.setCurrentPage(page_index)
                }} />
            })}
        </div>
    </>
}

const SettingsPage = (props) => {
    const page = props.pages[props.currentPage];
    const [settings, setSettings] = useState([]);
    useEffect(() => {
        setSettings(page.settings)
    }, [props.currentPage])
    return <div className="settings__content">
        {settings && Object.keys(settings).map((setting_index) => {
            const setting = settings[setting_index];
            return <>
                <label>{setting.name}: </label>
                <input type={setting.type} value={setting.value} onChange={(e) => {
                    const value = e.target.value;
                    let newSettings = settings;
                    newSettings[setting_index]["value"] = value;
                    setSettings(newSettings);
                }} />
            </>
        })}
    </div>
}

const Settings = (props) => {
    const settingsLoader = new SettingsLoader();
    settingsLoader.createFiles()

    const [currentPage, setCurrentPage] = useState("1");

    const pages = {
        "0": {
            name: "General",
            settings: [
                {
                    type: "text",
                    name: "Author",
                    key: "author"
                }
            ]
        },
        "1": {
            name: "Personalization",
            settings: [
                {
                    type: "dropdown",
                    options: [
                        "auto",
                        "light",
                        "dark"
                    ],
                    name: "Color mode",
                    key: "darkMode"
                }
            ]
        }
    }

    console.log(pages)

    return <div className={`settings ${props.darkMode == 1 ? "dark" : "light"}`} style={{
        opacity: props.show ? "1" : "0"
    }}>
        <SettingsSidebar setCurrentPage={setCurrentPage} pages={pages} />
        <SettingsPage currentPage={currentPage} pages={pages} />
    </div>
}

export default Settings;
