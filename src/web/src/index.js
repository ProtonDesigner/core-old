import React from 'react';
import App from './App';
import { render } from "react-dom";
import "./index.scss";

const appDiv = document.getElementById("main");
render(<App />, appDiv);