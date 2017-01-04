'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var express = require('express');
var router = express.Router();
var config = require('../config').instagram;
var api = require('instagram-node').instagram();
var INSTA_API = require('instagram-api');
var nunjucks = require('nunjucks');

var sess;

api.use({ client_id: process.env.client_id, client_secret: process.env.client_secret });

Array.prototype.shuffleTiles = function () {
  var i = this.length,
      randomIndex,
      temp;
  while (0 !== i) {
    randomIndex = Math.floor(Math.random() * i);
    i--;

    temp = this[i];
    this[i] = this[randomIndex];
    this[randomIndex] = temp;
  }
  return this;
};

Array.prototype.doubleThem = function () {
  var that = this;
  this.map(function (item) {
    var doubledItem = item;
    that.push(doubledItem);
  });
  return this;
};

exports.home = router.get('/', function (req, res) {
  res.render('index.html');
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

exports.game = router.get('/game', function (req, res) {
  var userImages = [];
  sess = req.session;

  if (!sess.access_token) {
    res.redirect('/authorize_user');
  } else {
    var instagramAPI = new INSTA_API(sess.access_token);

    instagramAPI.userSelfMedia().then(function (result) {
      userImages.push.apply(userImages, _toConsumableArray(result.data));

      //if not enough images || not using insta, render premade cards,
      //else use their iamges


      var shuffled = userImages.shuffleTiles().splice(0, 10).doubleThem().shuffleTiles();

      res.render('game.njx', {
        title: "Memory Match",
        userImages: shuffled
      });
    }, function (err) {
      console.log(err); // error info 
    });
  }
});