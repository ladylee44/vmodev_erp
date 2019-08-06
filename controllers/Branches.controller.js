const express = require("express");
const branches = require("../models/Branches.model");
const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {
  //show list branch
  list: (req, res, next) => {
    branches.findAll().then(branches => {
      res.status(200).send(branches);
    });
  },

  //delete branch by ID
  delete: (req, res, next) => {
    var id = req.params.id;
    branches
      .destroy({
        where: {
          id: id
        }
      })
      .then(branches => {
        if (branches) {
          res.json({
            message: "Delete success branch at ID "+id
          });
        } else {
          res.json({
            message: "ID of branch is not existed"
          });
        }
      })
      .catch(err => {
        res.json({
          message: err
        });
      });
  },

  //update branch by ID
  update: (req, res, next) => {
    var id = req.params.id;
    const updateBranch = {
      name: req.body.name,
      address: req.body.address,
      hotline: req.body.hotline,
      bossName: req.body.bossName,
      bossEmail: req.body.bossEmail,
      bosPhone: req.body.bosPhone,
      staffName: req.body.staffName,
      staffEmail: req.body.staffEmail,
      staffPhone: req.body.staffPhone,
      receptionName: req.body.receptionName,
      receptionEmail: req.body.receptionEmail,
      receptionPhone: req.body.receptionPhone,
      createdBy: req.body.createdBy,
      editedBy: req.body.editedBy,
      status: req.body.status
    };

    branches
      .update(updateBranch, {
        where: {
          id: id
        }
      })
      .then(updatedBranch => {
        if (updatedBranch == 0) {
          res.json({
            message: "ID is not existed"
          });
        } else {
          res.json({
            message: "Update success"
          });
        }
      })
      .catch(err => {
        console.log("Error in update branch " + err);
      });
  },

  // create new branch
  create: (req, res, next) => {
    const newBranch = {
      name: req.body.name,
      address: req.body.address,
      hotline: req.body.hotline,
      bossName: req.body.bossName,
      bossEmail: req.body.bossEmail,
      bossPhone: req.body.bossPhone,
      staffName: req.body.staffName,
      staffEmail: req.body.staffEmail,
      staffPhone: req.body.staffPhone,
      receptionName: req.body.receptionName,
      receptionEmail: req.body.receptionEmail,
      receptionPhone: req.body.receptionPhone,
      createdBy: req.body.createdBy,
      editedBy: req.body.editedBy,
      status: req.body.status
    };
    branches
      .create(newBranch)
      .then(branches => {
        if (branches) {
          res.json({
            message: "Create success",
            data: branches
          });
        } else {
          res.json({
            message: "Error in create new branch"
          });
        }
      })
      .catch(err => {
        res.send("Failed to create new branch \n" + err);
      });
  },

  // show detail a branch by ID
  search: (req, res, next) => {
    var id = req.params.id;
    branches
      .findOne({ where: { id: id } })
      .then(result => {
        if (!result) {
          res.json({
            message: "ID is not existed"
          });
        } else {
          res.json({
            branch: result
          });
        }
      })
      .catch(err => {
        res.send("Error in search branch " + err);
      });
  },

  //search branch by name
  searchByName: (req, res, next)=>{
    var name = req.body.name;
    branches.findAll({
      where:{
        name: {
          [Op.like]: '%'+name+'%'
        }
      }
    })
    .then(result =>{
      const count = result.length
      res.json({
        message: 'found '+count+' result',
        branchMatch: result
      })
    })
    .catch(err=>{
      res.json({
        message: 'Error '+err
      })
    })
  }
};
