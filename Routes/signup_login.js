const express = require('express');
const coreRouter = express.Router();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// const envVariables = require('./../envVariables');
const url = `mongodb+srv://sd1214:database@firstcluster-ix5me.mongodb.net/test?retryWrites=true&w=majority`;


coreRouter.get('/login/log', (req, res) => {
	const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
	const userName = req.query.username;
	const userPass = req.query.password;
	// console.log(req.query);
	// console.log(userPass)
	// console.log(userName);
	client.connect(async (err) => {
		if (err) {
			console.log('Unable to connect to the server', err);
			res.json({ msg: 'Server connection error' });
		} else {
			const db = client.db('Edgistify');
			var collection = db.collection('users');
			const docs = await collection.find({ username: userName }).toArray();
			// console.log(docs);
			if (docs.length) {
				if (docs[0].password == userPass) {
					res.json({ msg: 'Authentication Successful' });
				} else {
					res.json({ msg: 'Wrong Password' });
				}
			} else {
				res.json({ msg: 'User not Found' });
			}
		}
		await client.close();
	});
});

coreRouter.post('/signup/newUser', (req, res) => {
	const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
	const email = req.body.email;
	const userName = req.body.username;
	const userPass = req.body.password;
	if (!email) {
		return res.json({ msg: 'Please enter email' });
	}
	else if (!userName) {
		return res.json({ msg: 'Please enter username' });
	} else if (!userPass) {
		return res.json({ msg: 'Please enter password' });
	}

	client.connect(async (err) => {
		if (err) {
			console.log('Unable to connect to the server', err);
			res.json({ msg: 'Server connection error' });
		} else {
			const db = client.db('Edgistify');
			var collection = db.collection('users');
			var email_id = await collection.find({ email: email }).toArray();
			var docs = await collection.find({ username: userName }).toArray();
			//console.log(docs.length)
			if (email_id.length != 0) {
				console.log(docs.length)
				console.log("Email-ID already present");
				return res.json({ msg: 'Email-Id already Registered' });
			}
			if (docs.length != 0) {
				console.log(docs.length)
				console.log("Username already present");
				return res.json({ msg: 'Username already existing' });
			}
			const user = {
				email: email,
				username: userName,
				password: userPass,
			};
			await collection.insertOne(user);
			docs = await collection.find({}).toArray();
			res.json(docs);
		}
		await client.close();
	});
});
module.exports = coreRouter;