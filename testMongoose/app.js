const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check. No name spesified"]
    },
    rating : {
        type: Number,
        min: 1,
        max: 10
    },
    review : String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 10,
    review: "pretty solid as a food."
});

fruit.save();

Fruit.find({}, function(err, fruits) {
    if(err) {
        console.log(err);
    } else {
        fruits.forEach(element => {
            console.log(element);
        });
    }
});

Fruit.updateOne({name: "Apple"}, {name : "Peach"}, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Successfully updated the document");
    }
});

Fruit.deleteOne({name: "Peach"}, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Deleted");
    }
});

Fruit.find({}, function(err, fruits) {
    if(err) {
        console.log(err);
    } else {
        mongoose.connection.close();
        fruits.forEach(element => {
            console.log(element);
        });
    }
});