const db = require('../../../database/mysql.js')



exports.show = async (userId) => {

    const [result] = await db.query('select * from payment where user_id=?', [userId])
    return result
}