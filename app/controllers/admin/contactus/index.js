const contactusModel = require('../../../models/contactusModel.js')

exports.index = async (req, res) => {
    /* get all message */
    const messages = await contactusModel.showAll();

    /*render*/
    res.adminRender('admin/contactus/messageList.handlebars', {
        messages, error: req.flash('error'), success: req.flash('success'), helpers: {

            /* set class for background color */
            checkState: (value, options) => {
                return value == 1 ? 'alert-success' : 'alert-danger'
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
}



/* set seen status*/
exports.seen = async (req, res) => {
    const result = await contactusModel.setSeen(req.params.messageid)

    if (result) {
        req.flash('success', 'تغییر وضعیت با موفقیت انجام شد.');
        return res.redirect('/admin/messages')
    }

    req.flash('error', 'تغییر وضعیت با مشکل روبه رو شد.')
    return res.redirect('/admin/messages')


}

/* set unseen status*/
exports.unSeen = async (req, res) => {

    const result = await contactusModel.setUnseen(req.params.messageid)

    if (result) {
        req.flash('success', 'تغییر وضعیت با موفقیت انجام شد.');
        return res.redirect('/admin/messages')
    }

    req.flash('error', 'تغییر وضعیت با مشکل روبه رو شد.')
    return res.redirect('/admin/messages')
}