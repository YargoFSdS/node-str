'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');

const app         = express();
const router = express.Router();

// conexão com o banco
mongoose.connect("mongodb://yargo:6tbkiwac@ds159263.mlab.com:59263/cursonodestore");

// Carega as models


// Carega as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',indexRoute );
app.use('/products',productRoute);

module.exports = app;