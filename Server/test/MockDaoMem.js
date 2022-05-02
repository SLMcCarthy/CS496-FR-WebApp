const fs = require('fs');

exports.listings = fs.readFileSync('./model/test.json').toJSON();

exports.readAll = function(){ // REST get (all) method
    return exports.listings;
}

exports.read = function(id){
    if (id==='user')
        return 'found';
    else 
        return null;
}

exports.del = function(id){
    return id;
}

exports.create = function(data){
    return null;
}

exports.update = function(id){
    return null;
}

exports.readEvents = function(){
    return exports.listings;
}

exports.readEventsNew = function(){
    return exports.listings;
}

exports.readEventsOld = function(){
    return exports.listings;
}

exports.readEventsAsc = function(){
    return exports.listings;
}

exports.readEventsDesc = function(){
    return exports.listings;
}

exports.readServices = function(){
    return exports.listings;
}

exports.readInternships = function(){
    return exports.listings;
}

exports.readMedias = function(){
    return exports.listings;
}
exports.testing = function(){
    return {msg:'User not found.'};
}