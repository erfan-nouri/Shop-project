const db = require('../../database/mysql.js')

exports.insertUser = async (data) => {

    const [result] = await db.query('insert into users set ?', [data]);
    return result.affectedRows;

}

exports.checkUser = async (userEmail) => {

    const [result] = await db.query('select * from users where email = ? limit 1', [userEmail])
    return result[0];

}
exports.updateBalance = async (balance, userId) => {

    const [result] = await db.query('update users set balance = ? where id = ?', [balance, userId]);
    return result;

}
exports.user = async (userId) => {

    const [result] = await db.query('select * from users where id = ?', [userId])
    return result[0]
}
exports.changePassword = async (password, userId) => {

    const [result] = await db.query(`update users set password=? where id = ?`, [password, userId])
    return result

}