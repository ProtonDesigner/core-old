import React, { useState, useEffect } from 'react';
import "./App.scss";

import { pages as PAGES } from "./utils/pages";

export default function App(props) {
    const [currentPageID, setCurrentPageID] = useState(0);
    const [currentPageProps, setCurrentPageProps] = useState({
        setCurrentPageID: setCurrentPageID
    });
    const Component = PAGES[currentPageID].component;
    const [darkMode, setDarkMode] = useState(0);

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(1);
        }
    }, [])

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        newColorScheme == "dark" ? setDarkMode(1) : setDarkMode(0);
    });

    return <div className={`app ${darkMode ? "dark" : "light"}`}>
        <Component currentPageProps={currentPageProps} setCurrentPageProps={setCurrentPageProps} darkMode={darkMode} {...currentPageProps} />
    </div>
}
