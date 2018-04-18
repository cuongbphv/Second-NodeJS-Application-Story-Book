const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const path = require('path');

//declare app use express framework
const app = express();

//Config folder contains css and js
app.use(express.static(path.join(__dirname, '/assets')));

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

//Express-handlebars Middleware
app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Session and Cookie-Parser Middleware
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//Passport Middleware : use session js to keep on login user
app.use(passport.initialize());
app.use(passport.session());

//config port and listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

// Set global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null; // get user by cookie and session
    next();
});

//Load routes into app
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');
app.use('/auth', auth);
app.use('/', index);
app.use('/stories', stories);
