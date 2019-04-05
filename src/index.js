import React from "react";
import ReactDOM from "react-dom";
import Admin from "./pages/admin";
import Preview from "./pages/preview";
import { Provider } from "react-redux";
import store from "./store";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

const Routing = ({ ...props }) => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Admin} />
        <Route path="/preview" component={Preview} />
      </div>
    </Router>
  )
};

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>, 
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
