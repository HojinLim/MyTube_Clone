module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: process.env.DB_CLIENT,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
      },
      options: {
        useNullAsDefault: true,
        // pool:{
        //   min:0,
        //    max:50,
        //     idleTimeoutMillis:30000,
        //     createTimeoutMillis:30000,
        //    acquireTimeoutMillis:30000
        // }
      },
    },
  },
});
