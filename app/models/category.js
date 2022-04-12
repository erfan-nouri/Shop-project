const db = require('../../database/mysql.js')

exports.showAll = async () => {

    const [result] = await db.query('select * from category');
    return result;
}
exports.update = async (categoryData) => {

    const [result] = await db.query('update category set ? where id=?', [categoryData,categoryData.id]);
    return result
}
exports.show = async (categoryId) => {

    const [result] = await db.query('select * from category where id=? limit 1', [categoryId]);
    return result[0];
}
