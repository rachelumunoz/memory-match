'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var express = require('express');
var router = express.Router();
var config = require('../config').instagram;
var api = require('instagram-node').instagram();
var INSTA_API = require('instagram-api');
var sess;

api.use({ client_id: process.env.client_id, client_secret: process.env.client_secret });

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
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




exports.home = router.get('/', function (req, res) {
  
  res.send('made it home')
});

exports.authorize_user = function (req, res) {
  res.redirect(api.get_authorization_url(config.redirect_uri, { scope: config.scope, state: config.state }));
};

exports.handleauth = function (req, res) {
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

exports.game = router.get('/game', function (req, res){
  var userImages = [];
  sess = req.session;
  if (!sess.access_token) {
    res.redirect('/authorize_user');
  } else {
    var instagramAPI = new INSTA_API(sess.access_token);

    instagramAPI.userSelfMedia().then(function (result) {
      userImages.push.apply(userImages, _toConsumableArray(result.data));
      console.log(userImages[0].images.thumbnail.url);

      var shuffled = userImages.memory_tile_shuffle().splice(0, 10).doubleThem()

      res.render('game', {
        title: "Memory Match",
        userImages: shuffled
      });
    }, function (err) {
      console.log(err); // error info 
    });
  }
});