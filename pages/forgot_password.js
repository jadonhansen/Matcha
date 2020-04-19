var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');
var Model = require("../models/models");
var crypto = require('crypto');
var randomstring = require("randomstring");

router.get("/", (req,res) => {
   res.render("forgot_password");
})

router.post('/', bodyParser.urlencoded({extended: true}), function(req, res){
   Model.user.findOne({ email: req.body.email }, function(err, user) {
      if(user)
      {
         // emailer
         var safe = crypto.pbkdf2Sync(randomstring.generate(), '100' ,1000, 64, `sha512`).toString(`hex`);
         let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
               user: 'ftmatcha@gmail.com',
               pass: 'qwerty0308'
            }
         });
         var mailOptions = {
            to: req.body.email,
            subject: 'Dont be like that',
            text: 'Your reset password verification link, localhost:' + process.env.port + '/' + safe
         };
         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
               console.log(error);
            }
         });
         // updated verification string to ensure user authenticity via email
         Model.user.findOneAndUpdate({email : req.body.email}, {verif : safe}, function(err, doc){
            console.log("updated verif and sent mail verif:" + doc.verif);
         })
      }
   });
   res.redirect('/login');
});

module.exports = router;