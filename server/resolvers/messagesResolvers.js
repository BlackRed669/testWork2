const Messages = require('../models/message.js');

const resolvers = {
    Query: {
      messages: async (_, { toId }) => { //, sortBy, order
        // const orderClause = sortBy ? [[sortBy, order === 'ASC' ? 'ASC' : 'DESC']] : [];
  
        const whereClause = toId ? { toId } : {};
  
        const messages = await Messages.findAll({
          where: {
            toId: whereClause
          },
        //   order: orderClause,
        });
  
        return messages;
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

  module.exports = resolvers;