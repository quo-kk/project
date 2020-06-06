const express = require('express');
const router = express.Router();
var mysql = require('mysql');
const nodemailer = require('nodemailer');

router.get('/email', (req,res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'koelkheng@gmail.com',
            pass: 'koelkheng711'
        }
    });
    var mailOptions = {
        from: 'koelkheng@gmail.com',
        to: 'koel_kheng@hotmail.com',
        subject: 'Successful Order',
        text: 'Your order was successful, more soon!'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.redirect('/');
        }
    });
});

module.exports = router;