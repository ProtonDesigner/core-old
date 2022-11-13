import { elements_list as ELEMENTS_LIST } from "./elements_list";

let get_default_props = (elementID) => {
    let element = ELEMENTS_LIST[elementID];
    let default_props = {};
    let fields = element.fields;
    fields.map(field => {
        default_props[field.prop_name] = field.default_value;
    })

    return default_props;
}

export { get_default_props }
