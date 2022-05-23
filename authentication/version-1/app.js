//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');
var md5 = require('md5');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect(process.env.DB_PATH);

// in bcrypt
const saltRounds = 10;

const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

const User = new mongoose.model('User', userSchema);

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email: req.body.username,
            // password: md5(req.body.password) -----> use md5
            password: hash
        });
        newUser.save(function(err) {
            if(err) {
                console.log(err);
            } else {
                res.render('secrets');
            }
        });
    });
});

app.post('/login', function(req, res){
    const username = req.body.username;

    // using md5
    // const password = md5(req.body.password);

    const password = req.body.password;

    User.findOne({email: username}, function(err, foundResult) {
        if(err) {
            console.log(err);
        } else {
            if (foundResult) {
                // if(foundResult.password === password) {
                //     res.render('secrets');
                // } else {
                //     console.log("You don't have access");
                // }
                bcrypt.compare(password, foundResult.password, function(err, result) {
                    if(result == true) {
                        res.render('secrets');
                    } else {
                        console.log("You don't have access");
                    }
                });
            }
        }
    });
});

app.listen(3000, function() {
    console.log("server started from port 3000");
});