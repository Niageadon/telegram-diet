const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = Router();
const config = require('../config/default');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// api/auth/register
router.post(
	'/register',
	[
		check('email', 'Email is not correct.')
			.isEmail(),
		check('password', 'Min length is 6.')
			.isLength({ min: 6 })
	],
	async (req, resp) => {
		console.log(req.body)
		try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return resp.status(400).json({
				errors: errors.array(),
				message: 'Failed data validation.'
			})
		}
		const { email, password } = req.body;
		const newUser = await User.findOne({ email });
		if(newUser) {
			return resp.status(400).json({ message: 'User with this email is exist.'})
		}
		const hashedPasswor = await bcrypt.hash(password, 12);

		const user = new User({
			email,
			password: hashedPasswor
		});
		await user.save();
		res.status(201).json({message: 'User created.'});

	}
	catch (e) {
		resp.status(500).json({message: 'Error.'})
	}
});
router.post(
	'/login',
	[
		check('email', 'Email is not correct.')
			.normalizeEmail().isEmail(),
		check('password', 'Min length is 6.')
			.isLength({ min: 6 }).exists()
	],
	async (req, resp) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return resp.status(400).json({
				errors: errors.array(),
				message: 'Failed data validation.'
			})
		}
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if(!user) {
			return resp(400).json({ message: 'User is not exist.' })
		}
		const isMatch = bcrypt.compare(password, user.password);
		if(!isMatch) {
			return resp.status(400).json({ message: 'Password is not correct' })
		}

		const token = jwt.sign(
			{ userId: user.id},
			config.get('jwtSecret'),
			{ expiresIn: '1h' }
		)

		resp.json({ token, userId: user.id });

	}
	catch (e) {
		resp.status(500).json({message: 'Error.'})
	}
})

module.exports = router;
