const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = Router();
const User = require('../models/User')

// api/auth/registration
router.post(
	'/registration',
	[
		check('email', 'Email is not correct.'),
		check('password', 'Min length is 6.')
			.isLength({ min: 6 })
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



	}
	catch (e) {
		resp.status(500).json({message: 'Error.'})
	}
})

module.exports = router;
