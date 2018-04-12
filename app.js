const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//declare app use express framework
const app = express();

//Passport Config
require('./config/passport')(passport);

//Load routes into app
const auth = require('./routes/auth');
app.use('/auth',auth);


//config port and listen on port
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log('Server is running on port ' + port);
});

//home direct
app.get('/',(req,res) => {
    res.send('It works now');
});