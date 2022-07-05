const express = require("express");
const res = require("express/lib/response");
const app = express();
const path = require ("path")
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const port=550;

//For connecting mongoose to the database
mongoose.connect('mongodb://localhost/dance_mycontact', {useNewUrlParser: true});

var ContactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String
  });

  var Contact = mongoose.model('Contact', ContactSchema);

  


app.use('/static' , express.static('static'))

app.set('view engine' , 'pug')

app.set('views', path.join(__dirname, 'views'))

app.get("/",(req,res)=>{
    params={'title': 'Dance Academy'}
    res.status(200).render("Home.pug", params);
})
app.get("/contact",(req,res)=>{
   // params={'title': 'Dance Academy'}
    res.status(200).render("contact.pug");
})

//  Post request for contact form < For this purpose we need a module named as body parser to get data in database from form>
app.post("/contact",(req,res)=>{
  var mydata = new Contact(req.body);
  mydata.save()
  .then(()=>{
     res.send("Your data is saved into the database") }
  ).catch(()=>{
    res.send("Your data is not saved to the database")
    });

});


app.listen(port , () =>{
    console.log(`I am listening on port ${port}`);
})





