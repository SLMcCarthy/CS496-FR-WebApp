require('dotenv').config();
const ExpressApp = require('./App');

let port = 4000;
let hostname = 'localhost';

ExpressApp.app.listen(process.env.PORT,process.env.HOSTNAME,function(){ // Listen to client requests in hostname:port
    console.log(`Server Running on ${process.env.HOSTNAME}:${process.env.PORT}...`);
});