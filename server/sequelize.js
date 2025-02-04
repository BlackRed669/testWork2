const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://pavlishin:sxUm9fdgX3DfsjmlsvP7Uw1wiU2RwU0i@dpg-cugue1i3esus73fhktb0-a/chat_9t8u'); // Замените на ваши данные

module.exports = sequelize;