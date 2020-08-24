const express=require('express')
const mongoose=require('mongoose')
const PORT=process.env.PORT || 5000
const MongoClient=mongoose.MongoClient
const app=express()

const url = 'mongodb+srv://egnviku:db141528@cluster0-itvts.mongodb.net/TrackInvest?retryWrites=true&w=majority';


app.post("/data", (req,res)=>{
    var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TrackInvest");
  dbo.collection("trackinvest").find({}).toArray(function(err, result) {
    if (err) throw err;
    res.status(200).json({result})
    db.close();
  });
});
})

app.listen(PORT, (err)=>{
    if(!err){
        console.log("listen")
    }
})