const express = require('express');
const router = express.Router();

const alertMessage = require('../helpers/messenger');
const stripe = require("stripe")("sk_test_51H0n7DFaCcHVGhNjRJ3ea4lRVT3ACDeOuiVKoacwVsPELhMkJ13WWFKdWKW6Jk5a2ZvcAEfcRrNdIkIPRjOOySGz00tW8kJMuC");
const bodyParser = require("body-parser");
const { raw } = require('body-parser');
const Order = require('../models/Order');

router.get('/payment', (req, res) => {
  res.render('payment/paymentform');
});

router.get('/paysuccess', (req, res) => {
  res.render('payment/paysuccess', {
  });
});

router.post('/charge', (req, res) => {
  var token = req.body.stripeToken;
  var chargeAmount = req.body.chargeAmount;
  var charge = stripe.charges.create({
    amount: chargeAmount,
    currency: "sgd",
    source: token
  }, function (err, charge) {
    if (err){
      console.log("Your card was declined");
    }
  });
  console.log("Your payment was successful")
  Order.create().then(user =>{
		alertMessage(res,'success added',true);
    res.redirect('/payment/paysuccess');
  })
});

router.get('/vieworder', (req, res) => {
  Order.findAll({
       raw:true
    }).then((items)=>{
      res.render('payment/vieworder',{
        items
      });
      }).catch(err=>console.log(err));
});

router.get('/status/:id',(req,res)=>{
  let {id} = req.body;
  let status = 'Delivered'
  let itemid = req.params.id
  Order.update({
    id,
    status,
  },{
    where:{
      id: itemid
    }
  }).then(() =>{
    res.redirect('/payment/vieworder')
  }).catch(err=>console.log(err));
});

module.exports = router;