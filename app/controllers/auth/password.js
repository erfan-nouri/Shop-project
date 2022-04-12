const usersModel = require('../../models/users.js')
const jwt = require('jsonwebtoken')
const mailerServvices = require('../../services/mailerServices.js')
const hashServices = require('../../services/hashService.js')
const changePasswordServices = require('../../services/changePasswordServices.js')

/* forgetpassword page */
exports.showForgetPassword = (req, res) => {

    res.render('auth/forgetPassword.handlebars', {
        layout: 'auth', success: req.flash('success'), error: req.flash('error'), helpers: {

            /* check errorMessage*/
            haveError: (value, options) => {
                return value.length > 0 ? `<div class="alert alert-danger" role="alert">
                ${value}
            </div>`: ''
            },

            /* check successMessage*/
            haveSuccess: (value, options) => {
                return value.length > 0 ? `<div class="alert alert-success" role="alert">
                ${value}
            </div>`: ''
            }
        }
    })

}

/* forget password handle*/
exports.forgetPassword = async (req, res) => {
    /* check valid email */
    const result = await usersModel.checkUser(req.body.email)

    /* sign token for reset password & send email */
    if (result) {
        const Token = jwt.sign({
            data: result.id
        }, process.env.JSON_WEB_TOKEN, { expiresIn: '1h' });

        await mailerServvices.sendMail(req.body.email, 'فراموشی رمز عبور', `<a href="http://localhost:4321/auth/reset-password/${Token}">برای تغییر رمز عبور برروی لینک کلیک کنید</a>`)
        req.flash('success', 'ایمیل حاوی لینک فراموشی رمز عبور برای شما ارسال شده است.')
        return res.redirect('/auth/forget-password')

    }

    req.flash('error', 'کاربری با این ایمیل یافت نشد.')
    res.redirect('/auth/forget-password')

}

/* reset password page*/
exports.showResetPassword = (req, res) => {
    try {

        /* verify token*/
        const decodedToken = jwt.verify(req.params.token, process.env.JSON_WEB_TOKEN)
        if (decodedToken) {
            return res.render('auth/resetpassword.handlebars', {
                layout: 'auth', userId: decodedToken.data, success: req.flash('success'), error: req.flash('error'), helpers: {

                    /* check errorMessage*/
                    haveError: (value, options) => {
                        return value.length > 0 ? `<div class="alert alert-danger" role="alert">
                    ${value}
                </div>`: ''
                    },

                    /* check successMessage*/
                    haveSuccess: (value, options) => {
                        return value.length > 0 ? `<div class="alert alert-success" role="alert">
                    ${value}
                </div>`: ''
                    }
                }
            })
        }

        return res.redirect('/404')

    } catch (error) {
        res.redirect('/404')
    }

}

/* reset password handler*/
exports.resetPassword = async (req, res) => {
    const data = {
        password: req.body.password,
        confirmPassword: req.body.confirmpassword
    }

    /* password validation with YUP*/
    const validateResult = await changePasswordServices.passwordValidate(data)


    if (validateResult !== true) {
        req.flash('error', validateResult)
        return res.render('auth/resetpassword.handlebars', {
            layout: 'auth', userId: req.params.id, success: req.flash('success'), error: req.flash('error'),
            helpers: {
                haveError: (value, options) => {
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
    
    /* hash password service*/
    const hashedPassword = await hashServices.hashPassword(req.body.password)
    const result = await usersModel.changePassword(hashedPassword, req.params.id)
    if (result) {
        req.flash('success', 'رمزعبور با موفقیت تغییر یافت.')
        return res.redirect('/auth/login')
    }
}