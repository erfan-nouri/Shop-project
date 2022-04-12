const jalaliMoment = require('jalali-moment');

/* convert date to persian date*/
exports.toPersianDate = (date) => {

    return jalaliMoment(date).locale('fa').format('YYYY/MM/DD');

}