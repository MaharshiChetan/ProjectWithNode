var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require(mongoose);

app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    { name: "Igatpuri", image: "https://farm4.staticflickr.com/3717/12822913975_18e8b3e69d.jpg" },
    { name: "Mahabaleshwar", image: "https://farm8.staticflickr.com/7010/6681429877_1dab894027.jpg" },
    { name: "Jaipur", image: "https://farm7.staticflickr.com/6007/6189109905_0dc4df8f5e.jpg" },
    { name: "Igatpuri", image: "https://farm4.staticflickr.com/3717/12822913975_18e8b3e69d.jpg" },
    { name: "Mahabaleshwar", image: "https://farm8.staticflickr.com/7010/6681429877_1dab894027.jpg" },
    { name: "Jaipur", image: "https://farm7.staticflickr.com/6007/6189109905_0dc4df8f5e.jpg" },
    { name: "Igatpuri", image: "https://farm4.staticflickr.com/3717/12822913975_18e8b3e69d.jpg" },
    { name: "Mahabaleshwar", image: "https://farm8.staticflickr.com/7010/6681429877_1dab894027.jpg" },
    { name: "Jaipur", image: "https://farm7.staticflickr.com/6007/6189109905_0dc4df8f5e.jpg" }
];

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', { campgrounds: campgrounds});
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.post("/campgrounds", (req, res) => {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});


app.listen(4000, () => {
    console.log("YelpCamp server has started");
});