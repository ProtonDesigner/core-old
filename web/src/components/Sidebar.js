import React from 'react';
import "./Sidebar.scss"

import { elements_list as ELEMENTS_LIST } from "./utils/elements_list";

const Element = (props) => {
    const name = ELEMENTS_LIST[props.element_id]["name"];
    return <div className="sidebar__element">
        <h4>{name}</h4>
    </div>
}

export default function Sidebar(props) {
    return (
        <div className="sidebar">
            <h3 className="sidebar__title">Hierarchy</h3>
            <br />
            {props.elements && props.elements.map((element) => {
                return <>
                    <Element key={element.id} element_id={element.id} />
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
