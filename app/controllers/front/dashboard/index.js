const paymentModel = require('../../../models/front/payment.js')
const paymentType = require('../../../models/paymentType.js')
const dateService = require('../../../services/dateService.js')

/* user dashboard page */
exports.index = async (req, res) => {
    res.dashboardRender('front/dashboard/index.handlebars')
}


/* all user's payment */
exports.payment = async (req, res) => {
    const paymentList = await paymentModel.show(req.session.user.id)
    const paymentListPresented = paymentList.map(data => {
        data.created_at = dateService.toPersianDate(data.created_at)
        return data;
    })
    res.dashboardRender('front/dashboard/paymentList.handlebars', {
        paymentList: paymentListPresented, pageTitle: "عرفشاپ | داشبورد", helpers: {
            status: (value, options) => {
                return value == 1 ? '<span class="badge badge-success">پرداخت شده</span>' : '<span class="badge badge-danger">ناتمام</span>'
            },
            paymentType: (value, options) => {
                return value == paymentType.DEPOSIT ? 'افزایش موجودی' : 'خرید'
            },
             paymentDetail: (value1, value2, options) => {
                return value1 == paymentType.DEPOSIT ? '' : `<a class="view button button-box button-xs button-primary"
                href="/#"><i class="zmdi zmdi-more"></i></a>`;
            }
        }
    })

}