const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const alertMessage = require('../helpers/messenger');
const User = require('../models/User');
const mysql = require('mysql');
const db = require('../config/DBConfig');
const Item = require('../models/Item');

router.get('/viewcart', (req, res) => {
	Item.findAll({
		where:{
			cart: 'yes'
		},
		raw: true
	}).then((items) => {
		res.render('cart/viewcart', {
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

router.get('/addtocart/:id',(req,res)=>{
    let {name, price, itemdes, otherinfo, category} = req.body;
    let cart = 'yes'
    let itemId = req.params.itemId
    Item.update({
        name, 
        price, 
        itemdes, 
        otherinfo,
        category,
        cart
    },{
        where:{
            id: itemId
        }
        }).then(()=>{
        res.redirect('/');
    }).catch(err=>console.log(err));
});


module.exports = router;