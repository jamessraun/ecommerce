var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');
var Customer = require('../models/customer')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


var getAllCustomers = (req,res) => {
    Customer.find()
    .then(customers =>{
      res.send(customers)
    })
    .catch(err =>{
      res.send(err)
    })
}

var createCustomer = (req,res) => {

    let new_customer = {
                      name:req.body.name,
                      username:req.body.username,
                      password:req.body.password,
                      email:req.body.email,
                      phone:req.body.phone,
                   }

    Customer.create(new_customer)
    .then(customer =>{
      res.send(customer)
    })
    .catch(err=>{
      res.send(err)
    })
}

var updateCustomer = (req,res) => {
  // customer.findById(req.params.id,(err, customer) => {
  //   if (err) res.send(err);
  //
  //   customer.name = req.body.name || customer.name
  //   customer.memberid = req.body.memberid || customer.memberid
  //   customer.address =req.body.address || customer.address
  //   customer.zipcode =req.body.zipcode || customer.zipcode
  //   customer.phone =req.body.phone || customer.phone
  //
  //   customer.save( (err, updatedcustomer) => {
  //     if (err) res.send(err);
  //     res.send(updatedcustomer);
  //   });
  // });
}


var deleteCustomer = (req,res) => {
  Customer.findById(req.params.id)
  .then(customer =>{
    Customer.remove((err, message) => {
      if (err) res.send(err);
      res.send(message);
    });
  })
  .catch(err =>{
    res.send(err)
  })
}

var signup = (req,res) => {
  var saltRounds=10;

  bcrypt.hash(req.body.password,saltRounds,(err,password)=>{
    console.log(password);
    let new_user = {
                      name:req.body.name,
                      username:req.body.username,
                      password:password,
                      email:req.body.email
                   }

      Customer.create(new_user)
      .then(item=>{
        res.send(item)
      })
      .catch(err =>{
        res.send(err)
      })
   })
}


var login = (req,res) => {
  Customer.findOne({username:req.body.username})
  .then(user => {
    console.log('asdf',user);
        bcrypt.compare(req.body.password, user.password).then(result => {
          if(result){
            let token = jwt.sign({id:user.id,name:user.name,username:user.username,email:user.email},'rahasiacoy')
            res.send({id:user.id,name:user.name,username:user.username,email:user.email})
          }
          else res.send('Failed')
      });
  })
}



module.exports = {
  getAllCustomers:getAllCustomers,
  createCustomer:createCustomer,
  updateCustomer:updateCustomer,
  deleteCustomer:deleteCustomer,
  signup:signup,
  login:login
};
