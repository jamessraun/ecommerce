var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var itemSchema = new Schema({
  name: {type:String,required:true},
  price: {type:Number,required:true},
  category: {type:String,required:true},
  tags:[{type:String,required:true}],
  stock: {type:Number,required:true},
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
