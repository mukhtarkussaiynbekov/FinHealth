import React, { Component } from "react";
import Header from './Header';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import AuthService from "../services/auth.service";

import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";


const ProtectedRoute = ({ component: Comp, currentUser, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
	this.authChanger = this.authChanger.bind(this);
    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  authChanger() {
	  this.setState({
		  currentUser: AuthService.getCurrentUser()
	  });
  }
  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
	 <div>
		{currentUser && (
			<div>
				<Header email={ currentUser.email }/>
			</div>)
		}
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
          </Link>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.email}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
		  <Switch>
			<ProtectedRoute exact path={["/", "/profile"]} component={Profile} currentUser={this.state.currentUser}/>			
            <Route exact path="/login" render={() => <Login authChanger={this.authChanger}/>} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;