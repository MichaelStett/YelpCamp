const express = require('express');
const parser = require('body-parser');
const app = express();

const PORT = 8080;
const HOST = '0.0.0.0';

var campgrounds = [
    { name: "Salomon Creek", image: "https://live.staticflickr.com/5542/11936566655_2535c3606a_k.jpg" },
    { name: "Granite Hill", image: "https://live.staticflickr.com/7169/6401974259_459a877dd4_b.jpg" },
    { name: "Mountian Goat's Rest", image: "https://live.staticflickr.com/3691/12005576473_5c938e610a_b.jpg" },
    { name: "Salomon Creek", image: "https://live.staticflickr.com/5542/11936566655_2535c3606a_k.jpg" },
    { name: "Granite Hill", image: "https://live.staticflickr.com/7169/6401974259_459a877dd4_b.jpg" },
    { name: "Mountian Goat's Rest", image: "https://live.staticflickr.com/3691/12005576473_5c938e610a_b.jpg" },
    { name: "Salomon Creek", image: "https://live.staticflickr.com/5542/11936566655_2535c3606a_k.jpg" },
    { name: "Granite Hill", image: "https://live.staticflickr.com/7169/6401974259_459a877dd4_b.jpg" },
    { name: "Mountian Goat's Rest", image: "https://live.staticflickr.com/3691/12005576473_5c938e610a_b.jpg" }


];

app.use(parser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', { 
        campgrounds: campgrounds 
    });
});

app.post('/campgrounds', (req, res) => {
    const name = req.body.name;
    const image = req.body.image;

    campgrounds.push({
        name: name, 
        image: image
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
