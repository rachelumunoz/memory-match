const express = require('express');
const router = express.Router();
const config = require('../config').instagram;
const api = require('instagram-node').instagram();
const INSTA_API = require('instagram-api');
const nunjucks  = require('nunjucks');

var sess;

api.use({ client_id: process.env.client_id, client_secret: process.env.client_secret });
 
Array.prototype.shuffleTiles = function(){
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
  var error = req.session.error
  
  res.render('index');
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
  sess = req.session;

  if (!sess.access_token) {
    res.redirect('/authorize_user');
  } else {
    var instagramAPI = new INSTA_API(sess.access_token);

    instagramAPI.userSelfMedia().then((result)=> {
      var userImages = [];
      userImages.push(...result.data);

      if (userImages.length < 10){
        var count = 10 - userImages.length;
        var error = `Uh oh, looks like you need ${count} more images to play!`
      };

      var shuffled = userImages.shuffleTiles().splice(0, 10).doubleThem().shuffleTiles()

      res.render('game.njx', {
        title: "Memory Match",
        userImages: shuffled,
        error
      });
    }, function (err) {
      console.log(err); // error info 
    });
  }
});


