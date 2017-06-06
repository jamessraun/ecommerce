  var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var cartSchema = new Schema({
  customer:{type:Schema.Types.ObjectId,ref:'Customer'},
  created_at: Date,
  updated_at: Date,
  item_list:[{ type: Schema.Types.ObjectId,ref: 'Book' }]
});

var Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
