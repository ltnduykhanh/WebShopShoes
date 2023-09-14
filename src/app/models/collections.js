const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-generator');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Collection = new Schema({
    name: {type: String, require: true},
    price: {type:String},
    color:{type:String},
    colorEn:{type:String},
    heelHeight: {type: String},
    leatherMaterial:{type: String},
    liningLeatherMaterial: {type: String},
    soleLeatherMaterial:{type:String},
    image1: {type: String},
    image2: {type: String},
    image3: {type: String},
    image4: {type: String},
    image5: {type: String},
    slug: { type: String, slug: 'name', unique: 'true'},
  },{
    timestamps:true,
  });

mongoose.plugin(slug);

Collection.plugin(mongooseDelete, { 
  deletedAt: true,
  overrideMethods: 'all' 
})

module.exports = mongoose.model('Collection', Collection);