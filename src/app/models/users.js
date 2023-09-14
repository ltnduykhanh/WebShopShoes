require('dotenv').config();
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-generator');
// const slug = require('mongoose-slug-updater');
// const mongooseDelete = require('mongoose-delete');

const User = new Schema({
    name: {type: String, require: true},
    email:{type: String, require: true},
    phone:{type: String, require: true},
    password:{type: String, require: true},
  },{
    timestamps:true,
  });

User.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

// mongoose.plugin(slug);

// Collection.plugin(mongooseDelete, { 
//   deletedAt: true,
//   overrideMethods: 'all' 
// })

module.exports = mongoose.model('User', User);