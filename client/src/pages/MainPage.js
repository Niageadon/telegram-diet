import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/auth.context';
export const MainPage = () => {
	const { loading, error, request, clearError } = useHttp();
	const auth = useContext(AuthContext);
	const message = useMessage();
	const [form, setForm] = useState({
		telegramId: '',
		password: ''
	});
	const userId = 378495257;
	let list = []
	useEffect( () => {
		getList();
		async function getList() {
			request(`/api/records/list?telegramId=${userId}`, 'GET')
				.then(a => {
					console.log(a)
			})
		}
	}, [userId])

	const loginHandler = async () => {
		try{
			const data = await request('/api/auth/login', 'POST', {...form});
			auth.login(data.token, data.userId);
		} catch (e) {
			console.error(e.message)
		}
	};

	return (
		<div className="row records">
			<h1>dd</h1>
		</div>
	)
};
