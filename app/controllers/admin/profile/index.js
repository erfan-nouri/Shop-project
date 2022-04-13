const role = require('../../../models/role.js')
const dateService = require('../../../services/dateService.js');
const userModel = require('../../../models/users.js')

/* profile page*/
exports.index = async (req, res, next) => {
    try {

        const user = await userModel.checkUser(req.session.user.email)
        user.created_at = dateService.toPersianDate(user.created_at)
        res.adminRender('admin/profile/index.handlebars', {
            user, error: req.flash('error'), success: req.flash('success'), helpers: {

                /* set role name*/
                roleUser: (value, options) => {
                    return value == role.ADMIN ? 'ادمین' : value == role.AUTHOR ? 'نویسنده' : 'کاربر'

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
        })
    } catch (error) {
        next(error)
    }
}