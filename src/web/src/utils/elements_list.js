import Text from "../elements/Text";
import Title from "../elements/Title";
import Image from "../elements/Image";
import Link from "../elements/Link";

// Element Structure
// {
//     id: Element ID here,
//     uid: Unique ID here,
//     props: Getting the default fields or "props",
//     alias: Element Alias here (what is the element called in the hierarchy)
// }

const elements_list = {
    1: {
        "id": 1,
        "name": "Text",
        "component": Text,
        "alias": "Text0",
        "fields": [
            {
                "type": "text",
                "name": "Text",
                "prop_name": "text",
                "default_value": "This is text"
            }
        ]
    },
    2: {
        "id": 2,
        "name": "Title",
        "component": Title,
        "alias": "Title0",
        "fields": [
            {
                "type": "text",
                "name": "Text",
                "prop_name": "text",
                "default_value": "This is a title"
            }
        ]
    },
    3: {
        "id": 3,
        "name": "Image",
        "component": Image,
        "alias": "Image0",
        "fields": [
            {
                "type": "text",
                "name": "Image link",
                "prop_name": "src",
                "default_value": "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700"
            },
            {
                "type": "text",
                "name": "Alt text (accessibility)",
                "prop_name": "alt",
                "default_value": "Some dude dancing in 4K"
            }
        ]
    },
    4: {
        "id": 4,
        "name": "Link",
        "component": Link,
        "alias": "Link0",
        "fields": [
            {
                "type": "text",
                "name": "Link",
                "prop_name": "link",
                "default_value": "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700"
            },
            {
                "type": "text",
                "name": "Text",
                "prop_name": "text",
                "default_value": "Some dude dancing in 4K"
            }
        ]
    }
}

export { elements_list };