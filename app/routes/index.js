const adminRouter = require('./admin/index.js')
const authRouter = require('./auth/index.js')
const guestMiddleware = require('../middlewares/auth/guest.js')
const roleMiddlewares = require('../middlewares/auth/role.js')
const adminMiddlewares = require('../middlewares/auth/admin.js')
const frontRouter = require('./front/index.js')
const authController = require('../controllers/auth/index.js')

module.exports = (app) => {


    app.use('/admin', [adminMiddlewares], [roleMiddlewares], adminRouter);
    app.use('/auth', [guestMiddleware], authRouter);
    app.use('/', frontRouter)
    app.get('/logout', authController.logout)


}