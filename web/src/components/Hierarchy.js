import React, { useRef, useState, useEffect } from 'react';
import "./Hierarchy.scss"

import { elements_list as ELEMENTS_LIST } from "./utils/elements_list";

const Element = (props) => {
    const element_ref = useRef()
    const name = ELEMENTS_LIST[props.element_id]["name"];
    return <div ref={element_ref} onClick={() => {
            props.onClick()
        }} className="sidebar__element">
        <h4>{name}</h4>
    </div>
}

export default function Sidebar(props) {
    const [activeElementUID, setActiveElementUID] = useState(null);

    return (
        <div className={`sidebar ${props.darkMode == 1 ? "dark" : "light"}`}>
            <h3 className="sidebar__title">Hierarchy</h3>
            <br />
            {props.elements && props.elements.map((element) => {
                return <>
                    <Element setActiveElementUID={setActiveElementUID} uid={element.uid} key={element.uid} onClick={() => {
                        props.setActiveElement(element)
                    }} element_id={element.id} activeElementUID={activeElementUID} />
                    <div style={{
                        width: '100%',
                        height: '2.5px',
                        backgroundColor: 'black',
                        paddingTop: '5px',
                        paddingBottom: '5px'
                    }} />
                </>
            })}
        </div>
    )
}
