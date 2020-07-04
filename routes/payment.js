const express = require('express');
const router = express.Router();

const alertMessage = require('../helpers/messenger');
const stripe = require("stripe")("sk_test_51H0n7DFaCcHVGhNjRJ3ea4lRVT3ACDeOuiVKoacwVsPELhMkJ13WWFKdWKW6Jk5a2ZvcAEfcRrNdIkIPRjOOySGz00tW8kJMuC");
const bodyParser = require("body-parser");
const { raw } = require('body-parser');

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
  res.redirect('/payment/paysuccess')
});

router.get('/vieworder', (req, res) => {
  res.render('payment/vieworder');
});

module.exports = router;