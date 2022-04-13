const contactusModel = require('../../../models/contactusModel.js')

exports.index = async (req, res, next) => {
    try {

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

    } catch (error) {
        next(error);
    }
}



/* set seen status*/
exports.seen = async (req, res, next) => {
    try {

        const result = await contactusModel.setSeen(req.params.messageid)

        if (result.affectedRows) {
            req.flash('success', 'تغییر وضعیت با موفقیت انجام شد.');
            return res.redirect('/admin/messages')
        }

        req.flash('error', 'تغییر وضعیت با مشکل روبه رو شد.')
        return res.redirect('/admin/messages')

    } catch (error) {
        next(error)
    }


}

/* set unseen status*/
exports.unSeen = async (req, res, next) => {
    try {
        const result = await contactusModel.setUnseen(req.params.mesffsageid)

        if (result.affectedRows) {
            req.flash('success', 'تغییر وضعیت با موفقیت انجام شد.');
            return res.redirect('/admin/messages')
        }

        req.flash('error', 'تغییر وضعیت با مشکل روبه رو شد.')
        return res.redirect('/admin/messages')

    } catch (error) {
        next(error)
    }

}