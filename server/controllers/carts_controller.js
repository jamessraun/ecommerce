var mongoose = require('mongoose')
  , Cart = require('../models/cart')
  , Item= require('../models/item')

var getAllCarts = (req, res) => {

  Cart.find().populate('customer').exec((err, carts) => {
    res.send(carts)
  })

}

var createCart = (req, res) => {

  let booksId = req.body.booklist.split(',')

  let carts = {
    memberid: req.body.memberid,
    days: req.body.days,
    out_date: new Date(),
    due_date: date,
    booklist: booksId
  }

}

var updateCart = (req, res) => {
  cart.findById(req.params.id, (err, result) => {

    let booksId = result.booklist

    if (err) res.send(err)

    let fine = calculate_fine(result.due_date);
    result.in_date = new Date()
    result.fine = fine

    //increasing books' stock
      for(let i=0;i<booksId.length;i++){
        Book.findById(booksId[i],(err, result) => {
          if (err) res.send(err)
            result.stock=+result.stock+1
            result.save((err, updateBook) => {
              if (err) res.send(err);
            });
        })
      }
      //end of increasing books' stock

    result.save((err, updatedcart) => {
      if (err) res.send(err);
      res.send(updatedcart);
    });

  })
}

var deleteCart = (req, res) => {

  cart.findById(req.params.id, (err, cart) => {

    if (err) res.send(err);

    cart.remove((err, message) => {

      if (err) res.send(err);
      res.send(message);

    });
  });

}


module.exports = {
  getAllCarts:getAllCarts,
  createCart:createCart,
  updateCart:updateCart,
  deleteCart:deleteCart
};
