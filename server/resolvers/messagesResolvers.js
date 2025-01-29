const Messages = require('../models/message.js');

module.exports =  {
  Query: {
    messages: async (_, { toId }) => {

      return Messages.findAll({
        where: {
          toId: toId,
        },
        order: [['createdAt', 'DESC']],
      });
    },
  },
  Mutation: {
    sendMessage: async (_, { content, userId }, { pubsub }) => {
      const message = await Messages.create({ content, userId });
      pubsub.publish('MESSAGE_SENT', { messageSent: message });
      return message;
    },
  },
};