//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'our little secret.',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_PATH);

const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    googleId: String,
    secreat: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model('User', userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile"] }));

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.get('/secrets', function(req, res) {
    User.find({"secreat" : {$ne:null}}, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                res.render('secrets', {usersWithSecreats: foundUser});
            }
        }
    });
});

app.get('/submit', function(req, res) {
    if (req.isAuthenticated()) {
        res.render('submit');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) {
          console.log(err);
        }
        res.redirect('/');
    });
});

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
});

app.post('/register', function(req, res) {
    User.register({username: req.body.username}, req.body.password, function(err, user) {
        if (err) {
            res.redirect('/register');
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect('/secrets');
            });
        }
    });
});

app.post('/login', function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, function(err) {
        if (err) { 
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect('/secrets');
            });
        }
      });
});

app.post('/submit', function(req, res) {
    const sec = req.body.secret;
    
    User.findById(req.user.id, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                foundUser.secreat = sec;
                foundUser.save(function() {
                    res.redirect('/secrets');
                });
            }
        }
    });
});

app.listen(3000, function() {
    console.log("server started from port 3000");
});