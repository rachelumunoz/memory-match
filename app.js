require('dotenv').config();

const http = require('http');
const express = require('express')
const api = require('instagram-node').instagram()
const app = express()
const session = require('express-session')
const nunjucks  = require('nunjucks');

const routes = require('./app/routes')

api.use({
  client_id: process.env.client_id,
  client_secret: process.env.client_secret
})

app.set('view engine', 'nunjucks')
nunjucks.configure('app', {
  autoescape: true,
  express   : app
});

app.set('trust proxy', 1)
app.use(session({
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure : false}
}))


const redirect_uri = 'http://127.0.0.1:3000/handleauth';

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};
 
 //need templates
exports.handleauth = function(req, res) {
   
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      // console.log('Yay! Access token is ' + result.access_token);
      req.session.access_token = result.access_token
      res.send('You made it!!');
    }
  });
};

app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI 
app.get('/handleauth', exports.handleauth);
 
app.get('/', routes.home)




app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



