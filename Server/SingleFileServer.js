const express = require('express'); //import express
const morgan = require('morgan'); //import morgan for logging
const fs = require('fs');

let port = 4000;
let hostname = 'localhost';

const app = express(); //creates a new Express Application
app.use(morgan('dev')); //For better logging, we use morgan

app.use(express.static('public_html'));// Static server use the folder 'public_html'

app.get('/', function(req,res){ // if called on localhost:4000
    res.redirect('./homepage.html'); // calls homepage
    res.end();
});



// pull from test json file and display
app.get('/listings',function(req,res){ // REST get (all) method
    fs.readFile('test.json', (err, data) => {
        if (err) throw err;
        let listings = JSON.parse(data);
        res.status(200); // 200 = Ok
        res.send(listings); //send the data back to the client
        res.end(); 
    });
});

app.listen(port,hostname,function(){ // Listen to client requests in hostname:port
    console.log(`Server Running on ${hostname}:${port}...`);
});