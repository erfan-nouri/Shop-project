const axios = require('axios')
const paymentModel = require('../../../models/payment.js');
const paymentType = require('../../../models/paymentType.js');
const paymentDetailModel = require('../../../models/paymentDetailModel.js');
const quantityModel = require('../../../models/quantity.js')
const httpService = require('../../../services/httpService')

//* buy controller (zarinpal config)
exports.buy = async (req, res) => {

    /* set post request data*/
    let params = {
        MerchantID: "6cded376-3063-11e9-a98e-005056a205be",
        Amount: req.query.amount,
        CallbackURL: "http://localhost:4321/payment/buy/buycallback",
        Description: "افزایش اعتبار حساب کاربری ",
    };
    /* post data*/
    const response = await httpService.post("https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json", params);

    /*set paymentData for save Database  */
    const paymentData = {
        user_id: req.session.user.id,
        amount: req.query.amount,
        resnumber: response.data.Authority,
        type: paymentType.BUY,
        itemcount: req.query.itemCount
    }

    /* check payment status & save payment in database*/
    if (response.data.Status == 100) {

        const result = await paymentModel.store(paymentData);

        if (result) {

            return res.redirect(`https://www.zarinpal.com/pg/StartPay/${response.data.Authority}`);

        } else {
            console.log('ثبت پرداخت در دیتابیس با مشکل برخورد کرد.');
        }
    }
}

//* callback link controller (zarinpal config)
exports.buycallback = async (req, res) => {
    /* get Paymet data from database*/
    const paymentInfo = await paymentModel.getInfo(req.query.Authority);

    if (!paymentInfo) {
        return res.send('تراکنشی یافت نشد.');
    }

    /* set post request data*/
    let params = {
        MerchantID: "6cded376-3063-11e9-a98e-005056a205be",
        Amount: paymentInfo.amount,
        Authority: req.query.Authority,
    };

    /* post data*/
    const response = await httpService.post("https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json", params);
    
    /* check payment status & save payment in databasee*/
    if (response.data.Status != 100) {

        //* update status payment
        const resultStatusPayment = await paymentModel.update(req.query.Authority);
        //* submit shopcart data in paymentDetail
        const resultPaymentDetail = await paymentDetailModel.store(paymentInfo.id, paymentInfo.itemcount, req.session.basket);

        if (resultStatusPayment && resultPaymentDetail) {
            console.log('buy succesfuly');
        }
        //* calculate new quantity after payment
        for (let i = 0; i < req.session.basket.length; i++) {
            const result = await quantityModel.updateSaled(req.session.basket[i].productId, req.session.basket[i].count);
        }

        //* reset basket
        req.session.basket = [];
        res.redirect('/');

    } else {

        res.send('خرید با موفقیت انجام نشد');

    }

}