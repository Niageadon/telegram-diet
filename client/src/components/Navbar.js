import React, {useContext} from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth.context';

export const Navbar = () => {
	const history = useHistory();
	const auth = useContext(AuthContext);

	const logoutHandler = event => {
		event.preventDefault();
		auth.logout();
		history.push('/');
	};

	return(
		<nav>
			<div className="nav-wrapper">
				<a href="/" className="brand-logo">Main</a>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><NavLink to="/" onClick={logoutHandler}>Logout</NavLink></li>
				</ul>
			</div>
		</nav>
	)

}
