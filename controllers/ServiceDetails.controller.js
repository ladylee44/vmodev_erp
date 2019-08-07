const ServiceDetails = require('../models/ServiceDetails.model');
const Services = require('../models/Services.model');


module.exports.listServiceDetails = (req, res, next)=>{
    console.log('List Service Details');
    ServiceDetails.findAll({
        include:[{
            model: Services,
            attributes: ['name', 'description', 'createdBy', 'editedBy', 'createdAt', 'editedAt', 'status']
        }]
    })
    .then(serviceDetails=>{
        if(serviceDetails){
            res.status(200).json({
                status: 200,
                serviceDetails: serviceDetails
            })
        } else {
            res.status(404).json({
                status: 404,
                msg: 'Service not found'
            });
            console.log('Service not found');
        }
    })
    .catch(err=>{
        console.log('Err' + err);
        res.send("Cannot find service details: " +  err);
    })
}
module.exports.findServiceDetails = (req, res, next) =>{
    console.log('Service Detail');
    ServiceDetails.findOne({
        include: [{
            model: Services,
            attributes: ['name', 'description', 'createdBy', 'editedBy', 'createdAt', 'editedAt', 'status']
        }],
        where:{
            serviceID: req.params.serviceid
        }
    })
    .then(serviceDetails=>{
        if(serviceDetails){
            res.status(200).json({
                status: 200,
                serviceDetails: serviceDetails
            })
        } else {
            res.status(404).json({
                status: 404,
                msg: 'Service not found'
            });
            console.log('Service not found')
        }
    })
    .catch(err=>{
        // res.status(400).json({
        //     status: 400,
        //     msg: 'Cannot find service'
        // });
        console.log('Err' + err);
        res.send("Cannot find service details: " +  err);

    })
}

module.exports.createServiceDetails = (req, res, next)=>{
    const newServiceDetails = {
        serviceID: req.body.serviceID,
        materialPrice: req.body.materialPrice,
        payToEmployee: req.body.payToEmployee,
        customerPay: req.body.customerPay
    }

    ServiceDetails.create(newServiceDetails)
        .then(newServiceDetails=>{
            if(newServiceDetails){
                res.status(201).json({
                    status: 201,
                    newServiceDetails: newServiceDetails
                })
            }
        })
        .catch(err=>{
            // res.status(400).json({
            //     status: 400,
            //     msg: 'Cannot create new service details'
            // })
            console.log('Cannot create new service details')
            res.send("Cannot create new service details: " + err);
        })
}

module.exports.updateServiceDetails = (req, res, next)=>{
    const updateServiceDetails = {
        serviceID: req.body.serviceID,
        materialPrice: req.body.materialPrice,
        payToEmployee: req.body.payToEmployee,
        customerPay: req.body.customerPay
    }
    ServiceDetails.update(updateServiceDetails,{
        where: {
            id: req.params.serviceDetailsID
        }
    })
    .then(()=>{
        res.status(200).json({
            status: 200,
            updateServiceDetails: updateServiceDetails
        })
    })
    .catch(err=>{
        console.log('Err updating ...' + err);
        res.send('Cannot update service details: ' + err);
    })
}

module.exports.deleteServiceDetails = (req, res, next)=>{
    console.log('Deleting ...');
    ServiceDetails.destroy({
        where: {
            id: req.params.serviceDetailsID
        }
    })
    .then(()=>{
        res.status(200).json({
            status: 200,
            msg: 'Delete successfully'
        })
    })
    .catch(err=>{
        console.log('Err Delete');
        res.send('Cannot delete servcie details: ' + err);
    })
}