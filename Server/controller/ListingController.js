const dao = require('../model/ListingDaoMongo');  // reads from data access model

exports.getAll = async function(req, res) {
    res.status(200); // 200 = OK
    res.send(await dao.readAll());
    res.end();
}

exports.getEvents = async function(req, res) {
    res.status(200);
    res.send(await dao.readEvents());
    res.end();
}

exports.getEventsNew = async function(req, res) {
    res.status(200);
    res.send(await dao.readEventsNew());
    res.end();
}

exports.getEventsOld = async function(req, res) {
    res.status(200);
    res.send(await dao.readEventsOld());
    res.end();
}

exports.getEventsAsc = async function(req, res) {
    res.status(200);
    res.send(await dao.readEventsAsc());
    res.end();
}

exports.getEventsDesc = async function(req, res) {
    res.status(200);
    res.send(await dao.readEventsDesc());
    res.end();
}




exports.getServices = async function(req, res) {
    res.status(200);
    res.send(await dao.readServices());
    res.end();
}

exports.getInternships = async function(req, res) {
    res.status(200);
    res.send(await dao.readInternships());
    res.end();
}

exports.getResources = async function(req, res) {
    res.status(200);
    res.send(await dao.readResources());
    res.end();
}

exports.getMedias = async function(req, res) {
    res.status(200);
    res.send(await dao.readMedias());
    res.end();
}

exports.get = async function(req, res) {
    let id = req.params.id; //get param and convert to int
    let found = dao.read(id);

    if(found !== null){ //We found the requested user
        res.status(200); //200 = OK
        res.send(found); //Send the found user
    }
    else{ //The requested id does not exist
        res.status(404); //404 = Not Found
        res.send({msg:'User not found.'}); //send a message
    }
    res.end(); //ends the response (only 1 end per response)
}

exports.postCreateOrUpdateListing = function(req,res){
    let newListing = {};     // empty obj
    newListing.title = req.body.listingTitleEN;
    newListing.titleFR = req.body.listingTitleFR;
    newListing.body = req.body.listingBodyEN;
    newListing.bodyFR = req.body.listingBodyFR;
    newListing.link = req.body.listingLink;
    newListing.listStart = req.body.listingStartDate;
    newListing.listEnd = req.body.listingEndDate;
    newListing.autoOpen = false;
    newListing.autoClose = false;
    newListing.active = true;
    newListing.type = req.body.listingType;

    dao.create(newListing);        
    
    res.redirect('admin_page.html');
}