import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/AuthService";
import Projects from "./components/projects/Projects";
import Sites from "./components/sites/Sites";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
    this.service = new AuthService();
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  logout = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(reponse => {
          this.setState({
            loggedInUser: reponse
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  render() {
    this.fetchUser();

    //debugger

    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>APP Rollout con usuario</h1>
          <Navbar
            userInSession={this.state.loggedInUser}
            logout={this.logout}
          />
          <Switch>
            <Route
              exact
              path="/projects"
              render={() => <Projects userData={this.state.loggedInUser} />}
            />
            <Route
              exact
              path="/sites"
              render={() => <Sites getUser={this.getTheUser} />}
            />
          </Switch>
          </header>
          {/* <Contents></Contents> */}
        </div>
      );
    } else {
      console.log('prueba 1')
      return (
        <div className="App">
          <header className="App-header">
            <Navbar
              userInSession={this.state.loggedInUser}
              logout={this.logout}
            />
            <Switch>
              <Route
                exact
                path="/signup"
                render={() => <Signup getUser={this.getTheUser} />}
              />
              <Route
                exact
                path="/login"
                render={() => <Login getUser={this.getTheUser} />}
              />
            </Switch>
          </header>
        </div>
      );
    }
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>

    //     <div>
    //       <h1>Rollout control app</h1>
    //     </div>
    //   </div>
    // );
  }
}

export default App;
