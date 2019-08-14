const express = require("express");
const customer = require("../models/Customers.model");
const Sequelize= require('sequelize');
const Op = Sequelize.Op;
var db = require('../configdb/configdb');

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
      if(data != 0){
        res.json({
          status: "Delete successfully"
        });
      } else {
        res.json({
          msg: "Customer not found"
        });
      }
      
    })
    .catch(err => {
      res.json({
        msg: "Error in delete customer by id " + err
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
          msg: "ID of customer is not existed, please re-enter"
        });
      } else {
        res.json({
          customer: detail
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
    .then(results => {
      if(detail != 0){
        res.json({
          data: results
        })
      } else {
        res.json({
          msg: 'No result'
        })
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
          customer: newCustomer
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
      if (result!=0) {
        res.json({
          status: "Update success",
          customer: updateCustomer
        });
      } else {
        res.json({
          status: 404,
          msg: "Customer not found"
        });
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
    customer.findAndCountAll({
      offset: result,
      limit: 5
    })
    .then(result => {
      res.send({
        totalPage: Math.ceil(result.count/5),
        data: result.rows
      })
      
    });
  }
};