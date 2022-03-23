const dao = require('../model/ListingDaoMem');  // reads from data access model

exports.getAll = function(req, res) {
    res.status(200); // 200 = OK
    res.send(dao.readAll());
    res.end();
}