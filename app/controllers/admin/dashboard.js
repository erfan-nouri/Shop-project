/* dashboard page*/
exports.index = (req, res, next) => {
    try {
        res.adminRender('admin/index.handlebars')

    } catch (error) {
        next(error)
    }

}