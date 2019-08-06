const Contracts = require("../models/Contracts.model");
const Employees = require("../models/Employees.model");

// contract.get('/contract/:contractid', controller.findContractByID);
// contract.post('/contract', controller.createContract);
// contract.put('/contract/:contractid', controller.updateContract);
// contract.delete('/contract/:contractid', controller.deleteContract);

// find contract by employeeID
module.exports.findContractByID = (req, res, next) => {
  console.log("Contract Detail");
  Contracts.findOne({
    include: [Employees],
    where: {
      employeeID: req.params.contractid
    }
  })
    .then(contract => {
      if (contract) {
        res.status(200).json({
          status: 200,
          contract: contract
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
          status: 201,
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
      res.status(201).json({
        status: 201,
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
