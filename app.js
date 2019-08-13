const express = require('express'),
    parser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    SeedDB = require("./seed");

const PORT = 8080;
const HOST = '0.0.0.0';

SeedDB()

app.use(parser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://mongo:27017/yelp_camp", {
    useNewUrlParser: true
});

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, all) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: all
            })
        }
    })
});

app.post('/campgrounds', (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;

    Campground.create({
        name: name,
        image: image,
        description: description
    }, (err, obj) => {
        if (err) {
            console.log(err);
        } else {
            console.log(obj._doc)
        }
    });

    res.redirect('campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, obj) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {
                campground: obj
            });
        }
    });
});

// COMMENTS
app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, obj) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: obj
            });
        }
    })
});


app.post('/campgrounds/:id/comments', (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect(`/campgrounds/${campground._id}`)
                }
            })
        }
    })
});

app.get('*', (req, res) => {
    res.send('Not Found');
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});