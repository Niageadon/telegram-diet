import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { AuthPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';
export const useRoutes = (isLogin) => {
	console.log(isLogin)
	if (isLogin) {
		return (
			<Switch>
				<Route path="/links" exact>
					<LinksPage/>
				</Route>

				<Route path="/create" exact>
					<CreatePage/>
				</Route>

				<Route path="/detail/:id">
					<DetailPage/>
				</Route>

				<Route path="/">
					<MainPage/>
				</Route>

				<Redirect to="/"/>
			</Switch>
		)
	}
	else {
		return (
			<Switch>
				<Route path="/login" exact>
					<AuthPage/>
				</Route>
				<Redirect to="/login"/>
			</Switch>
		)
	}
}
