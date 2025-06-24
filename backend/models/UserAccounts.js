const mongoose = require('mongoose');

const userAccountsSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

module.exports = mongoose.model('UserAccounts', userAccountsSchema);