const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const PORT=process.env.PORT || 5000
const USERNAME=process.env.USERNAME
const PASSWORD=process.env.PASSWORD
const MongoClient=mongoose.MongoClient
const app=express()

const url = 'mongodb+srv://${USERNAME}:${PASSWORD}@cluster0-itvts.mongodb.net/TrackInvest?retryWrites=true&w=majority';


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

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('myapp/build'))
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'myapp', 'build', 'index.html'))
  })
}
app.listen(PORT, ()=> console.log("Server started"))
