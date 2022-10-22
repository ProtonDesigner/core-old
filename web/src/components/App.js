import React from 'react';
import "./App.scss"
import Preview from './Preview';
import Rightbar from './Rightbar';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function App(props) {
    return (
        <div className="app">
            <Topbar />
            <Sidebar />
            <Rightbar />
            <Preview />
        </div>
    )
}