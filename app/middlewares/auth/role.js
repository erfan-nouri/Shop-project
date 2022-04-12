const role = require('../../models/role')

/* check user role for access admin panel*/ 
module.exports = (req, res, next) => {

    if (req.session.user.role == role.USER) {
        res.redirect('/')
    }
    next()

}