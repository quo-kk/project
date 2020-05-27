const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const alertMessage = require('../helpers/messenger');

router.post('/createitem', (req,res) => {
    let errors = [];
    let name = req.body.name;
    let price = req.body.price;
    let itemdes = req.body.itemdes
    let otherinfo = req.body.otherinfo;
    Item.create({name, price, itemdes, otherinfo})
    .then(user =>{
        alertMessage(res,'success',item.name+'added',true);
    })
});



module.exports = router;