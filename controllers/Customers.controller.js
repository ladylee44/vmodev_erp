const express = require("express");
const Customer = require("../models/Customers.model");

module.exports = {
  //show list of customer
  list: (req, res, next) => {
    Customer
      .findAll()
      .then(customer => {
        res.status(200).json({
          status: 200,
          customer: customer
        });
      })
      .catch(err => {
        res.send(err);
      });
  },

  // delete customer by ID
  delete: (req, res, next) => {
    var id = req.params.id;

    Customer
      .destroy({
        where: {
          id: id
        }
      })
      .then(data => {
        res.json({
          message: "Delete customer by id success",
          data
        });
      })
      .catch(err => {
        res.json({
          message: "Error in delete customer by id " + err
        });
      });
  },

  // show detail a customer by ID
  search: (req, res, next) => {
    var id = req.params.id;
    Customer
      .findOne({
        where: { id: id }
      })
      .then(detail => {
        if (!detail) {
          res.json({
            message: "ID of customer is not existed, please re-enter"
          });
        } else {
          res.json({
            status: 200,
            customer: detail
          });
        }
      })
      .catch(err => {
        res.send(err);
      });
  },

  // create a new customer
  create: (req, res, next) => {
    var newCustomer = {
      name: req.body.name,
      dob: req.body.dob,
      gender: req.body.gender,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      createdBy: req.body.createdBy,
      editedBy: req.body.editedBy,
      status: req.body.status
    };

    Customer
      .create(newCustomer)
      .then(result => {
        res.json({
          customer: result
        });
      })
      .catch(err => {
        res.send("Error in create new customer " + err);
      });
  },

  // update a customer by ID
  update: (req, res, next) => {
    var id = req.params.id;
    var updateCustomer = {
      name: req.body.name,
      dob: req.body.dob,
      gender: req.body.gender,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      createdBy: req.body.createdBy,
      editedBy: req.body.editedBy,
      status: req.body.status
    };

    Customer
      .update(updateCustomer, {
        where: { id: id }
      })
      .then(result => {
        if (result) {
          res.json("Update success");
        } else {
          res.json("Failed to update");
        }
      })
      .catch(err => {
        res.json({
          message: "Error in update customer" + err
        });
      });
  }
};
