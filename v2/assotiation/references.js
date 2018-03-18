var mongoose = require("mongoose");
var Post = require("./models/post");
var User = require("./models/user");

mongoose.connect("mongodb://localhost/assotiation_2");

Post.create({
    title: "What the hell pt. 4",
    content: "Blah Blah Blah Blah once again"
}, (err, post) => {
    User.findOne({ email: "vijay@gmail.com"}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

/* User.findOne({ email: "vijay@gmail.com" }).populate("posts").exec((err, user) => {
if (err) {
        cosnole.log(err);
    } else {
        console.log(user);
    }
}); */