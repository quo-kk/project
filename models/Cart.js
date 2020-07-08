const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
const User = require('../models/User');
const Item = require('../models/Item');


const Cart = db.define('cart',{
    userId:{
        type: Sequelize.INTEGER,
        references:{
            model: User,
            key: 'id',
        },
        unique: 'user_product',
    },
    productId:{
        type: Sequelize.INTEGER,
        references:{
            model: Item,
            key: 'id',
        },
        unique: 'user_product',
    },
});

module.exports = Cart;