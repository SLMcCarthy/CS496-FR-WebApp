// Call DBConnection on the Server.js
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {type:String, required:true},
    titleFR: {type:String, required:false},
    body: {type:String, required:true},
    bodyFR: {type:String, required:false},
    link: {type:String, required:false},
    listStart: {type:Date, required:false},
    listEnd: {type: Date, required:false},
    autoOpen: {type: Boolean, required:true},
    autoClose: {type: Boolean, required:true},
    active: {type: Boolean, required:true},
    type: {type: String, required:true},
    creation: {type:Date, default:Date.now}
});


const listingsModel = mongoose.model('listings',listingSchema);

exports.readAll = async function(){
    let listings = await listingsModel.find();
    // Later try: find().sort({name:'asc'}).skip(0).limit(5);
    return listings;
}

exports.readEvents = async function(){
    let listings = await listingsModel.find({ type : "Event"}).exec();
    return listings;
}

exports.readServices = async function(){
    let listings = await listingsModel.find({ type : "Service"}).exec();
    return listings;
}

exports.readInternships = async function(){
    let listings = await listingsModel.find({ type : "Internship"}).exec();
    return listings;
}

exports.readMedias = async function(){
    let listings = await listingsModel.find({ type : "Media"}).exec();
    return listings;
}

exports.readResources = async function(){
    let listings = await listingsModel.find({ type : "Resource"}).exec();
    return listings;
}

exports.read = async function(id){
    let listing = await listingsModel.findById(id);
    return listing;
}

exports.create = async function(newlisting){
    const listing = new listingsModel(newlisting);
    await listing.save();
    return listing;
}

exports.del = async function(id){
    let listing = await listingsModel.findByIdAndDelete(id);
    return listing;
} 

exports.deleteAll = async function(test){
    if(test === 'test')
        await listingsModel.deleteMany();
}

exports.update = function(listing){
}
