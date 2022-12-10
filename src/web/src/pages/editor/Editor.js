import React, { useState } from 'react';
import EditorComponent from './EditorComponent'
import Topbar from '../../components/Topbar';
import CodeComponent from './CodeComponent';

export default function App(props) {
    const [currentPage, setCurrentPage] = useState(0);

    const [state, setState] = useState({})

    const pages = [
        {
            component: EditorComponent,
            state: {}
        },
        {
            component: CodeComponent,
            state: {}
        }
    ]

    console.log(state)

    const Component = pages[currentPage].component

    const setPage = (page_id, state) => {
        pages[page_id].state = state
        setCurrentPage(page_id)
    }

    return <>
        <Topbar darkMode={props.darkMode} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {/* TODO setSate thing */}
        <div className="editor__container">
            <Component setCurrentPage={setCurrentPage} state={state} setState={(componentName, stateName, newState) => {
                let _newState = {...state};
                if (!_newState[componentName]) {
                    _newState[componentName] = {}
                }
                if (!_newState[componentName][stateName]) {
                    _newState[componentName][stateName] = {}
                }
                _newState[componentName][stateName] = newState;
                setState({..._newState});
                console.log(_newState)
            }} {...props} />
        </div>
    </>
}
