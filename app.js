const express = require('express');
const app = express();

const PORT = 3000;
const HOST = '127.0.0.1';

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    const campgrounds = [
        { name: "Salomon Creek", image: "https://live.staticflickr.com/5542/11936566655_2535c3606a_k.jpg" },
        { name: "Granite Hill", image: "https://live.staticflickr.com/7169/6401974259_459a877dd4_b.jpg" },
        { name: "Mountian Goat's Rest", image: "https://live.staticflickr.com/3691/12005576473_5c938e610a_b.jpg" }
    ];

    res.render('campgrounds', { 
        campgrounds: campgrounds 
    });
});

app.get('*', (req, res) => {
    res.send('Not Found');
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
