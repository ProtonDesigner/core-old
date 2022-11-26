import React, { useState } from 'react';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import "./Homepage.scss";

import Project from "../../utils/project";

const generateRandomName = () => {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        length: 2,
        separator: "",
        style: "capital"
    })
};

const SidebarElement = (props) => {
    return <div onClick={props.onClick} className="sidebar__element">
        <div className="sidebar__icon">{props.icon}</div>
        <div style={{
            height: "5px"
        }} />
        <div className="sidebar__name">{props.name}</div>
    </div>
}

const Sidebar = (props) => {
    const [expanded, setExpanded] = useState(false);
    
    return <div className={`homepage__sidebar ${expanded ? "expanded" : ""}`}>
        <div className="sidebar__hamburger" onClick={() => {
            setExpanded(!expanded)
            props.setBlackScreen(!props.blackScreen)
        }}>
            <i class="fa-solid fa-bars"></i>
        </div>
        <SidebarElement name="Home" icon={<i class="fa-solid fa-house"></i>} onClick={() => console.log("yeet")} />
        <SidebarElement name="New" icon={<i class="fa-solid fa-file-pen"></i>} onClick={() => {
            props.setNewProjectWinShow(true)
            props.setBlackScreenCallback(() => {
                props.setBlackScreen(false);
            })
        }} />
    </div>
}

const ProjectsView = (props) => {
    return <div className="homepage__projects">
        hello
    </div>
}

const CreateNewProjectWindow = (props) => {
    const [projectName, setProjectName] = useState(generateRandomName());

    if (props.show) {
        props.setBlackScreen(true);
    }

    return <div className="homepage__new-project" style={{
        opacity: props.show ? "1" : "0"
    }}>
        <h2>New Project</h2>
        <br />
        <div style={{
            width: "100%",
            height: "5px",
            backgroundColor: "grey"
        }} />
        <br />
        <label>Project Name: </label>
        <input
            type="text"
            placeholder="Awesome"
            value={projectName}
            onChange={(e) => {
                setProjectName(e.target.value);
            }}
        />
        <br />
        <button onClick={() => {
            const project = new Project(
                projectName
            )
            project.saveProject()
            props.setCurrentPageProps({projectName: projectName, ...props.currentPageProps})
            props.setCurrentPageID(1)
        }}>Create</button>
    </div>
}

const BlackScreen = (props) => {
    return <div className={`black__screen ${props.show ? "show" : ""} ${props.above ? "above" : ""}`} onClick={
        () => {
            if (props.show) {
                console.log(props.callback)
            }
        }
    } />
}

export default function Homepage(props) {
    const [newProjectWinShow, setNewProjectWinShow] = useState(false);
    const [blackScreen, setBlackScreen] = useState(false);
    const [blackScreenCallback, setBlackScreenCallback] = useState(() => {
        setBlackScreen(false)
    });

    return <div className="homepage">
        <Sidebar
            setNewProjectWinShow={setNewProjectWinShow}
            setCurrentPageID={props.setCurrentPageID}
            blackScreen={blackScreen}
            setBlackScreen={setBlackScreen}
            setBlackScreenCallback={setBlackScreenCallback}
        />
        <div className="black__screen" />
        <ProjectsView setCurrentPageID={props.setCurrentPageID} />
        <CreateNewProjectWindow setCurrentPageProps={props.setCurrentPageProps} setCurrentPageID={props.setCurrentPageID} show={newProjectWinShow} setBlackScreen={setBlackScreen} />
        <BlackScreen show={blackScreen} above={newProjectWinShow} callback={blackScreenCallback} />
    </div>
}
