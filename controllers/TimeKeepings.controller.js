const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const timekeepings = require("../models/TimeKeepings.model");
const employees = require("../models/Employees.model");
const branch = require("../models/Branches.model");
const db = require("../configdb/configdb");

module.exports = {

  list: (req, res, next) => {
    timekeepings
    .findAll({
      include: [
        {
          model: employees,
          attributes: ["branchID", "name", "dob", "gender", "role"]
        },
        {
          model: branch,
          attributes: ["name"]
        }
      ]
    })
    .then(data => {
      // res.send(data)
      const response = {
        timekeepings: data.map(result => {
          // console.log(result)
          eplName = result.employee.name;
          // console.log(eplName)
          //lấy thời gian check-in/check-out
          var check_in = result.checkIn;
          var check_out = result.checkOut;
          
          var hour_in = check_in.split(":", 1);
          var hour_out = check_out.split(":", 1);
          
          var min_in = check_in.split(":", 2)[1];
          var min_out = check_out.split(":", 2)[1];
          
          //thời gian làm việc
          var totalMin = 0;
          var totalHour = 0;
          if (min_in > min_out) {
            totalMin = 60 - min_in + 60 - min_out;
            totalHour = hour_out - hour_in - 1;
          } else {
            totalMin = min_out - min_in;
            totalHour = hour_out - hour_in;
          }
          
          //thời gian OT
          var OT = totalHour - 8.0;
          var overTime = 0;
          if (OT > 0.0) {
            overTime = OT + totalMin / 60;
          } else {
            overTime = 0;
          }
          
          //chấm 1 công/ nửa công
          var workDay = 0;
          if (totalHour == 4.0) {
            workDay = 0.5;
          } else if (totalHour < 4.0) {
            workDay = 0;
          } else {
            workDay = 1;
          }
          
          //chấm số ngày nghỉ
          var dayOff = 0;
          if (workDay == 0) {
            dayOff++;
          }
          
          timekeepings.update(
            {
              workDay: workDay
            },
            {
              where: {
                id: result.id
              }
            }
            );
            
            timekeepings.update(
              {
                dayOff: dayOff
              },
              {
                where: {
                  id: result.id
                }
              }
              );
              
              //update thời gian làm việc lên db
              timekeepings.update(
                {
                  workTime: totalHour + totalMin / 60
                },
                {
                  where: {
                    id: result.id
                  }
                }
                );
                
                timekeepings.update(
                  {
                    OT: parseFloat(overTime.toFixed(2))
                  },
                  {
                    where: {
                      id: result.id
                    }
                  }
                  );
                  
                  //tổng thời gian làm việc
                  var timeWorking = parseFloat(
                    (totalHour + totalMin / 60).toFixed(1)
                    );
                    
                    //trả về kết quả
                    return {
                      employeeID: result.employeeID,
                      employeeName: eplName,
                      date: result.date,
                      checkIn: result.checkIn,
                      checkOut: result.checkOut,
                      timeWorking: timeWorking,
                      workDay: workDay,
                      OT: parseFloat(overTime.toFixed(1)),
                      dayOff: dayOff
                    };
                  })
                };
                res.send({
                  timekeeping_data: response
                });
              })
              .catch(err => {
                res.send({
                  message: "Error: " + err
                });
              });
            },
            
  listByDateRange: (req, res, next) => {
              var date_start = req.body.date_start;
              var date_end = req.body.date_end;
              var sql =
              "SELECT employees.name as employeeName, branches.name as branchName, timekeepings.checkIn, timekeepings.checkOut " +
              "FROM timekeepings, employees, branches " +
              "WHERE timekeepings.branchOfEmployee = branches.id AND timekeepings.employeeID=employees.id AND ( timekeepings.date BETWEEN '" +
              date_start +
              "' AND '" +
              date_end +
              "')";
              db.query(sql, { type: db.QueryTypes.SELECT }).then(result => {
                res.send({
                  result
                });
              });
            },
            
  listByDay: (req, res, next) => {
              var day = req.body.day;
              var sql =
              "SELECT employees.name as employeeName, branches.name as branchName, timekeepings.checkIn, timekeepings.checkOut, timekeepings.workTime, timekeepings.dayOff " +
              "FROM timekeepings, employees, branches " +
              "WHERE timekeepings.branchOfEmployee = branches.id AND timekeepings.employeeID=employees.id AND timekeepings.date = '" +
              day +
              "'";
              db.query(sql, { type: db.QueryTypes.SELECT }).then(result => {
                res.send({
                  result
                });
              });
            },
            
  createTimekeeping: (req, res, next) => {
              var newTimekeeping = {
                employeeID: req.body.employeeID,
                branchOfEmployee: req.body.branchOfEmployee,
                date: req.body.date,
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut
              };
              timekeepings
              .create(newTimekeeping)
              .then(result => {
                if (result) {
                  res.send({
                    message: "Create success",
                    timeKeeping: result
                  });
                } else {
                  res.send({
                    message: "Error in create timekeeping"
                  });
                }
              })
              .catch(err => {
                res.send("Error: " + err);
              });
            },
            
  listMonth: (req, res, next) => {
              timekeepings.findAll({
                order: ['employeeID']
              }).then(result => {

                var employeeID = result.employeeID;
                const response = result.map(item => {
                  return {
                    date: item.date,
                    employee: item.employeeID,
                    checkIn: item.checkIn,
                    checkOut: item.checkOut
                  };
                });
                
                const employee = {
                  data: response
                };
                
                res.send({
                  employee
                });
              });
            },
};