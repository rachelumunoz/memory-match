require('dotenv').config();
// require("babel-polyfill");

const http = require('http');
const express = require('express');
const api = require('instagram-node').instagram();
const session = require('express-session');
const nunjucks  = require('nunjucks');
const logger = require('morgan');
const index = require('./routes/index')
const apiRoutes = require('./routes/api')

const app = express()

app.use(express.static(__dirname + '/public'))

app.use(logger('dev'));

app.set('view engine', 'njx')

nunjucks.configure('views', {
  autoescape: true,
  express : app
});

// app.set('trust proxy', 1)

app.use(session({
  secret: process.env.sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: { secure : false}
}))

// app.get('/', (req, res)=>{
//   res.render('index',{
//     title: 'foo'
//   })
// });

app.use('/', index.home);

app.use('/authorize_user', index.authorize_user);
app.use('/handleauth', index.handleauth);

app.get('/test', (req, res)=>{
  res.render('test',{
    title: 'foo'
  })
})


app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



