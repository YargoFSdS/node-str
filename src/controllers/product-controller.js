'use strict';

const mongoose = require('mongoose');
 //const Product  = mongoose.model('Product'); 
var Product = require('./../models/product.js');

exports.post = (req,res,next) => {
    //res.status(200).send(req.body); // 200 ok 201 create 400 bad request 401 nao autenticado 403 acesso negado 500 internal server error
    var product = new Product(req.body);
    // product.title = req.body.title;   
    product.save((err) => {
             if(err){ 
                res.status(400).send({ message:'Erro ao cadastrar', data:err 
            }); 
            }else{
                res.status(201).send({ message:'Ok' });
            }
    });
};

exports.get = (req,res,next) => {
    Product
        .find({})
        .then(data =>{ 
            res.status(200).send(data);
        }).catch(e => {
            res.status(401).send(e);
        });     
}

exports.put = (req,res,next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id, 
        item: req.body 
     }); // 200 ok 201 create 400 bad request 401 nao autenticado 403 acesso negado 500 internal server error
};

exports.delete = (req,res,next) => {
    const id = req.params.id;
    res.status(200).send(req.body); // 200 ok 201 create 400 bad request 401 nao autenticado 403 acesso negado 500 internal server error
};
// dont forget mlab.com