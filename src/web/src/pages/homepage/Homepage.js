import React, { useState, useEffect } from 'react';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import "./Homepage.scss";

import Project from "../../utils/project";
import getProjects from "../../utils/get_projects";

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
    </div>
}

const ProjectComponent = (props) => {
    return <div className="homepage__project" onClick={props.onClick}>
        <h4>{props.name}</h4>
        <p>By {props.author}</p>
    </div>
}

const ProjectsView = (props) => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
		getProjects((projects) => {
			setProjects(projects)
		})
    }, [])
    return <div className="homepage__projects-container">
		<h4>Or open an existing project.</h4>
		<br/>
		<div className="homepage__projects">
			{projects && Object.keys(projects).map(project => {
				project = projects[project];
				return <ProjectComponent {...project} onClick={() => {
					props.setCurrentPageProps({projectName: project.name, ...props.currentPageProps});
					props.setCurrentPageID(1);
				}} />
			})}
		</div>
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

const QuickArea = (props) => {
	return <div className="homepage__quick-area-container">
		<h4>Get started with some quick actions.</h4>
		<br />
		<div className="homepage__quick-area">
			<div className="quick-area__button" onClick={() => {
				props.setNewProjectWinShow(true)
				props.setBlackScreenCallback(() => {
					props.setBlackScreen(false);
				})
			}}>
				<i class="fa-solid fa-plus fa-lg"></i>
			</div>
		</div>
	</div>
}

export default function Homepage(props) {
    const [newProjectWinShow, setNewProjectWinShow] = useState(false);
    const [blackScreen, setBlackScreen] = useState(false);
    const [blackScreenCallback, setBlackScreenCallback] = useState(() => {
        setBlackScreen(false)
    });

    return <div className="homepage">
		<QuickArea
			setNewProjectWinShow={setNewProjectWinShow}
			setBlackScreen={setBlackScreen}
            setBlackScreenCallback={setBlackScreenCallback}
		/>
        <Sidebar
            setCurrentPageID={props.setCurrentPageID}
            blackScreen={blackScreen}
        />
        <div className="black__screen" />
        <ProjectsView
			setCurrentPageID={props.setCurrentPageID}
			setCurrentPageProps={props.setCurrentPageProps}
			currentPageProps={props.currentPageProps}
		/>
        <CreateNewProjectWindow
			setCurrentPageProps={props.setCurrentPageProps}
			setCurrentPageID={props.setCurrentPageID}
			show={newProjectWinShow}
			setBlackScreen={setBlackScreen}
			currentPageProps={props.currentPageProps}
		/>
        <BlackScreen
			show={blackScreen}
			above={newProjectWinShow}
			callback={blackScreenCallback}
		/>
    </div>
}
