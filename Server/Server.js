const ExpressApp = require('./App');

let port = 4000;
let hostname = 'localhost';

ExpressApp.app.listen(port,hostname,function(){ // Listen to client requests in hostname:port
    console.log(`Server Running on ${hostname}:${port}...`);
});