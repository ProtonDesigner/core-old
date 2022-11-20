import React from 'react';
import "./Inspector.scss"

import { elements_list as ELEMENTS_LIST } from '../utils/elements_list';

export default function Rightbar(props) {
    // const activeElement = props.activeElement;
    const elementID = props.activeElement?.id;
    const fields = elementID ? ELEMENTS_LIST[elementID]["fields"] : [];

    return (
        <div className={`rightbar ${props.darkMode == 1 ? "dark" : "light"}`}>
            <h3 className="rightbar__title">{props.activeElement ? ELEMENTS_LIST[props.activeElement.id].alias : "Inspector"}</h3>
            <br />
            {props.activeElement && <>
                <h5>Element Alias</h5>
                <input className="rightbar__alias" type="text" placeholder="Alias for element" value={props.activeElement["alias"]} maxLength="12" onChange={(e) => {
                    props.activeElement["alias"] = e.target.value;
                    // Used to re-render the page
                    props.updateState(props.updatedState + 1);
                }} />
                <br />
                <br />
                {fields && fields.map((field) => {
                    return <div className="rightbar__field">
                        <h5>{field.name}</h5>
                        <input type={field.type} placeholder="Type something amazing" value={props.activeElement["props"][field.prop_name]} onChange={(e) => {
                            props.activeElement["props"][field.prop_name] = e.target.value;
                            // Used to re-render the page
                            props.updateState(props.updatedState + 1);
                        }} />
                    </div>
                })}
                </>}
        </div>
    )
}
