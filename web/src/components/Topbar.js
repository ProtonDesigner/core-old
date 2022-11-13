import React, { useState } from 'react';
import "./Topbar.scss"

export default function Topbar(props) {
    return <>
        <div className={`topbar ${props.darkMode == 1 ? "dark" : "light"}`}>
            <div className="add__element__button" onClick={() => {
                props.setElementDialog(!props.showElementDialog)
            }}>
                <i class="fa-solid fa-plus fa-lg"></i>
            </div>
            <div className="play__button">
                <i class="fa-solid fa-play fa-lg"></i>
            </div>
        </div>
    </>
}
