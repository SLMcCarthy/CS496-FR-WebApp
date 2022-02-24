const http = require('http');
const fs = require('fs'); //file system
let port = 4000;
let hostname = 'localhost';

const server = http.createServer(function(req,res){
    let filename = req.url;
    if(filename==='/') filename = '/homepage.html';

    let path = './public_html'+filename;
    fs.readFile(path,function(err,data){
        if(err){
           console.log(err);
           res.writeHead(404,{'Content-type':'text/html'});
        }
        else{
            res.writeHead(200,{'Content-type':'text/html'});
            res.write( data.toString() );
        }
        res.end();
    });

});

server.listen(port,hostname);
console.log(`Server running on ${hostname}:${port}`);
