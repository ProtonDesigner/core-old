import React, { useState, useEffect } from 'react';
import "./Code.scss"

import * as monaco from "monaco-editor";
import Editor, { loader } from "@monaco-editor/react"
import Project from '../../utils/project';

function ensureFirstBackSlash(str) {
    return str.length > 0 && str.charAt(0) !== "/"
        ? "/" + str
        : str;
}

function uriFromPath(_path) {
    const pathName = window.path.resolve(_path).replace(/\\/g, "/");
    return encodeURI("file://" + ensureFirstBackSlash(pathName));
}

loader.config({
  paths: {
    vs: uriFromPath(
      window.path.join(window.__dirname, "web/node_modules/monaco-editor/min/vs")
    )
  }
});

// loader.config({ monaco })
loader.init()

const Tab = (props) => {
    return <div className="editor__tab" onClick={props.onClick}>
        {props.name}
    </div>
}

const Tabs = (props) => {
    const [currentTab, setCurrentTab] = useState(props.defaultIndex)

    // const CurrentTabComp = props.tabs[currentTab].component

    return <> 
        <div className="editor__tabs">
            {props.tabs && Object.keys(props.tabs).map((tab_index) => {
                const tab = props.tabs[tab_index]
                return <Tab name={tab.filename} onClick={() => setCurrentTab(tab_index)} />
            })}
        </div>
        <div className="editor__content">
            <Editor
                height="100%"
                defaultLanguage='javascript'
                theme= {props.darkMode ? "vs-dark" : "light"}
            />
        </div>
    </>
}

const CodeComponent = (props) => {
    const [value, setValue] = useState("")
    const [tabs, setTabs] = useState([])
    const project = new Project(props.projectName);
    /*
    {
        filename: "main.js",
        component: Editor,
        props: {
            height: "100%",
            defaultLanguage: "javascript",
            value: value,
            theme: props.darkMode ? "vs-dark" : "light",
            onChange: (newValue, event) => {
                setValue(newValue)
            }
        }
    }
    */
    
    console.log(props)
    useEffect(() => {
        project.loadProject()
        project.getScript("main.js", (script) => {
            setValue(script)
        })

        project.getScripts((files) => {
            setTabs(files)
        })
    }, [])
    return <div className="code__comp">
        {/* <Editor height="100%" defaultLanguage="javascript" value={value} theme={props.darkMode ? "vs-dark" : "light"} onChange={(newValue, event) => {
            setValue(newValue)
        }} /> */}
        <Tabs defaultIndex={0} tabs={tabs} project={project} darkMode={props.darkMode} />
    </div>
}
export default CodeComponent
