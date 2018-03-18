var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/assotiation");

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
    var Post = mongoose.model("Post", postSchema);
    
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

/* var newUser = new User({
    email: "deep@gmail.com",
    name: "Deep Karmokar",
});

newUser.posts.push({
    title: "This is deep's first post",
    content: "I don't have any content to write"
});
 
newUser.save((err, user) => {
    if (err) {
        console.log(err);
    } else{
        console.log(user);
    }
});
 */
User.findOne({ name: "Deep Karmokar"}, (err, user) => {
    if (err) {
        // console.log(err);
    } else {
        user.posts.push({
            title: "This is my second post",
            content: "Now i have something to write"
        });
        user.save((err, user) => {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});

var newPost = new Post({
    title: "This is my First Post",
    content: "And the content goes here"
});

/* newPost.save((err, post) => {
    if (err) {
        console.log(err);
    } else {
        console.log(post);
    }
}); */