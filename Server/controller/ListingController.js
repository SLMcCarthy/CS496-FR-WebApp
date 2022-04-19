const dao = require('../model/ListingDaoMongo');  // reads from data access model

exports.getAll = async function(req, res) {
    res.status(200); // 200 = OK
    res.send(await dao.readAll());
    res.end();
}


// needs to be fixed
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
    newListing.type = "Event";



    // let newListing = {}; //empty obj
    // newListing.title = "title 01";
    // newListing.titleFR = "French title 01";
    // newListing.body = "body 01";
    // newListing.bodyFR = "FR body 01";
    // newListing.link = "French.com";
    // newListing.listStart = "2021-01-01";
    // newListing.listEnd = "2021-08-01";
    // newListing.autoOpen = false;
    // newListing.autoClose = false;
    // newListing.active = true;
    // newListing.type = "Event";
    console.log(newListing.title);
    console.log(newListing.titleFR);
    console.log(newListing.body);
    console.log(newListing.bodyFR);
    console.log(newListing.link);
    console.log(newListing.listStart);
    console.log(newListing.listEnd);
    console.log(newListing.autoOpen);
    console.log(newListing.autoClose);
    console.log(newListing.active);
    console.log(newListing.type);




    // if(req.body.txt_id){
    //     //update listing
    //     console.log('Update listing');
    //     dao.update(newListing);
    // }
    // else{
        //insert user
        dao.create(newListing);        
    //}
    res.redirect('eventspage01.html');
}