import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Redirect } from "react-router-dom";

import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">NoteIt.</p>
        <Route
          exact
          path="/"
          render={() => <Redirect from="/" to="/login" />}
        />
        <Route exact path="/login" component={Login} />
        {/* <Route path="/notes" component={NoteList} /> */}
        {/* <Route path="/register" component={Home} /> */}
        {/* <Route path="/users" component={Home} /> */}
        {/* <Route path="/notes/create" component={Home} /> */}
      </div>
    );
  }
}

export default App;
