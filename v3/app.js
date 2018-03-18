var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");

app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelp_camp_v3");

seedDB();

// SCHEMA SETUP

/* Campground.create(
    {
        name: "Igatpuri",
        image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f0c87ea6e5bdbf_340.jpg",
        description: "This is a very beautiful place, one should visit atleast once in a lifetime."
    }
); */
app.get('/', (req, res) => {
    res.render('landing');
});
// INDEX - show all campgrounds
app.get('/campgrounds', (req, res) => {
    // Get all the camgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else{
            res.render('index', { campgrounds: allCampgrounds});
        }
    });
});
// NEW - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});
// CREATE - add new campground to DB
app.post("/campgrounds", (req, res) => {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description};
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
// SHOW - show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            // render show template with that campground
            res.render("show", { campground: foundCampground });
        }
    });
});
app.listen(4000, () => console.log("YelpCamp server has started on PORT 4000"));