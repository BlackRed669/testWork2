const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:12345@localhost:5432/chat'); // Замените на ваши данные

module.exports = sequelize;