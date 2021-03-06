const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require('@mailchimp/mailchimp_marketing');
const https = require('https');

const port = 3000;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const mailchimpApiKey = '';
const serverName = '';
const listId = '';

// set mailchimp authentication
mailchimp.setConfig({
    apiKey: mailchimpApiKey,
    server: serverName,
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.mail;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/" + listId;
    const options = {
        method: 'POST',
        auth: 'kavishkamk:' + mailchimpApiKey
    }

    const requestt = https.request(url, options, function(result) {
        if(result.statusCode) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        result.on("data", function(datas) {
            console.log(JSON.parse(datas));
        });
    });

    requestt.write(jsonData);
    requestt.end();
});

app.post('/failure', function(req, res) {
    res.redirect('/');
});

app.listen(process.env.PORT || port, function() {
    console.log("Server start on port " + port);
});

