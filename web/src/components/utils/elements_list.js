import React from 'react';
import Text from "../elements/Text";
import Title from "../elements/Title";

const elements_list = {
    1: {
        "id": 1,
        "name": "Text",
        "component": Text,
        "fields": [
            {
                "type": "text",
                "name": "Text",
                "prop_name": "text"
            }
        ]
    },
    2: {
        "id": 2,
        "name": "Title",
        "component": Title,
        "fields": [
            {
                "type": "text",
                "name": "Title",
                "prop_name": "text"
            }
        ]
    }
}

export { elements_list };