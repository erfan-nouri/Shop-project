module.exports = app => {

          app.use((error, req, res, next) => {

                    if (!error) {
                              next();
                    }

                    return res.render('errorPage.handlebars', { layout: '' })

          })
}