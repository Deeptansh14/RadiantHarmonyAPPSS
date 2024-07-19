const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  access_token: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  scope: String,
  token_type: String,
  expiry_date: Number,
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
