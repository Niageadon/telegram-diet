import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/auth.context';
export const AuthPage = () => {
	const auth = useContext(AuthContext);
	const { loading, error, request, clearError } = useHttp();
	const message = useMessage();
	const [form, setForm] = useState({
		telegramId: '',
		password: ''
	});

	useEffect(() => {
		message(error);
		clearError()
	}, [error, message, clearError]);
	useEffect(() => {
		if(window.M) {
			window.M.updateTextFields();
		}
	}, []);

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	};

	const registerHandler = async () => {
		try{
			const data = await request('/api/auth/register', 'POST', {...form});
			message(data.message);
		} catch (e) {
			console.error(e.message)
		}
	};

	const loginHandler = async () => {
		try{
			const data = await request('/api/auth/login', 'POST', {...form});
			auth.login(data.token, data.userId);
		} catch (e) {
			console.error(e.message)
		}
	};

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Auth page</h1>
				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Car tytle</span>
						<div className="input-field">
							<input
								placeholder="Введите ваш telegram id"
								id="telegramId"
								type="text"
								name="telegramId"
								className="yellow-input"
								value={form.email}
								onChange={changeHandler}
								onKeyPress={event => {
									if(event.key === 'Enter') {
										loginHandler()
									}
								}}
							/>
							<label htmlFor="telegramId">telegramId</label>
						</div>

						<div className="input-field">
							<input
								placeholder="Введите пароль"
								id="password"
								type="password"
								name="password"
								className="yellow-input"
								value={form.password}
								onKeyPress={event => {
									if(event.key === 'Enter') {
										loginHandler()
									}
								}}
								onChange={changeHandler}
							/>
							<label htmlFor="email">Пароль</label>
						</div>
					</div>

					<div className="card-action">
						<button disabled={loading}
							className="btn yellow darken-4"
						    style={{marginRight: 16}}
							onClick={loginHandler}>
							Login
						</button>
						<button onClick={registerHandler}
				            disabled={loading}
			                className="btn gray lighten-1 black-text">
							Registration
						</button>
					</div>
				</div>
			</div>
		</div>
	)
};
