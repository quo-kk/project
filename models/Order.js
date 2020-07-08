const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Order = db.define('order',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING,
        defaultValue: "Received",
    },
});

module.exports = Order;