const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { redirect } = require('express/lib/response');
const date = require(__dirname + "/date.js");

const app = express();

const port = 3000;

// connect to mongo db (todoListDB)
mongoose.connect('mongodb://localhost:27017/todoListDB');

const itemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({name: "First Task"});
const item2 = new Item({name: "Task Two"});
const item3 = new Item({name: "Task Three"});

const defaultArray = [item1, item2, item3];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

    Item.find({}, function(err, result){

        if(result.length === 0) {
            Item.insertMany(defaultArray, function(errs, docs) {
                if(errs) {
                    console.log(errs);
                } else {
                    console.log("Added default Item with no Errors");
                }
            });
            res.redirect('/');
        } else {
            if(err) {
                console.log(err);
            } else {
                res.render('list', {listTitle : date.getDate(), items: result, routpath: "\\", dateFree: 0});
            }
        }
    });

});

app.post('/', function(req, res) {
    
    var item = req.body.newItem;

    const tempItem = new Item({name: item});
    tempItem.save();
    res.redirect('/');
});

app.post('/delete', function(req, res) {
    
   const selectedId = req.body.checkBox;
   const dateFree = req.body.dateFree;
   const listName = req.body.listName;
   console.log(selectedId);
   console.log(dateFree);
   console.log(listName);

   var listModel = Item;
   var path = '/';
   
   if(dateFree == 1) {
       listModel = mongoose.model(listName + "Item", itemSchema);
       path = '/' + listName;
   }
   listModel.findByIdAndRemove(selectedId, function(err, docs) {
       if(err) {
           console.log(err);
       } else {
           console.log("Removed successfully");
       }
   });

   res.redirect(path);

});

app.get('/:newpage', function(req, res) {

    const newpage = req.params.newpage;
    const TempItem = mongoose.model(newpage + "Item", itemSchema);

    TempItem.find({}, function(err, result){
        if(err) {
            console.log(err);
        } else {
            res.render('list', {listTitle: newpage, items: result, routpath: newpage, dateFree: 1});
        }
    });
});

app.post('/:newpage', function(req, res) {
    const TempItem = mongoose.model(req.params.newpage + "Item", itemSchema);
    const tempItem = new TempItem({name: req.body.newItem});
    tempItem.save();
    res.redirect('/' + req.params.newpage);
});

app.listen(port, function() {
    console.log("Server start on port " + port);
});