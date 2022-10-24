import React from 'react';
import "./Preview.scss";

import { elements_list as ELEMENTS_LIST } from "./utils/elements_list";

export default function Preview(props) {
    const elements = props.elements;

    return (
        <div className="app__preview">
            <div className="preview__outerbezel">
                <div className="preview__innerbezel">
                    {elements && elements.map(element => {
                        const id = element.id;
                        const Component = ELEMENTS_LIST[id]["component"];
                        return <Component key={element.uid} {...element.props} />
                    })}
                </div>
            </div>
        </div>
    )
}
