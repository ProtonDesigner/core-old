import React, { useState, useEffect } from 'react';
import "./App.scss"
import Preview from './Preview';
import Rightbar from './Inspector';
import Sidebar from './Hierarchy';
import Topbar from './Topbar';

export default function App(props) {
    const [elements, setElements] = useState([
        {
            "id": 2,
            "uid": Math.random(),
            "props": {
                "text": "This is a Title"
            }
        },
        {
            "id": 1,
            "uid": Math.random(),
            "props": {
                "text": "This is Text"
            }
        }
    ]);
    const [activeElement, setActiveElement] = useState(null);
    const [updatedState, updateState] = useState(1);
    const [darkMode, setDarkMode] = useState(0);

    // Dark mode code

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(1);
        }
    }, [])

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        newColorScheme == "dark" ? setDarkMode(1) : setDarkMode(0);
    });

    return (
        <div className={`app ${darkMode == 1 ? "dark" : "light"}`}>
            <Topbar darkMode={darkMode} />
            <Sidebar darkMode={darkMode} elements={elements} setActiveElement={setActiveElement} />
            <Rightbar darkMode={darkMode} activeElement={activeElement} updateState={updateState} updatedState={updatedState} />
            <Preview darkMode={darkMode} elements={elements} />
        </div>
    )
}