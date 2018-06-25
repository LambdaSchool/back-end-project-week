const express = require("express");
const router = express.Router();

const User = require("./User");

router.route("/").get((req, res) => {
	const query = User.find();

	query
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(500).json({ errorMessage: "Users can not be retrieved" });
		});
});

router.route("/").post((req, res) => {
	if (!req.body.username) {
		res.status(400).json({ errorMessage: "Please provide a username" });
	} else {
		const newUser = new User(req.body);
		newUser
			.save()
			.then(newUser => {
				res.status(201).json(newUser);
			})
			.catch(err => {
				res.status(500).json({
					errorMessage: "There was an error saving the user to the database."
				});
			});
	}
});

module.exports = router;
