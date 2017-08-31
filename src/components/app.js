import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./header";
import About from "./about";
import SearchVisualization from "./search-visualization";
import { parseQuery } from "../utils/query-utils";

export default function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <SearchVisualization searchPhrase="is it normal " />} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}
