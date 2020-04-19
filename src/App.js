import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles.css";
import details from "./components/details";
import home from "./components/home";

import axios from "axios";

export default function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={home} exact />
        <Route path="/details" component={details} />
      </Switch>
    </main>
  );
}
