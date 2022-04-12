//* import package
const axios = require('axios');
const paymentModel = require('../../../models/payment.js');
const usersModel = require('../../../models/users.js');
const dateService = require('../../../services/dateService.js')
const paymentType = require('../../../models/paymentType.js')
const httpServise = require('../../../services/httpService.js')

//* deposit controller (zarinpal config)
exports.deposit = async (req, res) => {

    /* set post request data*/
    let params = {
        MerchantID: "6cded376-3063-11e9-a98e-005056a205be",
        Amount: parseInt(req.body.amount),
        CallbackURL: "http://localhost:4321/admin/payment/depositcallback",
        Description: "افزایش اعتبار حساب کاربری ",
    };

    /* post data*/
    const response = await httpServise.post("https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json", params)

    /*set paymentData for save Database  */
    const paymentData = {
        user_id: req.session.user.id,
        amount: req.body.amount,
        resnumber: response.data.Authority,
        type: paymentType.DEPOSIT
    }

    /* check payment status & save payment in database*/
    if (response.data.Status == 100) {

        const result = await paymentModel.store(paymentData);

        if (result) {
            return res.redirect(`https://www.zarinpal.com/pg/StartPay/${response.data.Authority}`);
        } else {
            console.log('مشکلی در ثبت پرداخت در پایگاه داده رخ داده است');
            req.flash('error', 'مشکلی در ثبت پرداخت در پایدگاه داده رخ داده است')
            return res.redirect('/admin/profile')
        }
    }

    else {
        req.flash('error', 'پرداخت با مشکل روبه رو شد')
        return res.redirect('/admin/profile')
    }


}

//* callback link controller (zarinpal config)
exports.depositCallBack = async (req, res) => {

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
    const response = await httpServise.post("https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json", params);

    /* check payment status & save payment in databasee*/
    if (response.data.Status != 100) {
        await paymentModel.update(req.query.Authority);
        const user = await usersModel.user(paymentInfo.user_id)
        const userBalance = user.balance + paymentInfo.amount;
        const result = await usersModel.updateBalance(userBalance, paymentInfo.user_id);

        if (result) {
            req.flash('success', 'موجوردی با موفقیت انجام یافت.')
            return res.redirect('/admin/profile');
        }
    } else {
        req.flash('error', 'تراکنش با خطا مواجه شد..')
        return res.redirect('/admin/profile');

    }
}

/* get all payment from database */
exports.paymentList = async (req, res) => {
    const user = req.session.user;
    const paymentList = await paymentModel.showAll();
    const paymentListPresented = paymentList.map(data => {
        data.created_at = dateService.toPersianDate(data.created_at);
        return data;
    })

    /* render*/
    res.adminRender('admin/payment/paymentList.handlebars', {
        user, error: req.flash('error'), success: req.flash('success'), paymentList: paymentListPresented, helpers: {

            /* set payment status*/
            status: (value, options) => {
                return value == 1 ? '<span class="badge badge-success">پرداخت شده</span>' : '<span class="badge badge-danger">ناتمام</span>'
            },

            /* set payment type*/
            paymentType: (value, options) => {
                return value == paymentType.DEPOSIT ? 'افزایش موجودی' : 'خرید'
            },

            /* show detail button from buy payment*/
            paymentDetail: (value1, value2, options) => {
                return value1 == paymentType.DEPOSIT ? '' : `<a class="view button button-box button-xs button-primary"
                href="/admin/payment?${value2}"><i class="zmdi zmdi-more"></i></a>`;
            },

            /* check errorMessage*/
            hasError: (value, options) => {
                return value.length > 0 ? `<div class="alert alert-danger" role="alert">
                ${value}
            </div>`: ''
            },

            /* check successMessage*/
            hasSuccess: (value, options) => {
                return value.length > 0 ? `<div class="alert alert-success" role="success">
                ${value}
            </div>`: ''
            }
        }
    });

}

/* delete payment from database*/
exports.delete = async (req, res) => {

    const result = await paymentModel.delete(req.query.paymentId);
    if (result) {
        req.flash('success', 'تراکنش با موفقیت حذف شد')
        return res.redirect('/admin/payment/list')
    }
    req.flash('error', 'حذف تراکنش با مشکل مواجه شد.')
    return res.redirect('/admin/payment/list')
}