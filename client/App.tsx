import * as React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Post from "./Post";

/*
<BrowserRouter>
  <Switch>
    <Route path="/" component={Post} />
  </Switch>
</BrowserRouter>
*/

function App() {
  return <Post />;
}

export default hot(App);
