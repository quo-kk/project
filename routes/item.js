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

router.get('/delete/:id',(req,res)=>{
    let itemId = req.params.id
    Item.findOne({
		where:{
			id: itemId
        },
        attributes: ['id']
	}).then((items)=>{
        if (items != null){
            Item.destroy({
                where: {
                    id:itemId
                }
            }).then(()=>{
                alertMessage(res, 'info', 'Item deleted', 'fa fa-times-rectangle-o', true);
                res.redirect('/item/listCreateItem');
            }).catch(err => console.log(err));
        }else{
            alertMessage(res, 'danger', 'Unauthorised access to item', 'fa fa-times-rectangle-o', true);
        }    
    });
});

router.put('/saveEditedItem/:id',(req,res)=>{
    let {name, price, itemdes, otherinfo} = req.body;
    Item.update({
        name, 
        price, 
        itemdes, 
        otherinfo
    },{
        where:{
            id: req.params.id
        }
        }).then(()=>{
        res.redirect('/item//listCreateItem');
    }).catch(err=>console.log(err));
});

module.exports = router;