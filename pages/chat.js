var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on Chat');
});
router.post('/', function(req, res){
   res.send('POST route on Chat');
});

//export this router to use in our index.js
module.exports = router;