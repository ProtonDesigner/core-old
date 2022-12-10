import React, { useState, useEffect } from 'react';
import "./Editor.scss"
import Preview from '../../components/Preview';
import Rightbar from '../../components/Inspector';
import Sidebar from '../../components/Hierarchy';
import AddElementDialog from '../../components/AddElementDialog';

import Project from '../../utils/project';

import useKeyboardShortcut from "use-keyboard-shortcut"

export default function EditorComponent(props) {
    const [elements, setElements] = useState({});
    const [activeElement, setActiveElement] = useState(null);
    const [updatedState, updateState] = useState(1);
    const [showElementDialog, setElementDialog] = useState(false);

    const updateComponentState = (setStateFunc, newState, stateName) => {
        setStateFunc(newState)
        // let newOuterState =
        props.setState("EditorComponent", stateName, newState);
    }

    console.log("o", props.state)

    const project = new Project(props.projectName);

    const { flushHeldKeys } = useKeyboardShortcut(["Control", "S"], shortcutKeys => {
        project.elements = elements
        project.saveProject()
    })

    // console.log(props.projectName)
    useEffect(() => {
        const state = props.state
        // console.log("bozo")
        if (state.EditorComponent) {
            console.log("p", state.EditorComponent.elements)
            setElements({...state.EditorComponent.elements} || {})
            setActiveElement(state.EditorComponent.activeElement || null)
        } else {
            project.loadProject((projectJSON) => {
                setElements(projectJSON.elements)
            })
        }
    }, [])
    // console.log(project.elements.toString("utf8"))
    

    // setInterval(() => {
    // }, 500)    

    const updateElements = (newElement) => {
        project.addElement(newElement)
        let newElements = {...elements}
        newElements[newElement.uid] = newElement
        updateComponentState(setElements, newElements, "elements")
    }

    const deleteElement = (element) => {
        project.deleteElement(element)
        let newElements = elements
        delete newElements[element.uid]
        updateComponentState(setElements, newElements, "elements")
        updateState(updatedState + 1)
        updateComponentState(setActiveElement, null, "activeElement")
    }

    // useEffect(() => {
    //     props.updateState(
    //         {
    //             elements: elements,
    //             activeElement: activeElement
    //         }
    //     )
    // }, [props.currentPage])

    // Dark mode code

    console.log(activeElement)

    return (
        <div className={`app ${props.darkMode == 1 ? "dark" : "light"}`} styles={{
            display: props.show ? "block" : "none"
        }}>
            <AddElementDialog
                show={showElementDialog}
                addElement={updateElements}
                setElementDialog={setElementDialog}
                setActiveElement={setActiveElement}
            />
            <Sidebar
                deleteElement={deleteElement}
                darkMode={props.darkMode}
                elements={elements}
                setActiveElement={setActiveElement}
                showElementDialog={showElementDialog}
                setElementDialog={setElementDialog}
            />
            <Rightbar
                darkMode={props.darkMode}
                activeElement={activeElement}
                updateState={updateState}
                updatedState={updatedState}
            />
            <Preview darkMode={props.darkMode} elements={elements} />
        </div>
    )
}