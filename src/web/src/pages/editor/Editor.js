import React, { useState, useEffect } from 'react';
import "./Editor.scss"
import Preview from '../../components/Preview';
import Rightbar from '../../components/Inspector';
import Sidebar from '../../components/Hierarchy';
import Topbar from '../../components/Topbar';
import AddElementDialog from '../../components/AddElementDialog';

import Project from '../../utils/project';

import useKeyboardShortcut from "use-keyboard-shortcut"

export default function App(props) {
    const [elements, setElements] = useState({});
    const [activeElement, setActiveElement] = useState(null);
    const [updatedState, updateState] = useState(1);
    const [showElementDialog, setElementDialog] = useState(false);

    const project = new Project(props.projectName);

    const { flushHeldKeys } = useKeyboardShortcut(["Control", "S"], shortcutKeys => {
        project.elements = elements
        project.saveProject()
    })

    // console.log(props.projectName)
    useEffect(() => {
        project.loadProject((projectJSON) => {
            setElements(projectJSON.elements)
        })
    }, [])
    // console.log(project.elements.toString("utf8"))
    

    // setInterval(() => {
    // }, 500)    

    const updateElements = (newElement) => {
        project.addElement(newElement)
        let newElements = {...elements}
        newElements[newElement.uid] = newElement
        setElements(newElements);
    }

    const deleteElement = (element) => {
        project.deleteElement(element)
        let newElements = elements
        delete newElements[element.uid]
        setElements(newElements)
        updateState(updatedState + 1)
        setActiveElement(null)
    }

    // Dark mode code

    console.log(activeElement)

    return (
        <div className={`app ${props.darkMode == 1 ? "dark" : "light"}`}>
            <Topbar darkMode={props.darkMode} showElementDialog={showElementDialog} setElementDialog={setElementDialog} />
            <AddElementDialog show={showElementDialog} addElement={updateElements} setElementDialog={setElementDialog} setActiveElement={setActiveElement} />
            <Sidebar deleteElement={deleteElement} darkMode={props.darkMode} elements={elements} setActiveElement={setActiveElement} />
            <Rightbar darkMode={props.darkMode} activeElement={activeElement} updateState={updateState} updatedState={updatedState} />
            <Preview darkMode={props.darkMode} elements={elements} />
        </div>
    )
}