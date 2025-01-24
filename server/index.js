const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./sequelize.js');
const { execute, subscribe } = require('graphql');
// const Messages = require('./models/message.js');
const { ApolloServer } = require('apollo-server');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const typeDefs = require("./schema/messagesSchema.js");
const resolvers = require("./resolvers/messagesResolvers.js");

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
  socket.on('message', async (data) => {
    console.log('Received message:', data);

    //let result = await Messages.create({ toId, content, fromId });
    console.log(result);
    // Отправка ответа
    socket.emit('response', { message: `Server got your message: ${data}` });
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
const httpServer = http.createServer(serverApollo);

serverApollo.listen().then(({ url }) => {
  new SubscriptionServer({
    execute,
    subscribe,
    typeDefs,
  }, {
    server: httpServer,
    path: '/graphql',
  });

  console.log(`Server http is running on ${url}`);
});