const express = require('express');
const router = express.Router();
const config = require('../config').instagram;
const api = require('instagram-node').instagram();
const INSTA_API = require('instagram-api');
const nunjucks  = require('nunjucks');

var sess;

api.use({ client_id: process.env.client_id, client_secret: process.env.client_secret });
 
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, randomIndex, temp;
    while(0 !== i){
      randomIndex = Math.floor(Math.random() * i );
      i--;
      
      temp = this[i];
      this[i] = this[randomIndex];
      this[randomIndex] = temp;
    }
    return this;
}

Array.prototype.doubleThem = function(){
  var that = this;
  this.map(function(item) {
    var doubledItem = item
    that.push(doubledItem)
  })
 return this;
}

exports.home = router.get('/',(req, res)=> {
  res.render('index.html');
});

exports.authorize_user = (req, res) =>{
  res.redirect(api.get_authorization_url(config.redirect_uri, { scope: config.scope, state: config.state }));
};

exports.handleauth = (req, res) =>{
  sess = req.session;
  api.authorize_user(req.query.code, config.redirect_uri, function (err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      sess.access_token = result.access_token;
      res.redirect('/game');
    }
  });
};

exports.game = router.get('/game',(req, res)=>{
  var userImages = [];
  sess = req.session;
  
  if (!sess.access_token) {
    res.redirect('/authorize_user');
  } else {
    var instagramAPI = new INSTA_API(sess.access_token);

    instagramAPI.userSelfMedia().then((result)=> {
      userImages.push(...result.data);
      console.log(userImages[0].images.thumbnail.url);

      var shuffled = userImages.memory_tile_shuffle().splice(0, 10).doubleThem()

      res.render('game.njx', {
        title: "Memory Match",
        userImages: shuffled
      });
    }, function (err) {
      console.log(err); // error info 
    });
  }
});

exports.notFound = router.get('*', (req, res)=>{
  res.render('notFound.html')
})