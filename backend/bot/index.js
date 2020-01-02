const start = (() => {
	const TelegramBot = require('node-telegram-bot-api');
	const adminData = require('./admin.js');
	const bot = new TelegramBot(adminData.tokenID, {
		polling: {
			interval: 400,
			autoStart: true,    // автоответ на запросы, сделанные к отключенному боту
			params: {
				timeout: 10
			}
		}
	});
	function debugMessage(msg) {
		return JSON.stringify(msg, null, 4)
	}



	bot.on('message', msg => {
		//console.log('message', JSON.stringify(msg))

		const answer = `<strong>Hello, ${msg.from.first_name}</strong> 
		<pre>${debugMessage(msg)}</pre>`;
		// bot.sendMessage(msg.chat.id, answer, {
		// 	parse_mode: 'HTML'
		// })

		if(msg.text === 'da') {
			bot.sendMessage(msg.chat.id, 'krasava')
		} else {
			bot.sendMessage(msg.chat.id, debugMessage(msg))
		}

		bot.sendMessage(msg.chat.id, 'ti pidor?', {
			reply_markup: {
				keyboard: [
					['ti pidor'],
					['net', 'da']
				]
			}
		})
	});


})

 module.exports = {start};

