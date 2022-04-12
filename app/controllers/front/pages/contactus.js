const mailerServices = require('../../../services/mailerServices.js')
const contactusModel = require('../../../models/front/contactusModel.js')

/* contact us page*/
exports.index = (req, res) => {
    res.frontRender('front/pages/contactus.handlebars', {
        pageTitle: 'عرفشاپ | تماس با ما', error: req.flash('error'), success: req.flash('success'), helpers: {
            haveError: (value, option) => {
                return value.length > 0 ? `<div class="alert alert-danger" role="alert">
                ${value}
            </div>`: ''
            },
            haveSuccess: (value, options) => {
                return value.length > 0 ? `<div class="alert alert-success" role="alert">
                ${value}
            </div>`: ''
            }
        }
    })

}

/* send message handle*/
exports.submit = async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    }

    const result = await contactusModel.submit(data)
    if (result) {

        await mailerServices.sendMail(data.email, 'تایید ارسال پیام', 'پیام شما بدست ما رسید.')
        await mailerServices.sendMail('erfannj11@gmail.com', 'یک پیام جدید دارید.', 'یک پیام جدید از سمت کاربران دارید.')
        req.flash('success', 'پیام شما با موفقیت ارسال شد')
        return res.redirect('/contactus')
    }
    req.flash('error', 'خطایی رخ داده است پیام شما با موفقیت ارسال نشد.')
    return res.redirect('/contactus')

}