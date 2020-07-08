const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const alertMessage = require('../helpers/messenger');
const User = require('../models/User');
const mysql = require('mysql');
const db = require('../config/DBConfig');
const Item = require('../models/Item');

router.get('/viewcart/:id', (req,res)=>{
    Cart.findOne({
        where:{
            id: req.user.id
        }
    }).then((items)=>{
        res.render('cart/viewcart',{
            items
        });
    }).catch(err=>console.log(err));
});

module.exports = router;