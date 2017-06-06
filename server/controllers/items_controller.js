var mongoose = require('mongoose')
  , Item = require('../models/item')
mongoose.connect('mongodb://localhost/shopping-cart');

var getAllItems = (req,res) => {
    Item.find()
    .then(item =>{
      res.send(item)
    })
    .catch(err =>{
      res.send(err)
    })
}

var getItem = (req,res) => {
    Item.findById(req.params.id)
    .then(item =>{
      res.send(item)
    })
    .catch(err =>{
      res.send(err)
    })
}

var getItemByName = (req,res) =>{
  Item.find({name:req.params.name})
  .then(items =>{
    res.send(items)
  })
  .catch(err =>{
    res.send(err)
  })
}

var createItem = (req,res) => {

  let new_item = {
                    name:req.body.name,
                    price:req.body.price,
                    category:req.body.category,
                    tags:req.body.tags,
                    stock:req.body.stock
                 }

    Item.create(new_item)
    .then(item=>{
      res.send(item)
    })
    .catch(err =>{
      res.send(err)
    })
}

var updateItem = (req,res) => {
    Item.findById(req.params.id)
    .then(item =>{

      item.name = req.body.name || item.name

      item.save( (err, updated_item) => {
        if (err) res.send(err);
        res.send(updated_item);
      })
  });
}


var deleteItem = (req,res) => {
  item.findById(req.params.id)
  .then(item =>{

    item.remove((err, message) => {
      if (err) res.send(err);
      res.send(message);
    });
  })
  .catch(err =>{
    res.send(err)
  })
}



module.exports = {
  getAllItems:getAllItems,
  getItem:getItem,
  getItemByName:getItemByName,
  createItem:createItem,
  updateItem:updateItem,
  deleteItem:deleteItem
};
