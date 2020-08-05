const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const alertMessage = require('../helpers/messenger');
const fs = require('fs');
const upload = require('../helpers/imageUpload');


router.post('/createitem', (req,res) => {
    let errors = [];
    let name = req.body.name;
    let price = req.body.price;
    let itemdes = req.body.itemdes;
    let otherinfo = req.body.otherinfo;
    let category = req.body.category;
    Item.create({name, price, itemdes, otherinfo,category})
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

router.get('/addtocart/:id',(req,res)=>{
    let {name, price, itemdes, otherinfo, category} = req.body;
    let cart = 'yes'
    let itemId = req.params.id
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

router.get('/removefromcart/:id',(req,res)=>{
    let {name, price, itemdes, otherinfo, category} = req.body;
    let cart = 'no'
    let itemId = req.params.id
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
        res.redirect('cart/viewcart');
    }).catch(err=>console.log(err));
});

router.put('/saveEditedItem/:id',(req,res)=>{
    let {name, price, itemdes, otherinfo, category} = req.body;
    Item.update({
        name, 
        price, 
        itemdes, 
        otherinfo,
        category
    },{
        where:{
            id: req.params.id
        }
        }).then(()=>{
        res.redirect('/item/listCreateItem');
    }).catch(err=>console.log(err));
});

router.get('/view/:id',(req,res)=>{
	Item.findOne({
		where:{
			id: req.params.id
		}
	}).then((items)=>{
		res.render('item/viewitem',{
			items
		});
    }).catch(err=>console.log(err));
});

// Upload poster
router.post('/upload',(req, res) => {
    // Creates user id directory for upload if not exist
    if (!fs.existsSync('./public/uploads/' + req.user.id)){
        fs.mkdirSync('./public/uploads/' + req.user.id);
    }
    upload(req, res, (err) => {
        if (err) {
            res.json({file: '/img/no-image.jpg', err: err});
        } else {
            if (req.file === undefined) {
                res.json({file: '/img/no-image.jpg', err: err});
            } else {
                res.json({file: `/uploads/${req.user.id}/${req.file.filename}`});
            }
        }
    });
})
    

module.exports = router;