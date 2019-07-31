const Branches = require('../models/Branches.model');

// list all branches
module.exports.branchList = (req, res, next)=>{
    console.log('List branch');
    Branches.findAll()
        .then(branches =>{
            res.status(200).json({
                status: 200,
                listBranch: branches 
            })
        })
        .catch(err=>{
            res.send("Error listing branch " + err);
        });
};
// find by ID

// create new  branch
module.exports.createBranch = (req, res, next)=>{
    const newBranch = {
        name : req.body.name,
        address : req.body.address,
        hotline : req.body.hotline,
        bossName : req.body.bossName,
        bossEmail : req.body.bossEmail,
        bossPhone : req.body.bossPhone,
        staffName : req.body.staffName,
        staffEmail : req.body.staffEmail,
        staffPhone : req.body.staffPhone,
        receptionName : req.body.receptionName,
        receptionEmail : req.body.receptionEmail,
        receptionPhone : req.body.receptionPhone,
        createdBy : req.body.createdBy,
        editedBy : req.body.editedBy,
        createdAt : req.body.createdAt,
        editedAt : req.body.createdAt,
        status : req.body.status
    }
    Branches.create(newBranch)
        .then(newBranch=>{
            res.status(200).json({
                status: 200,
                newBranch: newBranch
            });
        })
        .catch(err =>{
            console.log('Cannot create new branch');
        })
}

// edit branch
// module.exports.updateBranch = (req, res, next)=>{
    
// }

