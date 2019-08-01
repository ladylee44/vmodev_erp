const express = require("express");
const card = require("../models/Cards.model");

module.exports = {
  // show list of cards
  list: (req, res, next) => {
    card
      .findAll()
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
  },

  // show detail a card by ID
  search: (req, res, next) => {
    var id = req.params.id;

    card
      .findOne({
        where: { id: id }
      })
      .then(detail => {
        res.json({
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
    card
      .create(newCard)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  },

  // update card by ID
  update: (req, res, next) => {
    var id = req.params.id;
    var updateCard = {
      customerID: req.body.customerID,
      type: req.body.type,
      totalPay: req.body.totalPay,
      createdBy: req.body.createdBy,
      editedby: req.body.editedBy,
      status: req.body.status
    };
    card
      .update(updateCard, {
        where: { id: id }
      })
      .then(data => {
        res.json({
          data
        });
      })
      .catch(err => {
        res.send("Error in update card " + err);
      });
  },

  //delete card by ID
  delete: (req, res, next) => {
    var id = req.params.id;
    card
      .destroy({
        where: { id: id }
      })
      .then(result => {
        if (!result) {
          res.json({
            message: "ID is not exist"
          });
        } else {
          res.json({
            message: "Delete success"
          });
        }
      })
      .catch(err => {
        res.send("Error in delete " + err);
      });
  }
};
