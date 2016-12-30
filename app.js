require('dotenv').config();
// require("babel-polyfill");

const http = require('http');
const express = require('express');
const api = require('instagram-node').instagram();
const session = require('express-session');
const nunjucks  = require('nunjucks');
const logger = require('morgan');
// const routes = require('./routes')
const index = require('./routes/index')
const apiRoutes = require('./routes/api')

const app = express()

app.use(express.static(__dirname + '/public'))

// api.use({
//   client_id: process.env.client_id,
//   client_secret: process.env.client_secret
// })

app.use(logger('dev'));

app.set('view engine', 'nunjucks')
nunjucks.configure('views', {
  autoescape: true,
  express   : app
});

app.set('trust proxy', 1)

app.use(session({
  secret: process.env.sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: { secure : false}
}))

app.use('/', index.home);
app.use('/authorize_user', index.authorize_user)
app.use('/handleauth', index.handleauth)

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



