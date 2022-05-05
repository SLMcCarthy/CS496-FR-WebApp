const fs = require('fs');

exports.listings = fs.readFileSync('./model/test.json').toJSON();

exports.readAll = function(){ // REST get (all) method
    return exports.listings;
}

exports.read = function(id){
    if (id==='user' || id === 'listing')
        return 'found';
    else
        return null;
}

exports.del = function(id){
    return id;
}

exports.login = function(plogin,pwd){
    if (plogin === 'est@email.com' && pwd === 'testing')
        return {email: plogin, password: pwd};
    else return null;
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
    return null;
}

exports.readEventsDesc = function(){
    return exports.listings;
}



exports.readInternships = function(){
    return exports.listings;
}

exports.readInternshipsNew = function(){
    return exports.listings;
}

exports.readInternshipsOld = function(){
    return exports.listings;
}

exports.readInternshipsAsc = function(){
    return null;
}

exports.readInternshipsDesc = function(){
    return exports.listings;
}

exports.readMedias = function(){
    return exports.listings;
}

exports.readMediasNew = function(){
    return exports.listings;
}

exports.readMediasOld = function(){
    return exports.listings;
}

exports.readMediasAsc = function(){
    return null;
}

exports.readMediasDesc = function(){
    return exports.listings;
}
exports.testing = function(){
    return {msg:'User not found.'};
}

exports.readServices = function(){
    return {msg:"services"};
}

exports.readServicesNew = function(){
    return exports.listings;
}

exports.readServicesOld = function(){
    return exports.listings;
}

exports.readServicesAsc = function(){
    return null;
}

exports.readServicesDesc = function(){
    return exports.listings;
}