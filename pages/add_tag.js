var express = require('express');
var router = express.Router();
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var Models = require("../models/models");

router.post('/', bodyParser.urlencoded(), function(req, res){

    Models.user.findOneAndUpdate(
        { email : req.session.name },
        { $push : { tags: req.body.tag}}
        , function(err, _update) {
            res.redirect('/profile');
            console.log("added tag");
      });
});

 module.exports = router;