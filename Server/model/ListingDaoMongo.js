// Call DBConnection on the Server.js
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {type:String, required:true},
    body: {type:String, required:true},
    titleFR: {type:String, required:true},
    bodyFR: {type:String, required:true},
    creation: {type:Date, default:Date.now},
    expiration:Date,
    eventDate:Date,
    type: {type:String, required:true}
});

// const listingSchema = new mongoose.Schema({
//     title: {type:String, required:true},
//     body: {type:String, required:true},
//     date: Date,
//     type: String,
//     typeint: Number,
//     titleFR: {type:String, required:true},
//     bodyFR: {type:String, required:true},
// });


const listingsModel = mongoose.model('listings',listingSchema);

exports.readAll = async function(){
    let listings = await listingsModel.find();
    // Later try: find().sort({name:'asc'}).skip(0).limit(5);
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

exports.deleteAll = async function(){
    await listingsModel.deleteMany();
}

exports.update = function(listing){
    //leave as homework
}
