import React from "react";
import BaseComponent from "../base_component";

export default function Title(props) {
    return (
        <BaseComponent classname="app__title">
            <h2>{props.text}</h2>
        </BaseComponent>
    )
}
