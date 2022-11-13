import React from "react";

export default function Image(props) {
    return (
        <div classname="app__image">
            <img src={props.src} alt={props.alt} />
        </div>
    )
}
