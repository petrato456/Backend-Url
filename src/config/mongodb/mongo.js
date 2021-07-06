require('dotenv').config();
const mongoose = require('mongoose');

console.debug(`conexão Mongo: ${process.env.DB_HOST}`);
mongoose.connect('mongodb://localhost/url-cut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = mongoose;