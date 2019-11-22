var express = require('express');
var router = express.Router();
const app = express();
const bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(`mongodb+srv://gstrauss:qwerty0308@matcha-ch0yb.gcp.mongodb.net/test?retryWrites=true&w=majority`);
app.use(bodyParser.urlencoded({ extended: true }));
var Model = require("../models/models");
var crypto = require('crypto');
var session = require('express-session');

router.post('/login', bodyParser.urlencoded(), function(req, res){
   
   Model.user.findOne({ email: req.body.email }, function(err, user) {

      if(user)
      {
         var safe = crypto.pbkdf2Sync(req.body.password, '100' ,1000, 64, `sha512`).toString(`hex`);

            if(user.password == safe && user.isverified == 1)
            {
               req.session.name = req.body.email;  
               res.redirect('/profile');
            }
            else
            res.send("Somethings wrong, please ensure you verified your account by following the link and that you typed your password in correctly");
               // res.redirect('/login');
      }
   });
});

//export this router to use in our index.js
module.exports = router;