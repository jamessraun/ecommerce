var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var book =  require('./routes/book');
var customer =  require('./routes/customer');
var transaction = require('./routes/transaction');
var index = require('./routes/index')
var cors = require('cors')
var app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use('/items',book)
app.use('/customers',customer)
app.use('/carts',transaction)
app.use('/',index)

app.listen(3000)
