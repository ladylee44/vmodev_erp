const Services = require('../models/Services.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// List services
module.exports.listServices = (req, res, next)=>{
    console.log('List service');
    Services.findAll()
        .then(service=>{
            res.status(200).json({
                status: 200,
                listService: service
            })
        })
        .catch(err=>{
            res.status(400).json({
                status: 400,
                msg: 'Err listing service'
            })
            console.log(err);
        })
}

// List services by ID
module.exports.findService = (req, res, next)=>{
    console.log('Find Service by ID');
    Services.findOne({
        where: {
            id: req.params.serviceid
        }
    })
    .then(service=>{
        if(service){
            res.status(200).json({
                status: 200,
                service: service
            })
        } else {
            res.status(404).json({
                status: 400,
                msg: 'Service not found'
            })
        }
    })
    .catch(err=>{
        res.status(400).json({
            status: 400,
            msg: err
        })
    })
}

//find by name 
module.exports.searchServicesByName = (req, res,next)=>{
    const name = req.body.name;
    Services.findAll({
        where:[{
            name: {
                [Op.like]:'%' + name + '%'
            }
        }]
    })
    .then(results=>{
        if(results.length != 0){
            // console.log(results)
            res.status(200).json({
                status: 200,
                results:results
            })
        } else {
            res.status(404).json({
                status: 404,
                msg: 'No result'
            })
        }
    })
    .catch(err=>{
        res.status(400).json({
            status: 400,
            msg: 'Cannot find employee '
        })
        console.log('Can not find employee: ' + err)
    })
}

module.exports.addService = (req, res, next)=>{
    console.log('Add new service');
    const newService = {
        branchID: req.body.branchID,
        name: req.body.name,
        description: req.body.description,
        createdBy: req.body.createdBy,
        editedBy: req.body.editedBy,
        createdAt: req.body.createdAt,
        editedAt: req.body.editedAt,
        status: req.body.status
    }

    Services.create(newService)
        .then(newService=>{
            res.status(200).json({
                status: 200,
                newService: newService
            })
        })
        .catch(err=>{
            res.status(400).json({
                status: 400,
                msg: 'Cannot create new service' 
            });
            console.log("Err: " + err);
        })
}

// update Service
module.exports.updateService = (req, res, next)=>{
    console.log('Updating service ...');
    const updateService = {
        branchID: req.body.branchID,
        name: req.body.name,
        description: req.body.description,
        createdBy: req.body.createdBy,
        editedBy: req.body.editedBy,
        createdAt: req.body.createdAt,
        editedAt: req.body.editedAt,
        status: req.body.status
    }
    Services.update(updateService, {
        where: {
            id: req.params.serviceid
        }
    })
    .then(service=>{
        if(service){
            res.status(200).json({
                status: 200,
                updateService: updateService
            })
        }else{
            res.status(404).json({
                status: 404,
                msg: 'Service not found'
            });
            console.log('Service not found');
        }
    })
    .catch(err=>{
        res.status(400).json({
            status: 400,
            msg: 'Cannot update service'
        })
        console.log(err);
    })
}

// delete service
module.exports.deleteService = (req, res, next)=>{
    console.log('Deleting...');
    Services.destroy({
        where: {
            id:req.params.serviceid
        }
    })
    .then(service=>{
        if(service){
            res.status(200).json({
                status: 200, 
                msg: 'Delete service successfully'
            })
        } else {
            res.status(404).json({
                status:404,
                msg: 'Service not found'
            });
            console.log('Service not found');
        }
    })
    .catch(err=>{
        res.status(400).json({
            status: 400,
            msg: 'Cannot delete service'
        });
        console.log("Err: " + err)
    })
}
