var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var matchPhone = [/^\d{10,12}$/,'invalid phone number!'],
    matchName = [/^[a-z ,.'-]+$/,'invalid name!'],
    match_email = [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'ivalid email!']


var customerSchema = new Schema({
  name: {type:String,require:true,match:matchName},
  username: {type:String,require:true,unique:true},
  password: {type:String,require:true},
  email: {type:String,require:true,unique:true,match:match_email},
  phone: {type:String,match:matchPhone}
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
