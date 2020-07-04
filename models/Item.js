const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Item = db.define('item',{
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    price:{
        type:Sequelize.FLOAT,
    },
    itemdes:{
        type:Sequelize.STRING
    },
    otherinfo:{
        type:Sequelize.STRING
    },
    category:{
        type:Sequelize.STRING
    }
});

module.exports = Item;