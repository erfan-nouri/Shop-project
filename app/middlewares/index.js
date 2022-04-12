/* set layour for render*/
module.exports = app => {

    app.use((req, res, next) => {
        let user = null;
        let loggedIn = false;
        if (req.session.user) {
            user = req.session.user;
        }
        res.adminRender = (template, option) => {

            res.render(template, { layout: 'admin', user, ...option });

        }
        res.frontRender = (template, option) => {
            if (user) {
                loggedIn = true;
            } else { loggedIn = false; }

            res.render(template, { layout: 'front', user, loggedIn, ...option });

        }
        res.dashboardRender = (template, option) => {

            res.render(template, { layout: 'frontDashboard', user, ...option })
        }
        next();
    })

}