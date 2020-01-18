// Модель для авторизации
const { Schema, model, Types } = require('mongoose');

const schema = Schema({
	owner: { type: String, required: true, unique: false },
	product: { type: String, required: true, unique: false },
	count: { type: Number, required: true, unique: false },
	date: { type: String, required: true, unique: false }
});

module.exports = model('diet', schema );
