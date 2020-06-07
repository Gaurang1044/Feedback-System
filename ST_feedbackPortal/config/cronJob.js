const CronJob = require('cron').CronJob;
const Courses = require("../models/courses");

const job = new CronJob('5 * * * * *', function () {
    var dateThreeDayPast = new Date();
    dateThreeDayPast.setDate(dateThreeDayPast.getDate() - 3);
    // Courses.update(
    //     {active:true},
    //     [ { $set: { active: { $lt: ['$date_active',dateThreeDayPast] } } } ],
    //     {multi:true}
    // );
    var d = new Date();
    console.log('At 12 Hours:', d);
});

console.log('After job instantiation');
module.exports = job;
// db.inventory.update({qty:true},[{$set:{qty:{$lt:[c,'$status']}}}]);