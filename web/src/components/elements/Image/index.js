import React from "react";
import BaseComponent from "../base_component";

export default function Image(props) {
    return (
        <BaseComponent className="app__image">
            <img src={props.src} alt={props.alt} />
        </BaseComponent>
    )
}
