const fs = require('fs');

exports.listings = fs.readFileSync('./model/test.json');

exports.readAll = function(){ // REST get (all) method
    return exports.listings;
};