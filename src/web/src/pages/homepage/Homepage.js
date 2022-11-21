import React, { useState } from 'react';
import "./Homepage.scss";

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
        <div className="sidebar__hamburger" onClick={() => setExpanded(!expanded)}>
            <i class="fa-solid fa-bars"></i>
        </div>
        <SidebarElement name="Home" icon={<i class="fa-solid fa-house"></i>} onClick={() => console.log("yeet")} />
        <SidebarElement name="Editor" icon={<i class="fa-solid fa-file-pen"></i>} onClick={() => props.setCurrentPageID(1)} />
    </div>
}

export default function Homepage(props) {
    return <div className="homepage">
        <Sidebar setCurrentPageID={props.setCurrentPageID} />
    </div>
}
