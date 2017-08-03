module.exports = {

  development: {
      client: 'pg',
      connection: 'postgresql://localhost/taperoo'
    },
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL
    }
};
