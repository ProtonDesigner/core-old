import React from 'react';
import { v4 as uuidv4 } from "uuid";

import { elements_list as ELEMENTS_LIST } from './utils/elements_list';
import { get_default_props } from './utils/get_default_props';
import "./AddElementDialog.scss";

const AddElementDialog = (props) => {
    return <div className="element__dialog" style={{
        display: props.show ? "block" : "none" 
    }} >
        {Object.entries(ELEMENTS_LIST).map(([key, value]) => {
            return <>
                <div className="element" onClick={() => {
                    const newElement = {
                        id: value.id,
                        uid: uuidv4(),
                        props: get_default_props(value.id),
                        alias: value.alias
                    };
                    props.setElements([...props.elements, newElement]);
                    props.setElementDialog(false);
                    props.setActiveElement(newElement);
                }}>
                    {value.name}
                </div>
                {key == Object.entries(ELEMENTS_LIST).length ? "" : <br/>}
            </>
        })}
    </div>
}

export default AddElementDialog;