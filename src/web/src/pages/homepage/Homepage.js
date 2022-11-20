import React from 'react';
import "./Homepage.scss";

const SidebarElement = (props) => {
    return <div onClick={props.onClick} className="sidebar__element">
        {props.icon}
        {props.name}
    </div>
}

const Sidebar = (props) => {
    return <div className="homepage__sidebar">
        <SidebarElement name="Home" onClick={() => console.log("yeet")} />
        <SidebarElement name="Editor" onClick={() => props.setCurrentPageID(1)} />
    </div>
}

export default function Homepage(props) {
    return <div className="homepage">
        <Sidebar setCurrentPageID={props.setCurrentPageID} />
    </div>
}
