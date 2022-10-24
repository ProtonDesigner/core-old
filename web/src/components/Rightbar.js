import React from 'react';
import "./Rightbar.scss"

import { elements_list as ELEMENTS_LIST } from './utils/elements_list';

export default function Rightbar(props) {
    // const activeElement = props.activeElement;
    const elementID = props.activeElement?.id;
    const fields = elementID ? ELEMENTS_LIST[elementID]["fields"] : [];

    return (
        <div className="rightbar">
            <h3 className="rightbar__title">Inspector</h3>
            {fields && fields.map((field) => {
                return <div className="rightbar__field">
                    <h5>{field.name}</h5>
                    <input type={field.type} value={props.activeElement["props"][field.prop_name]} onChange={(e) => {
                        props.activeElement["props"][field.prop_name] = e.target.value;
                        // Used to render the page
                        props.updateState(props.updatedState + 1);
                    }} />
                </div>
            })}
        </div>
    )
}
