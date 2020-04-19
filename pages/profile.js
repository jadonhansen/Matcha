var express = require('express');
var router = express.Router();
var Models = require("../models/models");

router.get('/', function(req, res){
   if(!req.session.name)
   {
      return(res.redirect("/oops"));
   }
   else
   {  
      Models.notifications.find({"email": req.session.name}, function(err, notif){
         Models.user.find({"likes" : req.session.name}, function(err, count){
            Models.user.findOne({"email":req.session.name}, function(err, doc){
               res.render("profile", {name: doc.name,
                                    surname: doc.surname,
                                    email: doc.email,
                                    username: doc.username,
                                    one: doc.main_image,
                                    two: doc.image_one,
                                    three: doc.image_two,
                                    four: doc.image_three,
                                    five: doc.image_four,
                                    views: doc.views,
                                    viewed: doc.viewed,
                                    likes: doc.likes,
                                    liked: count,
                                    rating: doc.fame,
                                    gender: doc.gender,
                                    prefferances: doc.prefferances,
                                    age: doc.age,
                                    count: notif.length,
                                    tags: doc.tags,
                                    location_status: doc.location_status,
                                    location: doc.location,
                                    bio: doc.bio});
                                 });
         });
      });
   }
});

module.exports = router;