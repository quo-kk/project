const express = require('express');
const router = express.Router();
var mysql = require('mysql');
const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
const Item = require('../models/Item');

const alertMessage = require('../helpers/messenger');

router.get('/', (req, res) => {
	const title = 'Video Jotter';
	res.render('index', {			// renders views/index.handlebars
		title
	})
});


/* 
Exercise 1 solution
*/

router.get('/about', (req, res) => {
	const author = 'Denzel Washington';
	let errors = [{text:'First error message'}, {text:'Second error message'}, {text:'Third error message'}];
	// Or
	// let errors = []
	// errors.push({text:'First error message'});
	// errors.push({text:'Second error message'});
	// errors.push({text:'Third error message'});

	res.render('about', {			// renders views/about.handlebars, passing author as variable
		author: author,
		errors
	})
}); 

// Exercise 2 solution
router.get('/about', (req, res) => {
	const author = 'Denzel Washington';
	alertMessage(res, 'success', 'This is an important message', 'fas fa-sign-in-alt', true);
	alertMessage(res, 'danger', 'Unauthorised access to video', 'fas fa-exclamation-circle', false);
	let error = 'Error message using error object';
	let errors = [{text:'First error message'}, {text:'Second error message'}, {text:'Third error message'}];
	let success_msg = 'Success message!';
	let error_msg = 'Error message using error_msg';

	res.render('about', {			// renders views/about.handlebars, passing author as variable
		author: author,
		error: error,
		errors: errors,
		success_msg: success_msg,
		error_msg: error_msg
	})
});

router.get('/viewcart', (req, res) => {
	res.render('viewcart');
});

// User Login Route
router.get('/showLogin', (req, res) => {
	res.render('user/login');
});

// shows the register page
router.get('/showRegister', (req, res) => {
	res.render('user/register');		// Activates views/user/register.handlebar
});

//shows create item page
router.get('/showCreateItem', (req, res) => {
	res.render('user/createitem'); //Activates views/user/createitem.handlebar
});

router.get('/listCreateItem', (req, res) => {
		let item = db.query('SELECT * FROM items')
		res.render('item/listItem',{
			item:item
		});
});

// Logout User
router.get('/logout', (req, res) => {
	req.logout();
	alertMessage(res, 'info', 'Bye-bye!', 'fas fa-power-off', true);
	res.redirect('/');
});

module.exports = router;
