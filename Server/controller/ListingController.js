const dao = require('../model/ListingDaoMongo');  // reads from data access model

exports.getAll = async function(req, res) {
    res.status(200); // 200 = OK
    res.send(await dao.readAll());
    res.end();
}

exports.postCreateOrUpdate = function(req,res){
    let newuser = {}; //empty obj
    newuser.name = req.body.txt_name;
    newuser.login = req.body.txt_login;
    newuser.password = passUtil.hashPassword(req.body.txt_pass);
    newuser.permission = parseInt(req.body.txt_perm);

    if(req.body.txt_id){
        //update user
        console.log('Update user');
        dao.update(newuser);
    }
    else{
        //insert user
        dao.create(newuser);        
    }
    res.redirect('users.html');
}