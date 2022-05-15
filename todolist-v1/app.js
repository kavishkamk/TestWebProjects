const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();

const port = 3000;
const items = ["Buy foods", "Cook foods"];
const worklist = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

    

    res.render('list', {listTitle : date.getDate(), items: items});

});

app.post('/', function(req, res) {
    
    var item = req.body.newItem;

    if (req.body.list === "Work") {
        worklist.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', function(req, res) {
    res.render('list', {listTitle: "Work Page", items: worklist});
});

app.listen(port, function() {
    console.log("Server start on port " + port);
});