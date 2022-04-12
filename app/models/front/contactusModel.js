const db = require('../../../database/mysql.js')


exports.submit = async (data) => {

    const [result] = await db.query('insert into contactus set ?', [data])
    return result
    
}