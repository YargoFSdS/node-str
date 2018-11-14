'use strict';

const mongoose = require('mongoose');
 //const Product  = mongoose.model('Product'); 
var Product = require('./../models/product.js');

var ValidationContract = require('../validators/fluent-validator');

exports.post = (req,res,next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title,3,'O titulo deve ter pelo menos 3 caracters');
    contract.hasMinLen(req.body.slug,3,'O titulo deve ter pelo menos 3 caracters');
    contract.hasMinLen(req.body.description,3,'O titulo deve ter pelo menos 3 caracters');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
    }

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
        .find({ //.find({titie:'xpto', descri: 'computador'})
            active: true
        })
        .then(data =>{ 
            res.status(200).send(data);
        }).catch(e => {
            res.status(401).send(e);
        });     
}

exports.getBySlug = (req,res,next) => {
    Product
        .findOne({ //.find({titie:'xpto', descri: 'computador'})
            slug: req.params.slug,
            active: true
        },'title description price slug')
        .then(data =>{ 
            res.status(200).send(data);
        }).catch(e => {
            res.status(401).send(e);
        });     
}



exports.getById = (req,res,next) => {
    Product
        .findById({ //.find({titie:'xpto', descri: 'computador'})
            _id: req.params.id
        })
        .then(data =>{ 
            res.status(200).send(data);
        }).catch(e => {
            res.status(401).send(e);
        });     
}

exports.getByTag = (req,res,next) => {
    Product
        .find({ //.find({titie:'xpto', descri: 'computador'})
            tags: req.params.tag
        })
        .then(data =>{ 
            res.status(200).send(data);
        }).catch(e => {
            res.status(401).send(e);
        });     
}

exports.put = (req,res,next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: { 
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then(x => {
            res.status(200).send({
                message: 'Produto atualizado com Sucesso!'
            });

        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar Produto!'
            });
        });
};

exports.delete = (req,res,next) => {
    Product
        .findOneAndRemove(req.body.id, {            
        }).then(x => {
            res.status(200).send({
                message: 'Produto ecluido com Sucesso!'
            });

        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao excluir Produto!'
            });
        });
};
// dont forget mlab.com