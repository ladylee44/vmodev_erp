const ServicesCustomers = require('../models/ServicesCustomers.model');
const Employees = require('../models/Employees.model');
const Services = require('../models/Services.model');
const Customers = require('../models/Customers.model');
const ServiceDetails = require('../models/ServiceDetails.model');

//  Service Customer 
module.exports.findSerCus = (req, res, next)=>{
    console.log('Services Customers');
    ServicesCustomers.findAll({
        include:[{
            model: Services
        },
        {
            model: Customers
        },
        {
            model: Employees
        }],
        where: {
            id:  req.params.serviceCustomerID
        }
    })
    .then(serviceCustomer=>{
        if(serviceCustomer){
            res.status(200).json({
                status: 200,
                serviceCustomer: serviceCustomer
            })
        } else {
            res.status(404).json({
                status: 404,
                msg: 'ServiceCustomer not found'
            });
            console.log('ServiceCustomer not found');
        }
    })
    .catch(err=>{
        // res.status(400).json({
        //     status: 400,
        //     msg: 'Cannot search service customer'
        // });
        console.log('Err: ' + err);
        res.send('Cannot find service-customer: ' + err);
    })
}

// create new service_customer
module.exports.createSerCus = (req, res, next)=>{
    console.log('Create new Service-Customer');
    // coding here
    ServiceDetails.findAll({
        include:[{
            model: Services,
            attributes: ['id']
        }],
        where: {
            serviceID: req.body.serviceID
        }
    })
    .then(serviceDetails=>{
        serviceDetails.map(ser=>{
            return result = {
                materialPrice: ser.materialPrice,
                payToEmployee: ser.payToEmployee,
                customerPay: ser.customerPay
            }
        });
        console.log(result.materialPrice);
        console.log(result.payToEmployee);
        console.log(result.customerPay);

        const newServiceCustomer = {
            serviceID: req.body.serviceID,
            customerID: req.body.customerID,
            employeeID:req.body.employeeID,
            materialPrice: result.materialPrice,
            payToEmployee: result.payToEmployee,
            customerPay: result.customerPay,
            startAt: req.body.startAt,
            endAt: req.body.endAt
        };
        // console.log(newServiceCustomer);
        ServicesCustomers.create(newServiceCustomer)
            .then(newServiceCustomer=>{
                if(newServiceCustomer){
                    res.status(201).json({
                        status: 'Create successfully',
                        newServiceCustomer: newServiceCustomer
                    })
                } else {
                    res.send('Cannot find service ID');
                }
            })
            .catch(err=>{
                res.status(400).json({
                    status: 400,
                    msg: err
                });
                console.log('Cannot create new ServiceCustomer');
            })
    })
    .catch(err=>{
        console.log('Err: ' +  err);
        res.send('Cannot create new service-customer: ' + err);
    })
};

module.exports.updateSerCus = (req, res, next)=>{
    console.log('Updating Service Customer ...');
    ServiceDetails.findAll({
        include:[{
            model: Services,
            attributes: ['id']
        }]
    })
    .then(serviceDetails=>{
        serviceDetails.map(ser=>{
            return result = {
                materialPrice: ser.materialPrice,
                payToEmployee: ser.payToEmployee,
                customerPay: ser.customerPay
            }
        });
        // console.log(result.materialPrice);
        // console.log(result.customerPay);
        // console.log(result.performPrice);

        const updateServiceCustomer = {
            serviceID: req.body.serviceID,
            customerID: req.body.customerID,
            employeeID:req.body.employeeID,
            materialPrice: result.materialPrice,
            payToEmployee: result.payToEmployee,
            customerPay: result.customerPay,
            startAt: req.body.startAt,
            endAt: req.body.endAt
        };
        // console.log(newServiceCustomer);
        ServicesCustomers.update(updateServiceCustomer,{
            where: {
                id: req.params.serviceDetailsID
            }
        })
            .then(()=>{
                res.status(200).json({
                    status: 'Update successfully',
                    updateServiceCustomer: updateServiceCustomer
                })
            })
            .catch(err=>{
                res.status(400).json({
                    status: 400,
                    msg: err
                });
                console.log('Cannot update ServiceCustomer');
            })
    })
    .catch(err=>{
        console.log('Err: ' +  err);
        res.send('Cannot update service-customer: ' + err);
    })
}

module.exports.deleteSerCus = (req, res, next)=>{
    console.log('Deleting ...');
    ServicesCustomers.destroy({
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
        console.log('Err delete' + err);
        res.send('Cannot delete service-customer: ' + err);
    });
};