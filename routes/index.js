'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// const fetch = require('isomorphic-fetch')
// const axios = require('axios')


// var url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token='
var express = require('express');
var router = express.Router();
var config = require('../config').instagram;
var api = require('instagram-node').instagram();
var INSTA_API = require('instagram-api');

api.use({ client_id: process.env.client_id, client_secret: process.env.client_secret });

var sess;

exports.home = router.get('/', function (req, res) {
  var userImages = [];
  sess = req.session;
  if (!sess.access_token) {
    res.redirect('/authorize_user');
  } else {
    var instagramAPI = new INSTA_API(sess.access_token);

    instagramAPI.userSelfMedia().then(function (result) {
      userImages.push.apply(userImages, _toConsumableArray(result.data));
      console.log(userImages[0]);
      res.render('index.html', {
        title: "Memory",
        userImages: userImages
      });
    }, function (err) {
      console.log(err); // error info 
    });
  }
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
      res.redirect('/');
    }
  });
};

// function recentImages(url, callback){

//   fetch(`${url}${session.access_token}`)
//   .then(function(response){  
//     if (response.status !== 200) {  
//       console.log('Looks like there was a problem. Status Code: ' +  
//         response.status);  
//     }  
//     response.json()
//     .then(function(data) {  
//       console.log(data)
//       return images.push(...data)
//     });  
//   });
// }


// .then(data=> cities.push(...data))
// var recentImages = (req) => {
//   var userImages = []

//   if (req.session.access_token){
//     fetch(`${url}${req.session.access_token}`)
//     .then((response)=>{  
//       if (response.status !== 200) {
//         console.log(`Looks like there was a problem. Status Code: ${response.status}`)
//       }  
//       return response.json()
//     }).then((data)=> {
//       userImages.push(...data)
//     });  
//   }
//   else {
//     console.log('need to auth')
//   }
//   return userImages
// } 

// var userImages = []

// var recentImages = (req) => {
//   return new Promise((resolve, reject)=>{
//     fetch(`${url}${req.session.access_token}`)
//     .then((response)=>{  
//       // if (response.status !== 200) {
//       //   console.log(`Looks like there was a problem. Status Code: ${response.status}`)
//       // }  
//       return response.json()
//     })
//     .then((data)=> {
//       return data
//     })
//     .catch((e)=> console.log('e', e)) 

//   })
//   // }, (error, response, body)=> {
//   //     if (error) {
//   //       reject('there was an error')
//   //     } else {
//   //       resolve(response)
//   //     }
//   //   }
// }


// // =========

// var getImages = (req) =>{
//   axios.get(`${url}${req.session.access_token}`)
//   .then((response)=>{
//     console.log(userImages)
//     return userImages.push(...response.data)
//   })
//   .catch((e)=>{
//     console.log(e)
//   })
// }

// exports.home = (req, res) => {
//   var userImages = getImages(req)

//   res.render('index.html', {
//     title: "Memory",
//     userImages
//   })
// };

// module.exports = router;