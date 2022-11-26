import React, { useState } from 'react';
import "./App.scss";

import { pages as PAGES } from "./utils/pages";

export default function App(props) {
    const [currentPageID, setCurrentPageID] = useState(0);
    const [currentPageProps, setCurrentPageProps] = useState({
        setCurrentPageID: setCurrentPageID
    });
    const Component = PAGES[currentPageID].component;
    return <div className="app">
        <Component currentPageProps={currentPageProps} setCurrentPageProps={setCurrentPageProps} {...currentPageProps} />
    </div>
}
