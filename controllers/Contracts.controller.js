const Contracts = require("../models/Contracts.model");
const Employees = require("../models/Employees.model");

module.exports.listContract = (req, res, next)=>{
  console.log('List contract');
  Contracts.findAll({
    include: [{
      model: Employees,
      attributes: ['id', 'name', 'dob', 'gender', 'address', 'idCard', 'email', 'role']
    }]
  })
  .then(contract=>{
    if(contract != 0){
      res.json(contract);
    } else {
      res.json('Contract not found');
    }
  })
  .catch(err=>{
    res.send('Error listing contract: '  + err);
  })

}
// find contract by employeeID
module.exports.findContract = (req, res, next) => {
  console.log("Contract Detail");
  Contracts.findOne({
    include: [{
      model: Employees,
      attributes: ['id', 'name', 'dob', 'gender', 'address', 'idCard', 'email', 'role']
    }],
    where: {
      id: req.params.contractid
    }
  })
    .then(contract => {
      if (contract) {
        res.status(200).json({
          status: 200,
          contract: {
            id: contract['id'],
            employee: {
              EmployeeID: contract['employee'].id,
              name: contract['employee'].name,
              dob: contract['employee'].dob,
              gender: contract['employee'].gender,
              address: contract['employee'].address,
              idCard: contract['employee'].idCard,
              email: contract['employee'].email,
              role: contract['employee'].role
            },
            applyFrom: contract['applyFrom'],
            salary: contract['salary'],
            createdBy: contract['createdBy'],
            editedBy: contract['editedBy'],
            createdAt: contract['createdAt'],
            editedAt: contract['editedAt'],
            status: contract['status']

          }
        });
      } else {
        res.json({
          status: "Contract not found"
        });
      }
    })
    .catch(err => {
      res.send("Err " + err);
    });
};

// create new contract
module.exports.createContract = (req, res, next) => {
  const newContract = {
    employeeID: req.body.employeeID,
    type: req.body.type,
    applyFrom: req.body.applyFrom,
    salary: req.body.salary,
    createdBy: req.body.createdBy,
    editedBy: req.body.editedBy,
    createAt: req.body.createAt,
    editedAt: req.body.editedAt,
    status: req.body.status
  };
  
  Contracts.create(newContract)
    .then(newContract => {
      if (newContract) {
        res.status(201).json({
          status: 'Create contract successfully',
          newContract: newContract
        });
      }
    })
    .catch(err => {
      // res.status(400).json({
      //   status: 400,
      //   msg: "Cannot create new contract"
      // });
      console.log("Cannot create new contract");
      res.send("Cannot create new contract: "+ err);
    });
};

// update Contract
module.exports.updateContract = (req, res, next) => {
  console.log("Updating contract ... ");
  const updateContract = {
    employeeID: req.body.employeeID,
    type: req.body.type,
    applyFrom: req.body.applyFrom,
    salary: req.body.salary,
    createdBy: req.body.createdBy,
    editedBy: req.body.editedBy,
    createAt: req.body.createAt,
    editedAt: req.body.editedAt,
    status: req.body.status
  };
  Contracts.update(updateContract, {
    where: {
      id: req.params.contractid
    }
  })
    .then(() => {
      res.status(200).json({
        status: 'Update contract successfully',
        updateContract: updateContract
      });
    })
    .catch(err => {
      console.log("Error updating: " + err);
      res.send("Cannot update contract: "+ err);
    });
};

module.exports.deleteContract = (req, res, next) => {
  console.log("Deleting...");
  Contracts.destroy({
    where: {
      id: req.params.contractid
    }
  })
    .then(() => {
      res.status(200).json({
        status: "Delete successfully"
      });
    })
    .catch(err => {
      console.log("Err Delete" + err);
      res.send('Cannot delete contract: ' + err);
    });
};
