var express = require('express');
var router = express.Router();
var Models = require("../models/models");
const bodyParser = require('body-parser');

router.post('/', bodyParser.urlencoded(), function(req, res){
   if(req.body.unique != '1')
   {
      if(req.body.like == '')
      {
         Models.user.findOneAndUpdate({"_id": req.body._id}, {$push: {notifications: req.session.name + " liked you"}}, function(err, doc){
            Models.user.findOneAndUpdate(
               {email : req.session.name},
               {$push :{likes: doc.email}},
               function(err, ret){
                  connected = '0';
                  if(doc.likes.includes(ret.email)){
                     connected = '1';
                  }
                  console.log("liked user\nupdated notifications");
                  res.render("matched_profile", {name : doc.name,
                                                surname:doc.surname,
                                                rating: doc.rating,
                                                gender: doc.gender,
                                                prefferances: doc.prefferances,
                                                age: doc.age,
                                                tags: doc.tags,
                                                location: doc.location,
                                                _id: doc._id,
                                                one :doc.images[0],
                                                two :doc.images[1],
                                                three :doc.images[2],
                                                four :doc.images[3],
                                                five :doc.images[4],
                                                count : ret.notifications.length,
                                                liked: "1",
                                                "connected": connected,
                                                bio: doc.bio});
            });
         });
      }
      else if(req.body.unlike == '')
      {
         Models.user.findOne({"_id": req.body._id}, function(err, doc){
            Models.user.findOneAndUpdate(
               {email : req.session.name},
               {$pull : {likes: doc.email}},
               function(err, ret){
                  console.log("unliked user");
                  res.render("matched_profile", {name : doc.name,
                                                surname:doc.surname,
                                                rating: doc.rating,
                                                gender: doc.gender,
                                                prefferances: doc.prefferances,
                                                age: doc.age,
                                                count : ret.notifications.length,
                                                tags: doc.tags,
                                                one :doc.images[0],
                                                two :doc.images[1],
                                                three :doc.images[2],
                                                four :doc.images[3],
                                                five :doc.images[4],
                                                location: doc.location,
                                                _id: doc._id,
                                                liked: "0",
                                                connected : "0",
                                                bio: doc.bio});
            });
         });
      }
      // get the back end for these next 2 working
      else if(req.body.fake == '')
      {
         Models.user.findOne({email : req.session.name}, function(err, check){
            Models.user.findOneAndUpdate({"_id" : req.body._id}, {$push : {reports: req.session.name + " reported:\n" + req.body.details}}, function(err, doc){
               connected = '0';
               liked = '0';
               if(check.likes)
               {
                  if(check.likes.includes(doc.email))
                  {
                     liked = '1';
                     if(doc.likes.includes(check.email))
                        connected = '1';
                  }
               }
               res.render("matched_profile", {name : doc.name,
                                             surname:doc.surname,
                                             rating: doc.rating,
                                             gender: doc.gender,
                                             prefferances: doc.prefferances,
                                             count : check.notifications.length,
                                             age: doc.age,
                                             one :doc.images[0],
                                             two :doc.images[1],
                                             three :doc.images[2],
                                             four :doc.images[3],
                                             five :doc.images[4],
                                             tags: doc.tags,
                                             location: doc.location,
                                             _id: doc._id,
                                             "liked": liked,
                                             "connected": connected,
                                             bio: doc.bio});
            });
            console.log("reported fake user");
         });
      }
      else if(req.body.block == '')
      {
         Models.user.findOne({"_id" : req.body._id}, function(err, doc){
            Models.user.findOneAndUpdate({email : req.session.name}, {$push :{blocked : doc.email}}, function(err, check){
               connected = '0';
               liked = '0';
               if(check.likes)
               {
                  if(check.likes.includes(doc.email))
                  {
                     liked = '1';
                     if(doc.likes.includes(check.email))
                        connected = '1';
                  }
               }
               res.render("matched_profile", {name : doc.name,
                                             surname:doc.surname,
                                             rating: doc.rating,
                                             gender: doc.gender,
                                             prefferances: doc.prefferances,
                                             age: doc.age,
                                             tags: doc.tags,
                                             one :doc.images[0],
                                             two :doc.images[1],
                                             three :doc.images[2],
                                             four :doc.images[3],
                                             five :doc.images[4],
                                             location: doc.location,
                                             count : check.notifications.length,
                                             _id: doc._id,
                                             "liked": liked,
                                             "connected": connected,
                                             bio: doc.bio});
            });
            console.log("blocked user");
         });
      }
      else
      {
         Models.user.findOne({email : req.session.name}, function(err, check){
            Models.user.findOne({"_id" : req.body._id}, function(err, doc){
               connected = '0';
               liked = '0';
               if(check.likes)
               {
                  if(check.likes.includes(doc.email))
                  {
                     liked = '1';
                     if(doc.likes.includes(check.email))
                        connected = '1';
                  }
               }
            res.render("matched_profile", {name : doc.name,
                                          surname:doc.surname,
                                          rating: doc.rating,
                                          gender: doc.gender,
                                          prefferances: doc.prefferances,
                                          age: doc.age,
                                          one :doc.images[0],
                                          two :doc.images[1],
                                          three :doc.images[2],
                                          four :doc.images[3],
                                          five :doc.images[4],
                                          count : check.notifications.length,
                                          tags: doc.tags,
                                          location: doc.location,
                                          _id: doc._id,
                                          "liked": liked,
                                          "connected": connected,
                                          bio: doc.bio});
            });
         });
      }
   }
   // start of the psuedo get
   else{

      Models.user.findOne({email : req.session.name}, function(err, check){
         Models.user.findOneAndUpdate({"_id" : req.body._id}, {$push : {"notifications" : check.username + " viewed your profile"}}, function(err, doc){
            connected = '0';
            liked = '0';
            if(check.likes)
            {
               if(check.likes.includes(doc.email))
               {
                  liked = '1';
                  if(doc.likes.includes(check.email))
                     connected = '1';
               }
            }
            res.render("matched_profile", {name : doc.name,
                                          surname:doc.surname,
                                          rating: doc.rating,
                                          gender: doc.gender,
                                          prefferances: doc.prefferances,
                                          age: doc.age,
                                          one :doc.images[0],
                                          two :doc.images[1],
                                          three :doc.images[2],
                                          four :doc.images[3],
                                          five :doc.images[4],
                                          tags: doc.tags,
                                          count : check.notifications.length,
                                          location: doc.location,
                                          _id: req.body._id,
                                          "liked": liked,
                                          "connected": connected,
                                          bio: doc.bio});
         });
      })
   }
});

//export this router to use in our index.js
module.exports = router;