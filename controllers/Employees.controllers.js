const Employees = require("../models/Employees.model");
const Branches = require('./../models/Branches.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// employees.get('/employee', controller.employeeList);
// employees.get('/employee/findByID/:employeeid', controller.findEmployee);
// employees.get('/employee/searchEmployee', controller.searchEmployeesByName);
// employees.post('/employee', controller.addEmployee);
// employees.put('/employee/:employeeid', controller.updateEmployee);
// employees.delete('/employee/:employeeid', controller.deleteEmployee);

// list employees
// json example
module.exports.employeeList = (req, res, next) => {
  console.log("List Employees");
  Employees.findAll({
    include: [{
      model: Branches,
      attributes: ['name'] 
    }]
  })
    .then(empls => { 
      const arrEmpl =  empls.map(empl =>{
          return {
            id: empl.id,
            branch: empl.branch['name'],
            name: empl.name,
            dob: empl.dob,
            gender: empl.gender,
            address: empl.address,
            idCard: empl.idCard, 
            email: empl.email, 
            role: empl.role,
            imageUrl: empl.imageUrl,
            createdBy: empl.createdBy,
            editedBy: empl.editedBy,
            createdAt: empl.createdAt,
            editedAt: empl.editedAt,
            status: empl.status
          }
        });
      // console.log(arr);
        // res.status(200).json({
        //   status: 200,
        //   listEmployee: arrEmpl
        // });
        res.status(200).send(arrEmpl);
    })
    .catch(err => {
      res.send("Error listing err: " + err);
    });
};
// find employee by ID
module.exports.findEmployee = (req, res, next) => {
  Employees.findOne({
    include: [{
      model: Branches,
      attributes: ['name'] 
    }],
    where: {
      id: req.params.employeeid
    }
  })
    .then(empl => {
      // console.log(empl['branchID']);
      if (empl) {
        res.status(200).json({
          status: 200,
          employee: {
            id: empl['id'],
            branch: empl['branch'].name,
            name: empl['name'],
            dob: empl['dob'],
            gender: empl['gender'], 
            address: empl['address'],
            idCard: empl['idCard'], 
            email: empl['email'],
            role: empl['role'],
            imageUrl: empl['imageUrl'],
            createdBy: empl['createdBy'],
            editedBy: empl['editedBy'],
            createdAt: empl['createdAt'],
            editedAt: empl['editedAt'],
            status: empl['status']
          }
          // employee: empl['branch']
        });
      } else {
        res.send("Employee not found");
      }
    })
    .catch(err => {
      res.send("Cannot find employee: " + err);
      console.log('Cannot find employee');
    });
};

module.exports.searchEmployeesByName = (req, res, next)=>{
  const name = req.body.name;
  Employees.findAll({
    where: [{
      name:{
        [Op.like]:'%'+name+'%'
      }
    }]
  })
  .then(results=>{
    if(results){
      // console.log(results);
      res.status(200).json({
        status: 200,
        results: results
      })
    } else {
      res.status(404).json({
        status: 404,
        msg: 'No result'
      })
    }
  })
  .catch(err=>{
    // res.status(400).json({
    //   status: 400,
    //   msg: 'Cannot find employee '
    // })
    res.send('Cannot find employee: ' + err);
    console.log('Cannot find employee: ' + err);
  })
}
// add new employee
module.exports.addEmployee = (req, res, next) => {
  console.log("Add new employee");
  const newEmpl = {
    branchID: req.body.branchID,
    name: req.body.name,
    dob: req.body.dob,
    gender: req.body.gender,
    address: req.body.address,
    idCard: req.body.idCard,
    email: req.body.email,
    role: req.body.role,
    imageUrl: req.body.imageUrl,
    createdBy: req.body.createdBy,
    editedBy: req.body.editedBy,
    createdAt: req.body.createdAt,
    editedAt: req.body.editedAt,
    status: req.body.status
  };

  Employees.create(newEmpl)
    .then(newEmpl => {
      res.status(201).json({
        status: 201,
        newEmployee: newEmpl
      });
    })
    .catch(err => {
      console.log("Cannot add new employee: " + err);
      res.send("Cannot add new employee: " + err);
    });
};

// update Employee
module.exports.updateEmployee = (req, res, next) => {
  console.log("Updating employee ...");
  const updateEmployee = {
    branchID: req.body.branchID,
    name: req.body.name,
    dob: req.body.dob,
    gender: req.body.gender,
    address: req.body.address,
    idCard: req.body.idCard,
    email: req.body.email,
    role: req.body.role,
    imageUrl: req.body.imageUrl,
    createdBy: req.body.createdBy,
    editedBy: req.body.editedBy,
    createdAt: req.body.createdAt,
    editedAt: req.body.editedAt,
    status: req.body.status
  };
  Employees.update(updateEmployee, {
    where: {
      id: req.params.employeeid
    }
  })
    .then(() => {
      res.status(201).json({
        status: 201,
        updateEmployee: updateEmployee
      });
    })
    .catch(err => {
      console.log("Error updating");
      res.send("Cannot update employee: " + err);
    });
};

// delete Employee
module.exports.deleteEmployee = (req, res, next) => {
  console.log("Deleting ...");
  Employees.destroy({
    where: {
      id: req.params.employeeid
    }
  })
    .then(() => {
      res.status(200).json({
        status: "Delete successfully"
      });
    })
    .catch(err => {
      console.log("Error Delete");
      res.send('Cannot delete employee' + err);
    });
};

