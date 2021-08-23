const {
  DB = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
  JWT_SECRET = 'my-super-duper-secret',
  NODE_ENV,
} = process.env;

module.exports = {
  DB, PORT, JWT_SECRET, NODE_ENV,
};
