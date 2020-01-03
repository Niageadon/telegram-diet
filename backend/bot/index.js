const Diet = require('../../models/Diet');

const start = (() => {
	const TelegramBot = require('node-telegram-bot-api');
	const { ownerId, tokenID, debugMode } = require('./admin.js');
	const bot = new TelegramBot(tokenID, {
		polling: {
			interval: 400,
			autoStart: true,    // автоответ на запросы, сделанные к отключенному боту
			params: {
				timeout: 10
			}
		}
	});
	const directions = ['/', '/diet'];
	let userDirection = new Map;


	bot.on('message', msg => {
		//console.log('message', JSON.stringify(msg))
		messageHandler(msg);

		//const answer = `<strong>Hello, ${msg.from.first_name}</strong>
		//<pre>${debugMessage(msg)}</pre>`;
		// bot.sendMessage(msg.chat.id, answer, {
		// 	parse_mode: 'HTML'
		// })
	});



	/*---------------------------------------------------*/
	function start(message) {
		bot.sendMessage(message.from.id, 'Routes:', {
			reply_markup: {
				inline_keyboard: [
					[{text: 'diet', callback_data: '1'}],
				]
			}
		})
	}
	function diet(message) {
		if(getDirection(message) !== '/diet') {
			console.log('11')
		}
		else if(message.text.includes('/diet')) {
			console.log('22')
			bot.sendMessage(message.from.id, 'Введите продукт в формате: \n"название продукта-количество(г.)"')
		}
		else {
			console.log('33')
			let { product, count, error } = validateText(message.text);
			if(error) {
				bot.sendMessage(message.from.id, error);
			}
			else {
				bot.sendMessage(message.from.id, "Данные сохранены");
				const boba = new Diet({
					product,
					count,
					date: new Date(),
					owner: message.from.id
				});
				boba.save();
			}
		}




		function validateText(text) {
			if(text.includes(' ')) {
				return { error: "Не используйте пробелы", product: '', count: 0 }
			}
			let [ product, count ] = text.split('-');
			console.log(55, product, count);
			if(!(product && count)) {
				return { error: "Не втирай мне дичь", product, count }
			} else if(!(count + 1)) {
				return { error: "Некорректно указано количество", product, count }
			} else {
				return { error: "", product, count }
			}

		}
	}

	function messageHandler(message) {
		switchDirection(message);
		let flag = false;
		switch (message.text) {
			case '/start': {
				start(message); flag = true; break;
			}
			case '/diet': {
				diet(message); flag = true; break;
			}
		}
		if(!flag){
			switch (userDirection.get(message.from.id)) {
				case '/start': {
					start(message); break;
				}
				case '/diet': {
					diet(message); break;
				}
			}
		}


		if(debugMode) {
			debug(message);
		}
	}
	function getDirection(message) {
		return userDirection.get(message.from.id)
	}
	function switchDirection(message) {
		// Меняем траекторию
		if(directions.includes(message.text)) {
			userDirection.set(message.from.id, message.text);
		}
		else if(!userDirection.get(message.from.id)) {
			// При первом пользовании определяем пользователя в корневую траекторию
			userDirection.set(message.from.id, '/');
		}
	}
	function debug(message) {
		const userId = message.chat.id;

		const text =  `Position: ${userDirection.get(userId)}
		<pre>${JSON.stringify(message, null, 4)}</pre>`;
		bot.sendMessage(userId, text, {
			parse_mode: 'HTML'
		})
	}
});

 module.exports = {start};

