const express = require('express');
const mongoose = require('mongoose');

//declare app use express framework
const app = express();

//Config database
const db = require('./config/database');
//Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect and work with MongoDB
mongoose.connect(db.mongoURI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch(err => console.log("Error connect to MongoDB: " + err));

//config port and listen on port
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log('Server is running on port ' + port);
});


//home direct
app.get('/',(req,res) => {
    res.send('It works now');
});