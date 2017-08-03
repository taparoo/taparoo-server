module.exports = {

  development: {
      client: 'pg',
      connection: 'postgresql://localhost/taparoo-db'
    },
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL
    }
};
