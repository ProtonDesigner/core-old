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
            "name": "Text"
        },
        {
            "id": 2,
            "name": "Image"
        }
    ]);

    return (
        <div className="app">
            <Topbar />
            <Sidebar elements={elements} />
            <Rightbar />
            <Preview />
        </div>
    )
}