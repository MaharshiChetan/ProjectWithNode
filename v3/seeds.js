var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Igatpuri",
        image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f0c471a4e5bc_340.jpg",
        description: "balh blah blah blah"
    },
    {
        name: "Mahabaleshwar",
        image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144394f0c471a4e5bc_340.jpg",
        description: "balh blah blah blah"
    },
    {
        name: "Jaipur",
        image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144394f0c471a4e5bc_340.jpg",
        description: "balh blah blah blah"
    }
];

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Campground removed.");
        }
        // Add few campgrounds
        data.forEach((seed) => {
            Campground.create(seed, (err, campground) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a campground.");
                    // Create a comment
                    Comment.create(
                        {
                            text: "This place is great, but i wish there was internet",
                            author: "Deep Karmokar"
                        }, (err, comment) => {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        }
                    );
                }
            });
        })
    });
    // Add few comments
}

module.exports = seedDB;