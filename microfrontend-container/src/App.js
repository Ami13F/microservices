import './App.css';
import MicroFrontend from "./MicroFrontend";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const {
  REACT_APP_AUTH_HOST: authHost,
  REACT_APP_BOOKS_HOST: bookHost
} = process.env;

function App() {
  return (
    <div className="app">
    <header className="app__header">
      <h1 className="app__logo">Mi<strong>Songs</strong></h1>
    </header>
    <div className="app__main">
      <div className="app__main__column">
        <div className="microfrontend__wrapper">
          <MicroFrontends host={authHost} authToken="" />
        </div>
      </div>
      <div className="microfrontend__wrapper">
          <MicroFrontends host={bookHost} authToken="" />
        </div>
    </div>
  </div>
  );
}

export default App;
