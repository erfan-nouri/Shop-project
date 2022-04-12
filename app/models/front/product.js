const db = require('../../../database/mysql.js')


exports.showProducts = async () => {

    const [result] = await db.query(`select 
    product.* , quantity.quantity,quantity.saled,category.title AS 'categorytitle',category.id AS 'categoryid'
    from product 
    join quantity on product.id = quantity.product_id
    JOIN category on product.category_id = category.id
    WHERE quantity.quantity - quantity.saled > 0 
    order by product.created_at desc
    limit 6
    `);
    return result
}

exports.offProduct = async () => {

    const [result] = await db.query(`
    select product.*,quantity.quantity,quantity.saled
    from product 
    join quantity on product.id = quantity.product_id
    where product.off_price>0 and quantity.quantity - quantity.saled > 0`);

    return result;
}

exports.product = async (productId) => {

    const [result] = await db.query(
        `select 
        product.* , quantity.quantity,quantity.saled,category.title AS 'categorytitle',category.id AS 'categoryid'
        from product 
        join quantity on product.id = quantity.product_id
        JOIN category on product.category_id = category.id
        WHERE product.id=?
    `, [productId]);
    return result[0];
}