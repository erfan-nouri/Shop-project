const db = require('../../database/mysql.js')

exports.showProducts = async () => {

    const [result] = await db.query(`select 
    product.* , quantity.quantity,quantity.saled,category.title AS 'categorytitle',category.id AS 'categoryid'
    from product 
    join quantity on product.id = quantity.product_id
    JOIN category on product.category_id = category.id`);
    return result
}

exports.showProduct = async (productId) => {

    const [result] = await db.query(`select 
    product.* , quantity.quantity,quantity.saled,category.title AS 'categorytitle',category.id AS 'categoryid'
    from product 
    join quantity on product.id = quantity.product_id
    JOIN category on product.category_id = category.id
    WHERE product.id=${productId}
    `);
    return result[0]
}

exports.updateProduct = async (productData) => {
    const [result] = await db.query(`
    UPDATE product
    SET ?
    where id=?`, [productData, productData.id]);
    return result;
}


exports.delete = async (productId) => {

    const [result] = await db.query('delete from product where id=?', [productId]);
    return result
}

exports.add = async (productData) => {
    
    const [result] = await db.query('insert into product set ?', [productData]);
    return result
}