/* 404  handler */
module.exports = app => {

    app.use((req, res, next) => {

        return res.render('404.handlebars', { layout: false })

    })
}

