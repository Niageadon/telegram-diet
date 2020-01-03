// Модель для авторизации
const { Schema, model, Types } = require('mongoose');

const schema = Schema({
	owner: { type: String, required: true },
	product: { type: String, required: true },
	count: { type: Number, required: true },
	date: { type: String, required: true }
});

module.exports = model('diet', schema );
