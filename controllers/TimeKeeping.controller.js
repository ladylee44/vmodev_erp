const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const timekeepings = require("../models/TimeKeepings.model");
const db = require("../configdb/configdb");

module.exports = {
  
  list: (req, res, next) => {
    timekeepings
    .findAll()
    .then(data => {
      // console.log(data)
      const response = {
        timekeepings: data.map(result => {
          
          // console.log(result)
          //lấy thời gian check-in/check-out
          var check_in = result.checkIn;
          var check_out = result.checkOut;
          
          // console.log(check_in);
          // console.log(check_out);
          
          var hour_in =check_in.split(":",1);
          var hour_out = check_out.split(":", 1);
          // console.log('hour-in: '+hour_in);
          // console.log('hour-out: '+hour_out);
          
          var min_in =check_in.split(':', 2)[1];
          var min_out =check_out.split(':', 2)[1];
          // var min_out= check_out[1];
          // console.log(check_out);
          // //tách ngày/giờ
          // var check_out = check_out.split(":", 2);
          // var check_in = check_in.split(":", 2);
          
          // //lấy ngày
          // var day_out = check_out[0];
          // var day_in = check_in[0];
          
          // //lấy giờ/ phút
          // var hour_out = parseInt(check_out[1].split(":", 1));
          // var hour_in = parseInt(check_in[1].split(":", 1));
          // var min_in = parseInt(check_in[1].split(":"));
          // var min_out = parseInt(check_out[1].split(":"));
          
          
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
          var OT = totalHour - 8;
          var overTime = 0;
          if (OT > 0) {
            overTime = OT + totalMin / 60;
          } else {
            overTime = 0;
          }
          
          //chấm 1 công/ nửa công
          if (totalHour < 4) {
            var workDay = 0;
          } else if (totalHour == 4) {
            var workDay = 0.5;
          } else {
            var workDay = 1;
          }
          
          //chấm số ngày nghỉ
          var dayOff = 0;
          if (workDay == 0) {
            dayOff++;
          }
          
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
              
              //tổng thời gian làm việc
              var timeWorking = parseFloat(
                (totalHour + totalMin / 60).toFixed(1)
                );
                
                //trả về kết quả
                
                return {
                  employeeID: result.employeeID,
                  date: result.date,
                  checkIn: result.checkIn,
                  checkOut: result.checkOut,
                  timeWorking: timeWorking,
                  dayOff: dayOff,
                  overTime: parseFloat(overTime.toFixed(1)),
                  workDay: workDay
                };
              })
            };
            res.json({
              Timekeeping: response
            });
          })
          .catch(err => {
            res.json({
              message: "Error: " + err
            });
          });
        },
        
        listByDate: (req, res, next) => {
          var date_start= req.body.date_start;
          var date_end = req.body.date_end
          console.log(date_start);
          // timekeepings
          //   .findAll()
          //   .then(data => {
          //     const response = {
          //       timekeepings: data.map(result1 => {
          
          //         var date_start = req.body.date;
          //         var date
          //         var sql =
          //         "SELECT employees.name as employeeName, branches.name as branchName, timekeepings.checkIn, timekeepings.checkOut " +
          //         "FROM timekeepings, employees, branches " +
          //         "WHERE timekeepings.branchOfEmployee = branches.id AND timekeepings.employeeID=employees.id ";
          //         db.query(sql, { type: db.QueryTypes.SELECT }).then(result => {
          //             console.log(result);
          //             res.json({
          //                 result
          //             });
          //         });
          //       })
          //     };
          //   });
          var sql =
          "SELECT employees.name as employeeName, branches.name as branchName, timekeepings.checkIn, timekeepings.checkOut " +
          "FROM timekeepings, employees, branches " +
          "WHERE timekeepings.branchOfEmployee = branches.id AND timekeepings.employeeID=employees.id AND ( timekeepings.date BETWEEN '"+ date_start+"' AND '"+date_end+"')";
          db.query(sql, { type: db.QueryTypes.SELECT }).then(result => {
            res.json({
              result
            });
          });
        },
        
        listOfDay: (req, res,  next)=>{
          var day = req.body.day;
          var sql = 
          "SELECT employees.name as employeeName, branches.name as branchName, timekeepings.checkIn, timekeepings.checkOut, timekeepings.workTime, timekeepings.dayOff " +
          "FROM timekeepings, employees, branches " +
          "WHERE timekeepings.branchOfEmployee = branches.id AND timekeepings.employeeID=employees.id AND timekeepings.date = '"+ day+"'";
          db.query(sql, {type: db.QueryTypes.SELECT})
          .then(result=>{
            res.json({
              day: day,
              result
            });
          });
        },
        
        createTimekeeping :(req, res, next)=>{
          var newTimekeeping = {
            employeeID: req.body.employeeID,
            branchOfEmployee: req.body.branchOfEmployee,
            // date: req.body.date,
            // checkIn: req.body.checkIn,
            // checkOut: req.body.checkOut,
          }
          timekeepings.create(newTimekeeping)
          .then(result=>{
            if(result){
              res.json({
                message: 'Create success',
                timeKeeping: result
              })
            }else{
              res.json({
                message: "Error in create timekeeping"
              })
            }
          })
          .catch(err=>{
            res.send('Error: '+ err)
          })
        },

        listByMonth: (req, res, next)=>{
          
          var sql = "SELECT employees.name, timekeepings.checkIn, timekeepings.checkOut"+
          " FROM timekeepings, employees"+
          " WHERE timekeepings.employeeID =employees.id GROUP BY timekeepings.date";

          // db.query(sql, {type: })
          
        }

        
      };