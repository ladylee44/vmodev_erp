const timekeepings = require("../models/TimeKeepings.model");

module.exports = {
  list: (req, res, next) => {
    timekeepings
      .findAll()
      .then(data => {
        const response = {
          //   count : data.length,
          timekeepings: data.map(result => {
            //lấy thời gian check-in/check-out
            var check_in = result.checkIn;
            var check_out = result.checkOut;

            // lấy giờ, phút check-in/check-out
            var time_out = check_out.split(":", 2);
            var time_in = check_in.split(":", 2);

            //giờ check-in/check-out
            var hour_in = parseInt(time_in[0]);
            var hour_out = parseInt(time_out[0]);

            //phút check-in/checkout;
            var min_in = parseInt(time_in[1]);
            var min_out = parseInt(time_out[1]);

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
            var workDay = 0;
            if (totalHour < 4) {
              workDay;
            } else if (totalHour == 4) {
              workDay = 0.5;
            } else {
              workDay = 1;
            }

            //chấm ngày nghỉ
            var dayOff = 0;
            if (workDay == 0) {
              dayOff++;
            }

            //trả về kết quả
            return {
              employeeID: result.employeeID,
              checkOut: result.checkOut,
              checkIn: result.checkIn,
              timeWorking: totalHour + (totalMin/60),
              dayOff: dayOff,
              overTime: overTime,
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
  }
};
