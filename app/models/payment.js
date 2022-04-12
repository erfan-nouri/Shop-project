const db = require('../../database/mysql.js');

exports.store = async (paymentData) => {

    const [result] = await db.query('insert into payment set ? ', [paymentData]);
    return result
}

exports.getInfo = async (resnumber) => {

    const [result] = await db.query("select * from payment where resnumber = ?", [resnumber]);
    return result[0]

}

exports.update = async (resnumber) => {

    const [result] = await db.query('update payment set status=1 where resnumber = ?', [resnumber]);
    return result
}

exports.showAll = async () => {

    const [result] = await db.query(`select 
    payment.*,users.firstname,users.lastname 
    from payment
    join users on payment.user_id = users.id`);
    return result;

}

exports.delete = async (paymentId) => {
    const [result] = await db.query('delete from payment where id = ?', [paymentId]);
    return result
}