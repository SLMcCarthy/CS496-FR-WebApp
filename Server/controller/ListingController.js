const dao = require('../model/ListingDaoMongo');  // reads from data access model

exports.getAll = async function(req, res) {
    res.status(200); // 200 = OK
    res.send(await dao.readAll());
    res.end();
}