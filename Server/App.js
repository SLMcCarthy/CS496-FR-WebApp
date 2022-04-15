const express = require('express'); //import express
const morgan = require('morgan'); //import morgan for logging
const listingCont = require('./controller/ListingController')


const app = express(); //creates a new Express Application
app.use(morgan('dev')); //For better logging, we use morgan
app.use(express.json()); //not entirely sure what this does
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public_html'));// Static server use the folder 'public_html'

app.get('/', function(req,res){ // if called on localhost:4000
    res.redirect('./homepage.html'); // calls homepage
    res.end();
});

// pull from test json file and display
app.get('/listings', listingCont.getAll);
app.post('/listings', listingCont.postCreateOrUpdateListing);

exports.app = app;