import React from "react";
import { generateStyle } from "../generate_style";

const BaseComponent = (props) => {
    return <div className={`app__base ${props.className}`} style={generateStyle(props.x, props.y)}>
        {props.children}
    </div>
}

export default BaseComponent;
