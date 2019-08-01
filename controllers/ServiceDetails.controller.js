const ServiceDetails = require('../models/ServiceDetails.model');
const Services = require('../models/Services.model');

module.exports.findServiceDetails = (req, res, next) =>{
    console.log('Service Detail');
    ServiceDetails.findOne({
        include: [{
            model: Services,
            attributes: ['name', 'description']
        }],
        where:{
            id: req.params.serviceid
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
            })
            console.log('Service not found')
        }
    })
    .catch(err=>{
        res.status(400).json({
            status: 400,
            msg: 'Cannot find service'
        });
        console.log('Err' + err);
    })
}

module.exports.createServiceDetails = (req, res, next)=>{
    const newServiceDetails = {
        serviceID: req.body.serviceID,
        materialPrice: req.body.materialPrice,
        customerPay: req.body.customerPay,
        performPrice: req.body.performPrice
    }

    Services.create(newServiceDetails)
        .then(newServiceDetails=>{
            if(newServiceDetails){
                res.status(200).json({
                    status: 200,
                    newServiceDetails: newServiceDetails
                })
            }
        })
        .catch(err=>{
            res.status(400).json({
                status: 400,
                msg: 'Cannot create new service details'
            })
            console.log('Cannot create new service details')
        })
}

module.exports.updateServiceDetails = (req, res, next)=>{
    const updateServiceDetails = {
        serviceID: req.body.serviceID,
        materialPrice: req.body.materialPrice,
        customerPay: req.body.customerPay,
        performPrice: req.body.performPrice
    }
    Services.update(updateServiceDetails,{
        where: {
            id: req.params.servicedetails_id
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
    })
}

module.exports.deleteServiceDetails = (req, res, next)=>{
    console.log('Deleting ...');
    Services.destroy({
        where: {
            id: req.params.servicedetails_id
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
    })
}