const usersModel = require('../../models/users.js')
const loginservice = require('../../services/loginService.js')
const registerService = require('../../services/registerService.js')
const passwordService = require('../../services/hashService.js')
const axios = require('axios')
const mailerServices = require('../../services/mailerServices.js')
const httpService = require('../../services/httpService')

/* login page*/
exports.showLogin = (req, res) => {

    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );

    /* render*/
    res.render('auth/login.handlebars', {
        layout: 'auth', error: req.flash('error'), success: req.flash('success'), helpers: {
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

/* handle login request*/
exports.doLogin = async (req, res) => {

    /* google recaptcha*/
    if (!req.body['g-recaptcha-response'] || req.body['g-recaptcha-response'] == null || req.body['g-recaptcha-response'] == "") {
        req.flash('error', 'اعتبار سنجی recaptcha الزامی است.')
        return res.redirect('/auth/login')
    }
    else {
        const recapchaResponse = await httpService.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECPTCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`, {}, {
            Accept: 'application/json',
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        })

        if (recapchaResponse.data.success) {

            /* login data validator with YUP*/
            const validateResult = await loginservice.validator(req.body.email);

            if (validateResult == true) {

                /* login data validator with YUP*/
                let result = await loginservice.checkUser(req.body.email, req.body.password)
                if (result.error == false) {
                    req.session.user = result.user;
                    req.session.basket = [];
                    res.redirect('/dashboard');
                } else {
                    req.flash('error', 'اطلاعات وارد شده صحیح نمیباشد.')
                    res.redirect('/auth/login')
                }
            } else {
                req.flash('error', `${validateResult}`)
                res.redirect('/auth/login')
            }
        }
        else {
            req.flash('error', 'در اعتبارسنجی recaptcha مشکلی یپش آمده است.')
            return res.redirect('/auth/login');
        }
    }


}


/* register page*/
exports.showRegister = (req, res) => {

    /* render*/
    res.render('auth/register.handlebars', {
        layout: 'auth', error: req.flash('error'), helpers: {

            /* check errorMessage*/
            haveError: (value, options) => {
                return value.length > 0 ? `<div class="alert alert-warning" role="alert">${value}</div>` : ''
            }
        }
    })


}

/* handle register request*/
exports.doRegister = async (req, res) => {

    /* google recaptcha*/
    if (!req.body['g-recaptcha-response'] || req.body['g-recaptcha-response'] == null || req.body['g-recaptcha-response'] == "") {
        req.flash('error', 'اعتبار سنجی recaptcha الزامی است.')
        return res.redirect('/auth/register')
    }

    else {
        const recapchaResponse = await httpService.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECPTCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`, {}, {
            Accept: 'application/json',
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        })



        if (recapchaResponse.data.success) {

            /* register data validator with YUP*/
            const validateResult = await registerService.validator(req.body);

            if (validateResult == true) {
                const data = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: await passwordService.hashPassword(req.body.password)
                }
                try {

                    /* send successfuly email*/
                    req.flash('success', 'ثبت نام با موفقیت انجام شد.')
                    await usersModel.insertUser(data);
                    await mailerServices.sendMail(data.email, 'ثبت نام شما با موفقیت انجام شد.', 'در حال حاضر شما عضوی از عرفشاپ هستید.')
                    return res.redirect('/auth/login')

                } catch (error) {

                    req.flash('error', 'کاربری با این ایمیل قبلا ثبت نام کرده است.')
                    return res.redirect('/auth/register')

                }
            }

            else {
                req.flash('error', `${validateResult}`)
                return res.redirect('/auth/register')
            }
        } else {
            req.flash('error', 'اعتبار سنجی recaptcha الزامی است.');
            return res.redirect('/auth/register')
        }
    }

}

/* handle logout*/

exports.logout = (req, res) => {
    
    req.session.destroy();
    res.redirect('/auth/login')

}
