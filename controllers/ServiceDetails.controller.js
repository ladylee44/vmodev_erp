const ServiceDetails = require('../models/ServiceDetails.model');
const Services = require('../models/Services.model');

// serviceDetails.get('/service_details/:serviceid', controller.findServiceDetails);
// serviceDetails.post('/service_details/', controller.createServiceDetails);
// serviceDetails.put('/service_details/:servicedetails_id', controller.updateServiceDetails);
// serviceDetails.delete('/service_details/:servicedetails_id', controller.deleteServiceDetails);

module.exports.findServiceDetails = (req, res, next) =>{
    console.log('Service Detail');
    ServiceDetails.findOne({
        include: [{
            model: Services,
            attributes: ['name', 'description']
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
        customerPay: req.body.customerPay,
        performPrice: req.body.performPrice
    }

    Services.create(newServiceDetails)
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
        customerPay: req.body.customerPay,
        performPrice: req.body.performPrice
    }
    Services.update(updateServiceDetails,{
        where: {
            id: req.params.servicedetails_id
        }
    })
    .then(()=>{
        res.status(201).json({
            status: 201,
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
        res.send('Cannot delete servcie details: ' + err);
    })
}