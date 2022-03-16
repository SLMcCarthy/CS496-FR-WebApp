const express = require('express'); //import express
const morgan = require('morgan'); //import morgan for logging
const fs = require('fs');

let port = 4000;
let hostname = 'localhost';

const app = express(); //creates a new Express Application
app.use(morgan('dev')); //For better logging, we use morgan

app.use(express.static('public_html'));// Static server use the folder 'public_html'

const users = [ //For this phase, we will store the data in memory, on the server
    { _id:1,name:'Jeremy Unanue', login:'jrunanue@loyola.edu', password:'123456',permission:1},
    { _id:2,name:'John Doe', login:'jd@aol.com', password:'123456', permission:2},
    { _id:3,name:'Jane Doe', login:'janed@compuserve.com' ,password:'123456', permission:2}
];

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