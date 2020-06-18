const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Payment = db.define('payment', { 	
	fullname: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	address: {
		type: Sequelize.STRING
	},
	postalcode: {
		type: Sequelize.STRING
    },
    ccfullname: {
		type: Sequelize.STRING
    },
    cardno: {
		type: Sequelize.STRING
    },
    expirymonth: {
		type: Sequelize.STRING
    },
    expiryyear: {
		type: Sequelize.STRING
    },
    cvv: {
		type: Sequelize.STRING
	},
});

module.exports = Payment;