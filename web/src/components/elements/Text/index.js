import React from "react";
import BaseComponent from "../base_component";

export default function Text(props) {
    return (
        <BaseComponent classname="app__text">
            <p>{props.text}</p>
        </BaseComponent>
    )
}
