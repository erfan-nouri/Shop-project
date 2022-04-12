/* check login from session */
module.exports = (req, res, next) => {

    if (!req.session.hasOwnProperty('user')) {
        return res.redirect('/')
    }
    next()
}