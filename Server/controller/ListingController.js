let dao = require('../model/ListingDaoMongo');  // reads from data access model

exports.useMock = function(test) {
    if (test === 'test')
        dao = require('../test/MockDaoMem');
}

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

// Search Event Listings
exports.searchEvents = async function(req, res) {
    console.log('controller');
    let key = req.params.key;
    key = "/" + key + "/";
    console.log(key);
    let listings = await dao.readSearchEvent(key);

    if(listings !== null){ 
        res.status(200); 
        res.send(listings); 
    }
    else{ 
        res.status(404); 
        res.send({msg:'User not found.'}); 
    }
    res.end();
}

// Get Service Listings
exports.getServices = async function(req, res) {
    res.status(208);
    res.send(await dao.readServices());
    res.end();
}

exports.getServicesNew = async function(req, res) {
    res.status(200);
    res.send(await dao.readServicesNew());
    res.end();
}

exports.getServicesOld = async function(req, res) {
    res.status(200);
    res.send(await dao.readServicesOld());
    res.end();
}

exports.getServicesAsc = async function(req, res) {
    res.status(200);
    res.send(await dao.readServicesAsc());
    res.end();
}

exports.getServicesDesc = async function(req, res) {
    res.status(200);
    res.send(await dao.readServicesDesc());
    res.end();
}

// Get Internship Listings
exports.getInternships = async function(req, res) {
    res.status(200);
    res.send(await dao.readInternships());
    res.end();
}

exports.getInternshipsNew = async function(req, res) {
    res.status(200);
    res.send(await dao.readInternshipsNew());
    res.end();
}

exports.getInternshipsOld = async function(req, res) {
    res.status(200);
    res.send(await dao.readInternshipsOld());
    res.end();
}

exports.getInternshipsAsc = async function(req, res) {
    res.status(200);
    res.send(await dao.readInternshipsAsc());
    res.end();
}

exports.getInternshipsDesc = async function(req, res) {
    res.status(200);
    res.send(await dao.readInternshipsDesc());
    res.end();
}


// Get Media Listings
exports.getMedias = async function(req, res) {
    res.status(200);
    res.send(await dao.readMedias());
    res.end();
}

exports.getMediasNew = async function(req, res) {
    res.status(200);
    res.send(await dao.readMediasNew());
    res.end();
}

exports.getMediasOld = async function(req, res) {
    res.status(200);
    res.send(await dao.readMediasOld());
    res.end();
}

exports.getMediasAsc = async function(req, res) {
    res.status(200);
    res.send(await dao.readMediasAsc());
    res.end();
}

exports.getMediasDesc = async function(req, res) {
    res.status(200);
    res.send(await dao.readMediasDesc());
    res.end();
}

// Get One Listing
exports.get = async function(req, res) {
    let id = req.params.id;     // Retrieve Listing ID from Params
    let found = dao.read(id);

    if(found !== null){  // Listing found
        res.status(200); //200 = OK
        res.send(found); //Send Listing
    }
    else{                   // Listing not found
        res.status(404);    //404 = Not Found
        res.send({msg:'Listing not found.'}); //Send error msg
    }
    res.end(); 
}

// Create or Update a Listing
exports.postCreateOrUpdateListing = function(req,res){
    // Instantiate empty Listing object
    let newListing = {};     

    // Insert Requested Data and create Schema
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

    if(req.body.listingId){ // User ID exists, Update User
        console.log('Update listing');
        newListing._id= req.body.userId;
        dao.update(newListing);
        res.status(200);
        res.redirect('admin_page.html');

    }
    else{
        //insert user
        dao.create(newListing);   
        res.status(201);
        res.redirect('admin_page.html');     
    }

}

// Delete one Listing
exports.deleteOne = function(req,res){
    let id = req.params.id; //get Listing id from params
    dao.del(id);
    res.redirect('/admin_page.html');
}