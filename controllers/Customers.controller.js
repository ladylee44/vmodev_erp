const express = require("express");
const customer = require("../models/Customers.model");
const Sequelize= require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  //show list of customer
  list: (req, res, next) => {
    customer
    .findAll()
    .then(customer => {
      res.send(customer);
    })
    .catch(err => {
      res.send(err);
    });
  },
  
  // delete customer by ID
  delete: (req, res, next) => {
    var id = req.params.id;
    
    customer
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
    customer
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
          detail
        });
      }
    })
    .catch(err => {
      res.send(err);
    });
  },
  
  //search customer by name
  searchByName: (req, res, next) => {
    var name = req.params.name;
    // console.log(name);
    customer
    .findAll({
      where: { 
        name: {
          [Op.like]: '%'+name+'%'
        }
      }
    })
    .then(detail => {
      const count = detail.length
      if (!detail) {
        res.json({
          message: "Cannot find!"
        });
      } else {
        res.status(200).json({
          // message: 'Find '+ count+ ' result',
          customerMatch: detail
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
    if (customer) {
      customer
      .create(newCustomer)
      .then(result => {
        res.json({
          customer: result
        });
      })
      .catch(err => {
        res.send("Error in create new customer " + err);
      });
    }else{
      res.json('Invalid information of customer, please try again!')
    }
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
    
    customer
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
  },
  
  //pagination
  pagination : (req, res, next)=>{
    var page = parseInt(req.params.page);
    var result = parseInt((page-1)*5);
    
    customer.findAll({offset: result, limit: 5})
    .then(data =>{
      res.json({
        customer: data
      });
    })
    .catch(err=>{
      res.json({
        message: 'Error: '+err
      })
    });
  }
};