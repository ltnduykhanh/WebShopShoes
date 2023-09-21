require('dotenv').config();
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String, require: true},
    email:{type: String, require: true},
    phone:{type: String, require: true},
    password:{type: String, require: true},
  },{
    timestamps:true,
  });

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
