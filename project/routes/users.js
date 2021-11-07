var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('User', User);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
