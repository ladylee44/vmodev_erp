const Employees = require('../models/Employees.model');

// list employees
module.exports.employeeList = (req, res, next)=>{
    console.log('List Employees');
    Employees.findAll()
        .then(empls =>{
            res.status(200).json({
                status: 200,
                listEmployee: empls
            })
        })
        .catch(err=>{
            res.send('Error listing err' + err);
        })
}
// find employee by ID
module.exports.findEmployee = (req, res, next)=>{
    Employees.findOne({
        where: {
            id: req.params.employeeid
        }
    })
    .then(empl =>{
        if(empl){
            res.status(200).json({
                status: 200,
                employee: empl
            })
        } else {
            res.send('Employee not found');
        }
    })
    .catch(err=>{
        res.send('Err '+ err);
    })
}
// add new employee
module.exports.addEmployee = (req, res, next)=>{
    console.log('Add new employee');
    const newEmpl = {
        branch_id: req.body.branchID,
        name: req.body.name,
        dob: req.body.dob,
        address: req.body.address,
        email: req.body.email,
        role: req.body.role,
        createdBy: req.body.createdBy,
        editedBy: req.body.editedBy,
        createdAt: req.body.createdAt,
        editedAt: req.body.editedAt,
        status: req.body.status
    }

    Employees.create(newEmpl)
        .then(newEmpl=>{
            res.status(200).json({
                status: 200,
                newEmployee: newEmpl
            })
        })
        .catch(err=>{
            console.log('Cannot add new employee');
        })
}

// update Employee
module.exports.updateEmployee = (req, res, next)=>{
    console.log('Updating employee ...');
    const updateEmployee = {
        branch_id: req.body.branchID,
        name: req.body.name,
        dob: req.body.dob,
        address: req.body.address,
        email: req.body.email,
        role: req.body.role,
        createdBy: req.body.createdBy,
        editedBy: req.body.editedBy,
        createdAt: req.body.createdAt,
        editedAt: req.body.editedAt,
        status: req.body.status
    }
    Employees.update(updateEmployee,{
        where: {
            id: req.params.employeeid
        }
    })
    .then(()=>{
        res.status(200).json({
            status: 200,
            updateEmployee: updateEmployee
        })
    })
    .catch(()=>{
        console.log('Error updating');
    })
}

// delete Employee
module.exports.deleteEmployee = (req, res, next)=>{
    console.log('Deleting ...');
    Employees.destroy({
        where: {
            id: req.params.employeeid
        }
    })
    .then(()=>{
        res.status(200).json({
            status: 'Delete successfully'
        })
    })
    .catch(err =>{
        console.log('Error Delete');
    })
}

// module.exports.updateEmployee = (req, res, next)=>{
//         const updateEmployee = {
//         branch_id: req.body.branchID,
//         name: req.body.name,
//         dob: req.body.dob,
//         address: req.body.address,
//         email: req.body.email,
//         role: req.body.role,
//         createdBy: req.body.createdBy,
//         editedBy: req.body.editedBy,
//         createdAt: req.body.createdAt,
//         editedAt: req.body.editedAt,
//         status: req.body.status
//     }
//     Employees.findOne({
//         where: {
//             id: req.params.employeeid
//         }
//     })
//     .then(empl=>{
//         if(empl){
//             empl
//             .update(updateEmployee)
//             .then(updateEmployee=>{
//                 res.status(200).json({
//                     status: 200,
//                     updateEmployee: updateEmployee
//                 })
//             })
//         }
//     })
// }