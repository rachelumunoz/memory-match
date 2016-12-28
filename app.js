require('dotenv').config();

const http = require('http');
const express = require('express')
const api = require('instagram-node').instagram()
const app = express()


api.use({
  client_id: '6ed838ccc31e433982dd0db2fc435a46',
  client_secret: '6d42358538ee4b21a48ab7dd113d12eb'
})


const redirect_uri = 'http://127.0.0.1/handleauth';

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};
 
exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};

app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI 
app.get('/handleauth', exports.handleauth);
 

app.get('/', )


app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



