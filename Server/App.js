const express = require('express'); //import express
const morgan = require('morgan'); //import morgan for logging
const listingCont = require('./controller/ListingController');
const userCont = require('./controller/UserController');
const session = require('express-session');
const memorystore = require('memorystore')(session);


const app = express(); //creates a new Express Application
app.use(morgan('dev')); //For better logging, we use morgan
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret: 'Pineapple - Guava - Orange',
    cookie: {maxAge: 86400000 }, // = 1000*60*60*24 = 24Hours
    store: new memorystore({ checkPeriod:86400000 }),
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public_html'));// Static server use the folder 'public_html'

app.get('/', function(req,res){ // if called on localhost:4000
    res.redirect('./homepage.html'); // calls homepage
    res.end();
});

// ------- Listings -------
app.get('/listings', listingCont.getAll);
app.post('/listings', listingCont.postCreateOrUpdateListing);
app.get('/deletelistings/:id', listingCont.deleteOne);

app.get('/listings/Events', listingCont.getEvents);
app.get('/listings/Events/new', listingCont.getEventsNew);
app.get('/listings/Events/old', listingCont.getEventsOld);
app.get('/listings/Events/asc', listingCont.getEventsAsc);
app.get('/listings/Events/desc', listingCont.getEventsDesc);
app.get('/search/Events/:key', listingCont.searchEvents); // not working

app.get('/listings/Services', listingCont.getServices);
app.get('/listings/Services/new', listingCont.getServicesNew);
app.get('/listings/Services/old', listingCont.getServicesOld);
app.get('/listings/Services/asc', listingCont.getServicesAsc);
app.get('/listings/Services/desc', listingCont.getServicesDesc);


app.get('/listings/Medias', listingCont.getMedias);
app.get('/listings/Medias/new', listingCont.getMediasNew);
app.get('/listings/Medias/old', listingCont.getMediasOld);
app.get('/listings/Medias/asc', listingCont.getMediasAsc);
app.get('/listings/Medias/desc', listingCont.getMediasDesc);

app.get('/listings/Internships', listingCont.getInternships);
app.get('/listings/Internships/new', listingCont.getInternshipsNew);
app.get('/listings/Internships/old', listingCont.getInternshipsOld);
app.get('/listings/Internships/asc', listingCont.getInternshipsAsc);
app.get('/listings/Internships/desc', listingCont.getInternshipsDesc);

// -------- users ---------
app.post('/user', userCont.postCreateOrUpdate);
app.get('/user', userCont.getAll);
app.get('/deluser/:id',userCont.deleteOne);

app.post('/dologin',userCont.login); 
app.get('/loggedUser',userCont.loggedUser);
app.get('/logout',userCont.logout);


exports.app = app;