const express = require('express'); //import express
const morgan = require('morgan'); //import morgan for logging

let port = 4000;
let hostname = 'localhost';

const app = express(); //creates a new Express Application
app.use(morgan('dev')); //For better logging, we use morgan

app.use(express.static('public_html'));// Static server use the folder 'public_html'

const users = [ //For this phase, we will store the data in memory, on the server
    { _id:1,name:'Henrique Rocha', login:'hsrocha@loyola.edu', password:'123456',permission:1},
    { _id:2,name:'John Doe', login:'jd@aol.com', password:'123456', permission:2},
    { _id:3,name:'Jane Doe', login:'janed@compuserve.com' ,password:'123456', permission:2}
];

app.get('/user',function(req,res){ // REST get (all) method
    res.status(200); // 200 = Ok
    res.send(users); //send the users back to the client
    res.end(); 
});

app.listen(port,hostname,function(){ // Listen to client requests in hostname:port
    console.log(`Server Running on ${hostname}:${port}...`);
});