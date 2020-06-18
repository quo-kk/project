const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const alertMessage = require('../helpers/messenger');

router.get('/payment', (req, res) => {
	res.render('payment/paymentform');
});

router.post('/createpayment', (req,res) => {
    let errors = [];
    let {fullname, email, address,  postalcode, ccfullname, cardno, expirymonth, expiryyear, cvv} = req.body;
    Payment.create({fullname, email, address,  postalcode, ccfullname, cardno, expirymonth, expiryyear, cvv})
		res.redirect('/payment/vieworder');
});

router.get('/vieworder', (req, res) => {
	res.render('payment/vieworder');
});

module.exports = router;