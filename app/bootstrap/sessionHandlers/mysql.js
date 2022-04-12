module.exports = session => {

    const MySQLStore = require('express-mysql-session')(session);
    var options = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
        password: process.env.MYSQL_PASSWORD
    };
    return new MySQLStore(options);
}