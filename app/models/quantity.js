const db = require('../../database/mysql.js');


exports.store = async (quantityData) => {
    const [result] = await db.query(`insert into quantity set ?`, [quantityData]);
    return result
}

exports.update = async (quantityData) => {


    const [result] = await db.query('update quantity set quantity = ? where product_id = ?', [quantityData.quantity, quantityData.product_id])
}

exports.getData = async (quantityData) => {

    const [result] = await db.query(`select * from quantity where product_id=${quantityData}`);
    return result[0];

}
exports.delete = async (productId) => {

    const [result] = await db.query('delete from quantity where product_id = ?', [productId])
    return result;
}
exports.updateSaled = async (productId, count) => {
    const data = await this.getData(productId);
    const [result] = await db.query('update quantity set saled =? where product_id = ?', [count + data.saled, productId])
    return result;
}