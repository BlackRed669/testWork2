const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Импортируйте вашу настройку sequelize

const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    timestamps: true,
});

module.exports = User;