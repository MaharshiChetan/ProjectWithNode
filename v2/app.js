var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);
/* Campground.create(
    {
        name: "Delhi",
        image: "https://farm8.staticflickr.com/7010/6681429877_1dab894027.jpg"
    }, (err, campground) => {
        if (err) {
            console.log("An error occured while creating a campground.");
        } else {
            console.log("Campground successfully created.");
            console.log(campground);
        }
    }
);
 */
app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    // Get all the camgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else{
            res.render('campgrounds', { campgrounds: allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.post("/campgrounds", (req, res) => {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    // Create a new campground and save to database
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});


app.listen(4000, () => {
    console.log("YelpCamp server has started");
});