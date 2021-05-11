import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import FinHealthHeader from './FinHealthHeader';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from '../services/auth.service';

import Login from './Login';
import Register from './Register';
import Profile from './Profile';

const ProtectedRoute = ({ component: Comp, currentUser, path, ...rest }) => {
	return (
		<Route
			path={path}
			{...rest}
			render={props => {
				return currentUser ? (
					<Comp currentUser={currentUser} {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: {
								prevLocation: path,
								error: 'You need to login first!'
							}
						}}
					/>
				);
			}}
		/>
	);
};

const App = () => {
	const [state, setState] = useState({ currentUser: undefined });

	useEffect(() => {
		const user = AuthService.getCurrentUser();

		if (user) {
			setState({
				currentUser: user
			});
		}
	}, []);

	const authChanger = () => {
		setState({
			currentUser: AuthService.getCurrentUser()
		});
	};

	const logOut = () => {
		AuthService.logout();
	};

	const { currentUser } = state;

	return (
		<div>
			{currentUser ? (
				<div>
					<FinHealthHeader email={currentUser.email} onLogOut={logOut} />
				</div>
			) : (
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<Link to={'/'} className="navbar-brand"></Link>
					<div className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link to={'/login'} className="nav-link">
								Login
							</Link>
						</li>

						<li className="nav-item">
							<Link to={'/register'} className="nav-link">
								Sign Up
							</Link>
						</li>
					</div>
				</nav>
			)}

			<div className="container mt-3">
				<Switch>
					<ProtectedRoute
						exact
						path={['/', '/profile']}
						component={Profile}
						currentUser={currentUser}
					/>
					<Route
						exact
						path="/login"
						render={() => <Login authChanger={authChanger} />}
					/>
					<Route exact path="/register" component={Register} />
				</Switch>
			</div>
		</div>
	);
};

export default App;
