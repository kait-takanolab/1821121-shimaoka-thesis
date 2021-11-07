var express = require('express');
var blockly = require('blockly');
var router = express.Router();
var app = express();





app.use(express.static('public'))

// サーバーをポート 3000 で起動
app.listen(3000, () =>{
  // アプリケーション開始ログ
console.log('Server running at http://localhost:3000');
});

module.exports = router;
