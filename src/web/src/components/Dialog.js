import React from 'react';
import "./Dialog.scss"

const Dialog = (props) => {
    return <div className="dialog" style={{
        opacity: props.show ? "1" : "0"
    }}>
        {props.children}
    </div>
}

export default Dialog;
