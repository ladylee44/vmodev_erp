const Services = require("../models/Services.model");
const ServiceDetails = require("../controllers/ServiceDetails.controller");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("./../configdb/configdb");

// services.get('/services', controller.listServices);

// services.put('/services/:serviceid', controller.updateService);
// services.delete('/services/:serviceid', controller.deleteService);

// List services
module.exports.listServices = (req, res, next) => {
  console.log("List service");
  // ServiceDetails.findAll()
  // .then(results=>{

  // })
  Services.findAll()
    .then(service => {
      res.status(200).json({
        status: 200,
        listService: service
      });
    })
    .catch(err => {
      // res.status(400).json({
      //     status: 400,
      //     msg: 'Err listing service'
      // })
      console.log(err);
      res.send("Error listing service: " + err);
    });
};
// module.exports.listServices = (req, res, next)=>{
//     console.log('List service');

//     let sql = "SELECT services.id, branches.name AS branchName, services.name AS serviceName, services.description, service_details.materialPrice, service_details.payToEmployee, service_details.customerPay, services.createdBy, services.editedBy, services.createdAt, services.editedAt, services.status FROM services INNER JOIN service_details ON services.id = service_details.serviceID INNER JOIN branches ON services.branchID = branches.id";

//     db.query(sql, {
//         type: db.QueryTypes.SELECT
//     })
//     .then(result =>{
//         res.json({
//             status: 200,
//             listService: result
//         })
//     })
//     .catch(err=>{
//         res.send('Err listing service: '+ err);
//     })
// }
// List services by ID
module.exports.findService = (req, res, next) => {
  console.log("Find Service by ID");
  Services.findAll()
    .then(service => {
      if (service) {
        res.status(200).json({
          status: 200,
          service: service
        });
      } else {
        res.status(404).json({
          status: 400,
          msg: "Service not found"
        });
      }
    })
    .catch(err => {
      // res.status(400).json({
      //     status: 400,
      //     msg: err
      // })
      console.log("Cannot find service by ID: " + err);
      res.send("Cannot find service by ID: " + err);
    });
};

// services.get('/services/searchServices', controller.searchServicesByName);
//find by name
module.exports.searchServicesByName = (req, res, next) => {
  const name = req.body.name;
  Services.findAll({
    where: [
      {
        name: {
          [Op.like]: "%" + name + "%"
        }
      }
    ]
  })
    .then(results => {
      if (results.length != 0) {
        // console.log(results)
        res.status(200).json({
          status: 200,
          results: results
        });
      } else {
        res.status(404).json({
          status: 404,
          msg: "No result"
        });
      }
    })
    .catch(err => {
      // res.status(400).json({
      //     status: 400,
      //     msg: 'Cannot find employee '
      // })
      console.log("Can not find employee: " + err);
      res.send("Cannot search service: " + err);
    });
};

// services.post('/services', controller.addService);
// create new service
module.exports.addService = (req, res, next) => {
  console.log("Add new service");
  const newService = {
    branchID: req.body.branchID,
    name: req.body.name,
    description: req.body.description,
    createdBy: req.body.createdBy,
    editedBy: req.body.editedBy,
    createdAt: req.body.createdAt,
    editedAt: req.body.editedAt,
    status: req.body.status
  };

  Services.create(newService)
    .then(newService => {
      res.status(201).json({
        status: "Create successfully",
        newService: newService
      });
    })
    .catch(err => {
      // res.status(400).json({
      //     status: 400,
      //     msg: 'Cannot create new service'
      // });
      console.log("Err: " + err);
      res.send("Cannot create new service: " + err);
    });
};

// update Service
module.exports.updateService = (req, res, next) => {
  console.log("Updating service ...");
  const updateService = {
    branchID: req.body.branchID,
    name: req.body.name,
    description: req.body.description,
    createdBy: req.body.createdBy,
    editedBy: req.body.editedBy,
    createdAt: req.body.createdAt,
    editedAt: req.body.editedAt,
    status: req.body.status
  };
  Services.update(updateService, {
    where: {
      id: req.params.serviceid
    }
  })
    .then(service => {
      if (service) {
        res.status(200).json({
          status: "Update successfully",
          updateService: updateService
        });
      } else {
        res.status(404).json({
          status: 404,
          msg: "Service not found"
        });
        console.log("Service not found");
      }
    })
    .catch(err => {
      res.status(400).json({
        status: 400,
        msg: "Cannot update service"
      });
      console.log(err);
      res.send("Cannot update service: " + err);
    });
};

// delete service
module.exports.deleteService = (req, res, next) => {
  console.log("Deleting...");
  Services.destroy({
    where: {
      id: req.params.serviceid
    }
  })
    .then(service => {
      if (service) {
        res.status(200).json({
          status: 200,
          msg: "Delete service successfully"
        });
      } else {
        res.status(404).json({
          status: 404,
          msg: "Service not found"
        });
        console.log("Service not found");
      }
    })
    .catch(err => {
      // res.status(400).json({
      //     status: 400,
      //     msg: 'Cannot delete service'
      // });
      console.log("Err: " + err);
      res.send("Cannot delete service: " + err);
    });
};

module.exports.pagination = (req, res, next) => {
  var page = parseInt(req.params.page);
  var result = parseInt((page - 1) * 5);

  Services.findAll({ offset: result, limit: 10 })
    .then(data => {
      res.json({
        service: data
      });
    })
    .catch(err => {
      res.send("Err: " + err);
    });
};
