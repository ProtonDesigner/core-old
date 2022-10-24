import React, { useState } from 'react';
import "./App.scss"
import Preview from './Preview';
import Rightbar from './Rightbar';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function App(props) {
    const [elements, setElements] = useState([
        {
            "id": 1,
            "uid": Math.random(),
            "props": {
                "text": "This is Text"
            }
        },
        {
            "id": 2,
            "uid": Math.random(),
            "props": {
                "text": "This is a Title"
            }
        }
    ]);
    const [activeElement, setActiveElement] = useState(null);
    const [updatedState, updateState] = useState(1);

    console.log(activeElement)

    return (
        <div className="app">
            <Topbar />
            <Sidebar elements={elements} setActiveElement={setActiveElement} />
            <Rightbar activeElement={activeElement} updateState={updateState} updatedState={updatedState} />
            <Preview elements={elements} />
        </div>
    )
}