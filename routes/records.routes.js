const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Diet = require('../models/Diet');

//api/records/list
router.get('/list', async (req, resp) => {
		const { telegramId } = req.query;
		console.log(telegramId)
		const list = await Diet.find({ owner: telegramId });
		resp.status(200).json({data: list});
	}
);

module.exports = router;
