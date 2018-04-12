const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//declare app use express framework
const app = express();

//Load model of mongoDB into app
require('./models/User');
//Passport Config
require('./config/passport')(passport);

//MongoDB Config
const keys = require('./config/keys');
//Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect and work with MongoDB
mongoose.connect(keys.mongoURI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch(err => console.log("Error connect to MongoDB: " + err));

//Session and Cookie-Parser 
app.use(cookieParser());
app.use(session({
    secret : 'secret',
    resave: false,
    saveUninitialized: false
}));

//Passport Middleware : use session js to keep on login user
app.use(passport.initialize());
app.use(passport.session());

//config port and listen on port
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log('Server is running on port ' + port);
});

//Load routes into app
const auth = require('./routes/auth');
app.use('/auth',auth);

//home direct
app.get('/',(req,res) => {
    res.send('It works now');
});