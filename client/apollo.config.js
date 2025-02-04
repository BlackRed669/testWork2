module.exports = {
    client: {
      service: {
        name: 'chatQuasar',
        // URL to the GraphQL API
        url: 'https://testwork2.onrender.com:4000/graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }