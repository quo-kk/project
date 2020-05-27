const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Item = db.define('item',{
    name:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.STRING
    },
    itemdes:{
        type:Sequelize.STRING
    },
    otherinfo:{
        type:Sequelize.STRING
    },
});

module.exports = Item;