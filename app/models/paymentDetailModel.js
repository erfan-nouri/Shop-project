const db = require('../../database/mysql.js')


exports.store = async (paymentId, itemcount, basket) => {

    for (let i = 0; i < itemcount; i++) {
        const payemntDetailData = {
            payment_id: paymentId,
            product_id: basket[i].productId,
            quantity: basket[i].count
        }

        const [result] = await db.query('insert into paymentdetail set ?', [payemntDetailData]);
    }

}