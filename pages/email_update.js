var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Models = require("../models/models");

router.get('/', function(req, res){
    var check = req.originalUrl.substring(7);
    console.log(check);
    Models.user.findOne(
        {"verif" : check}, function(err, _update){
            console.log(_update);
            Models.user.findOneAndUpdate(
                {"verif" : check},
                {$set : { email: _update.verif_email}}
                , function(err, _updater) {
                    res.redirect('/login');
                });
        });
});
router.post('/', function(req, res){
   res.send('POST route on Search_results');
});

//export this router to use in our index.js
module.exports = router;