const db = require('../../database/mysql.js')


exports.showAll = async () => {

    const [result] = await db.query('select * from contactus')
    return result;

}

exports.setSeen = async (messageId) => {

    const [result] = await db.query('update contactus set status=1 where id= ?', [messageId])
    return result;
}

exports.setUnseen = async (messageId) => {

    const [result] = await db.query('update contactus set status =0 where id=?', [messageId])
    return result;

}