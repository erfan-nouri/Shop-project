const express = require('express')
const app = express();

require('./bootstrap/index.js')(app)
require('./middlewares/index.js')(app)
require('./routes/index.js')(app)
require('./middlewares/errorHandler')(app)
require('./middlewares/404.js')(app)


module.exports = () => {
    app.listen(process.env.APP_PORT, () => {
        console.log(`app is runnig on port ${process.env.APP_PORT}`);
    })
}