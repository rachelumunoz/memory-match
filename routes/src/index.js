const express = require('express');
const router = express.Router();
const config = require('../config').instagram;
const api = require('instagram-node').instagram();
const INSTA_API = require('instagram-api');
const nunjucks  = require('nunjucks');

var sess;

api.use({ client_id: process.env.client_id, client_secret: process.env.client_secret });
 

exports.home = function(req, res){
  // var userImages = [];
  // sess = req.session;
  //  if (!sess.access_token) { 
  //   res.redirect('/authorize_user');
  // }else {
  //   var instagramAPI = new INSTA_API(sess.access_token);

  //   instagramAPI.userSelfMedia().then(function(result) {
  //   userImages.push(...result.data)
  //   console.log(userImages[0].images.thumbnail.url)
    
  //   res.render('index', {
  //     title: "foundry"
  //   })
  // } , function(err){
  //   console.log(err); // error info 
  // });
  res.send('hello')
};

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(config.redirect_uri, { scope: config.scope , state: config.state }));
};
 
exports.handleauth = function(req, res) {
  sess = req.session; 
  api.authorize_user(req.query.code, config.redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      sess.access_token = result.access_token
      res.redirect('/game')
    }
  });
};




