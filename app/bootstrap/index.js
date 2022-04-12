const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const sessionStoreMysql = require('./sessionHandlers/mysql')(session)
const sessionStoreRedis = require('./sessionHandlers/redis')(session)
const expressFileUploader = require('express-fileupload')
var flash = require('connect-flash');

module.exports = (app) => {

  //* config static Files
  app.use('/static', express.static(path.join(__dirname, '../../public')));

  //* config View Engine
  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars')
  app.set('views', path.join(__dirname, '../views'));

  //* config body-parser & coockie-parser
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  //* config session (mysql & redis)
  app.use(session({
    store: sessionStoreMysql,
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    unset: 'destroy'

  }))

  //* config connect-flash
  app.use(flash());

  //* config file uploader
  app.use(expressFileUploader({
    createParentPath: true,
    tempFileDir: true
  }));

}

