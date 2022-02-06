const mongoose = require('mongoose');

const SchoolsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  subdomain:{
    type: String,
    required: true,
    trim: true
  },
  publicKey:{
    type: String,
    required: true,
    trim: true
  },
  secretKey:{
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
  },
  registration: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('School', SchoolsSchema);