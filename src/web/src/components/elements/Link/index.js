import React from "react";
import BaseComponent from "../base_component";

const Link = (props) => {
    return <BaseComponent className="app__link">
        <a href={props.link}>{props.text}</a>
    </BaseComponent>
}

export default Link;
