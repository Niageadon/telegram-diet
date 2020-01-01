import React, {useState} from 'react';
import {useHttp} from '../hooks/http.hook';
export const AuthPage = () => {
	const { loading, error, request } = useHttp();
	const [form, setForm] = useState({
		email: '',
		password: ''
	});
	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	};

	const registerHandler = async () => {
		try{
			const data = await request('/api/auth/register', 'POST', {...form});
			 console.log(22, data);
		} catch (e) {

		}
	}

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Auth page</h1>
				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Car tytle</span>
						<div className="row">
							<div className="input-field col s12">
								<input onChange={changeHandler} id="email" type="email" className="validate white-text yellow-input"/>
								<label htmlFor="email">email</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input onChange={changeHandler} id="password" type="password" className="validate white-text yellow-input"/>
								<label htmlFor="password">password</label>
							</div>
						</div>
					</div>

					<div className="card-action">
						<button disabled={loading} className="btn yellow darken-4" style={{marginRight: 16}}>Login</button>
						<button onClick={registerHandler}
						        disabled={loading} className="btn gray lighten-1 black-text">Registration</button>
					</div>
				</div>
			</div>
		</div>
	)
};
