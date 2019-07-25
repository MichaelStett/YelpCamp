const express = require('express'),
    parser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

const PORT = 8080;
const HOST = '0.0.0.0';

app.use(parser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://mongo:27017/yelp_camp");

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);



app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, all) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {
                campgrounds: all
            })
        }
    })
});

app.post('/campgrounds', (req, res) => {
    const name = req.body.name;
    const image = req.body.image;

    Campground.create({
        name: name,
        image: image
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
    res.render('new');
});

app.get('*', (req, res) => {
    res.send('Not Found');
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
