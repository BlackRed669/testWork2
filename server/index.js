const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./sequelize.js');
const Messages = require('./models/message.js');
const { ApolloServer } = require('apollo-server');
const typeDefs = require("./schema/index.js");
const resolvers = require("./resolvers/index.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    methods: ['GET', 'POST']
  }
});

// Обработка подключения сокетов
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Пример отправки сообщения клиенту
  socket.emit('welcome', { message: 'Welcome to the server!' });

  // Обработка события от клиента
  socket.on('sendSMS', async (data) => {
    console.log('Received message:', data);

    let toId = data.toId;
    let content = data.value;
    let fromId = data.fromId;

    let result = await Messages.create({ toId, content, fromId });
    console.log(result);
    // Отправка ответа
    io.to("NoC6Y0dWLfEsdHzjAAAD").emit('getSMS', { message: `Server got your message: ${data}` });
  });

  // Обработка отключения клиента
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server webSocket is running on http://localhost:${PORT}`);
});

const serverApollo = new ApolloServer({ typeDefs, resolvers });

serverApollo.listen().then(({ url }) => {
  console.log(`Server http is running on ${url}`);
});