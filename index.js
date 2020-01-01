const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');
const port = config.get('port') || 5000;

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
async function start() {
	try {
		await mongoose.connect(config.get('monoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
	}
	catch(e) {
		console.error(e.message);
		process.exit(1);
	}
}
start();

app.listen(port, () => {
	console.log(`hello, server started at ${port}`)
})
