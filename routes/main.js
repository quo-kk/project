const express = require('express');
const router = express.Router();
var mysql = require('mysql');
const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
const Item = require('../models/Item');
const User = require('../models/User');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

const alertMessage = require('../helpers/messenger');

router.get('/', (req, res) => {
	Item.findAll({
		raw: true
	}).then((items) => {
		res.render('index', {
			items:items
		});
	}).catch(err => console.log(err));	
});

router.get('/viewprofile', (req, res) => {
	User.findOne({
		where:{
			id: req.user.id
		}
	}).then((items)=>{
		res.render('user/viewprofile',{
			items
		});
    }).catch(err=>console.log(err));
});

router.get('/primary', (req, res) => {
	Item.findAll({
		where:{
			category: 'primary'
		},
		raw: true
	}).then((items) => {
		res.render('primary', {
			items:items
		});
	}).catch(err => console.log(err));	
});

router.get('/secondary', (req, res) => {
	Item.findAll({
		where:{
			category: 'secondary'
		},
		raw: true
	}).then((items) => {
		res.render('secondary', {
			items:items
		});
	}).catch(err => console.log(err));	
});

router.get('/tertiary', (req, res) => {
	Item.findAll({
		where:{
			category: 'tertiary'
		},
		raw: true
	}).then((items) => {
		res.render('tertiary', {
			items:items
		});
	}).catch(err => console.log(err));	
});

router.get('/kindergarten', (req, res) => {
	Item.findAll({
		where:{
			category: 'kindergarten'
		},
		raw: true
	}).then((items) => {
		res.render('kindergarten', {
			items:items
		});
	}).catch(err => console.log(err));	
});

router.get('/paper', (req, res) => {
	Item.findAll({
		where:{
			category: 'paper'
		},
		raw: true
	}).then((items) => {
		res.render('paper', {
			items:items
		});
	}).catch(err => console.log(err));	
});

router.get('/misc', (req, res) => {
	Item.findAll({
		where:{
			category: 'misc'
		},
		raw: true
	}).then((items) => {
		res.render('misc', {
			items:items
		});
	}).catch(err => console.log(err));	
});

router.get('/others', (req, res) => {
	Item.findAll({
		where:{
			category: 'others'
		},
		raw: true
	}).then((items) => {
		res.render('others', {
			items:items
		});
	}).catch(err => console.log(err));	
});

router.get('/writing', (req, res) => {
	Item.findAll({
		where:{
			category: 'writing'
		},
		raw: true
	}).then((items) => {
		res.render('writing', {
			items:items
		});
	}).catch(err => console.log(err));	
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
	Item.findAll({
		raw: true
	}).then((items) => {
		res.render('viewcart', {
			items:items
		});
	}).catch(err => console.log(err));	
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
		Item.findAll({
			raw: true
		}).then((items) => {
			res.render('item/listItem', {
				items:items
			});
		}).catch(err => console.log(err));	
	});

router.get('/edit/:id',(req,res)=>{
	Item.findOne({
		where:{
			id: req.params.id
		}
	}).then((items)=>{
		res.render('item/edititem',{
			items
		});
	}).catch(err=>console.log(err));
});

router.get('/viewuser', (req, res) => {
	User.findAll({
		raw: true
	}).then((items) => {
		res.render('user/viewuser', {
			items:items
		});
	}).catch(err => console.log(err));	
});


$('#posterUpload').on('change', function(){
	let image = $("#posterUpload")[0].files[0];
	let formdata = new FormData();
	formdata.append('posterUpload', image);
	$.ajax({
		url: '/video/upload',
			type: 'POST',
		data: formdata,
		contentType: false,
		processData: false,
		'success':(data) => {
			$('#poster').attr('src', data.file);
			$('#posterURL').attr('value', data.file);// sets posterURL hidden field
			if(data.err){
				$('#posterErr').show();
				$('#posterErr').text(data.err.message);
			} else{
				$('#posterErr').hide();
			}
		}
	});
});

// Logout User
router.get('/logout', (req, res) => {
	req.logout();
	alertMessage(res, 'info', 'Bye-bye!', 'fas fa-power-off', true);
	res.redirect('/');
});

module.exports = router;
