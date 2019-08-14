const express = require("express");
const card = require("../models/Cards.model");
const customer = require('../models/Customers.model');

module.exports = {
  // show list of cards
  list: (req, res, next) => {
    card
<<<<<<< HEAD
      .findAll()
      .then(card => {
        if (card == 0) {
          res.json({
            msg: "No card existed in databse"
          });
        } else {
          res.json({
            card
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
=======
    .findAll({
      include: [{
        model: customer,
        attributes: ['name', 'dob', 'gender']
      }]
    })
    .then(card => {
      if (!card) {
        res.send("No card existed in databse");
      } else {
        res.json({
          card
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
>>>>>>> 8aead691498ef7e3f69e9b868a135627e91ee474
  },
  
  // show detail a card by ID
  search: (req, res, next) => {
    var id = req.params.id;
    
    card
    .findOne({
      where: { id: id }
    })
    .then(detail => {
      res.send({
        detail
      });
    })
    .catch(err => {
      res.send(err);
    });
  },
  
  // create a new card
  create: (req, res, next) => {
    var newCard = {
      customerID: req.body.customerID,
      type: req.body.type,
      totalPay: req.body.totalPay,
      createdBy: req.body.createdBy,
      editedBy: req.body.editedBy,
      status: req.body.status
    };
<<<<<<< HEAD
    card
      .create(newCard)
      .then(newCard=> {
        res.json({
          status: 201,
          data: newCard
        });
      })
      .catch(err => {
        res.send(err);
      });
=======
    card.create(newCard)
    .then(data => {
      if(data==0){
        res.send('Error in create new card')
      }else{
        res.send(data)
      }
    })
    .catch(err => {
      res.send(err.message);
    });
>>>>>>> 8aead691498ef7e3f69e9b868a135627e91ee474
  },
  
  // update card by ID
  update: (req, res, next) => {
    var id = req.params.id;
    var updateCard = {
      customerID: req.body.customerID,
      type: req.body.type,
      totalPay: req.body.totalPay,
      createdBy: req.body.createdBy,
      editedBy: req.body.editedBy,
      status: req.body.status
    };
<<<<<<< HEAD
    card
      .update(updateCard, {
        where: { id: id }
      })
      .then(card => {
        if(card != 0){
          res.json({
            status: 'Update successfully',
            data: updateCard
          });
        } else {
          res.json({
            status: 404,
            msg: 'Card not found'
          })
        }
      })
      .catch(err => {
        res.send("Error in update card " + err);
=======
    card.update(updateCard, {
      where: { id: id }
    })
    .then(data => {
      res.send({
        data
>>>>>>> 8aead691498ef7e3f69e9b868a135627e91ee474
      });
    })
    .catch(err => {
      res.send("Error in update card " + err);
    });
  },
  
  //delete card by ID
  delete: (req, res, next) => {
    var id = req.params.id;
<<<<<<< HEAD
    card
      .destroy({
        where: { id: id }
      })
      .then(result => {
        if (!result) {
          res.json({
            message: "Card ID is not exist"
          });
        } else {
          res.json({
            message: "Delete successfully"
          });
        }
      })
      .catch(err => {
        res.send("Error in delete " + err);
      });
=======
    card.destroy({
      where: { id: id }
    })
    .then(result => {
      if (!result) {
        res.send({
          message: "ID is not exist"
        });
      } else {
        res.send({
          message: "Delete success"
        });
      }
    })
    .catch(err => {
      res.send("Error in delete " + err);
    });
>>>>>>> 8aead691498ef7e3f69e9b868a135627e91ee474
  }
};
