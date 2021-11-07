/* ongoDB test */
var MongoClient = require("mongodb").MongoClient;
 
// 接続文字列
var url = "mongodb://localhost:27017/test";
 
// MongoDB へ 接続
MongoClient.connect(url, (error, client) => {
    var collection;
    const db = client.db("test");
    // 接続メッセージを表示
    console.log("MongoDB へ 接続中...");

    // get collention
    collection = db.collection("test");
    
    // insert collection
    collection.insertOne({
      "name":"nodejstest",
      "num":1821121
    },(error, result) => {
            // MongoDB への 接続 を 切断
      client.close();
    });
});