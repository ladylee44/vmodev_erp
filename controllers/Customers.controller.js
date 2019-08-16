const express = require("express");
const customer = require("../models/Customers.model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
var db = require("../configdb/configdb");

module.exports = {
  //show list of customer
  list: (req, res, next) => {
    customer
    .findAll()
    .then(customer => {
      res.send({
        list_customer:customer
      });
    })
    .catch(err => {
      res.send({
        message: "Error: "+ err
      });
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
      if(data==0){
        res.send({
          message: 'ID customer is not exist'
        })
      }else{
        res.send({
          message: "Delete customer by id success",
          Customer_id: id
        });
      }
      
    })
    .catch(err => {
      res.send({
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
        res.send({
          message: "ID of customer is not existed, please re-enter"
        });
      } else {
        res.send({
          detail_customer: detail
        });
      }
    })
    .catch(err => {
      res.send({
        message: "Error: "+ err
      });
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
          [Op.like]: "%" + name + "%"
        }
      }
    })
    .then(detail => {
      res.send({
        detail_customer: detail
      });
    })
    .catch(err => {
      res.send({
        message: "Error: "+ err
      });
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
      customer.create(newCustomer)
      .then(result => {
          new_customer: result
        });
    } else {
      res.send({
        message: "Invalid information of customer, please try again!"
      });
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
        res.send({
          message:'Update success'
        });
      } else {
        res.send("Failed to update");
      }
    })
    .catch(err => {
      res.send({
        message: "Error in update customer" + err
      });
    });
  },
  
  //pagination
  pagination: (req, res, next) => {
    var page = parseInt(req.params.page);
    var result = parseInt((page - 1) * 5);
    customer
    .findAndCountAll({
      offset: result,
      limit: 5
    })
    .then(result => {
      res.send({
        totalPage: Math.ceil(result.count / 5),
        data: result.rows
      });
    });
  }
};
