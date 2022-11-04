import React from 'react';
import "./Topbar.scss"

export default function Topbar(props) {
    return (
        <div className={`topbar ${props.darkMode == 1 ? "dark" : "light"}`}>
            <div className="play__button">
                <i class="fa-solid fa-play fa-lg"></i>
            </div>
        </div>
    )
}
