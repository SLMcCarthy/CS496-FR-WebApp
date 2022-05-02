let dao = require('../model/UserDaoMongo');

exports.useMock = function(test) {
    if (test === 'test')
        dao = require('../test/MockDaoMem');
}

// Get all users
exports.getAll = async function(req,res){ 
    res.status(200); 
    res.send(await dao.readAll()); //send users 
    res.end(); 
}

// Get one User
exports.get = function(req,res){ 
    let id = req.params.id; // Get User ID from params
    let found = dao.read(id);

    if(found !== null){  // User found
        res.status(200); 
        res.send(found); // Send User
    }
    else{                   // The User ID does not exist
        res.status(404);    
        res.send({msg:'User not found.'}); // Send err message
    }
    res.end(); 
}

// Create or Update User
exports.postCreateOrUpdate = function(req,res){
    let newuser = {}; // Instantiate User Object

    // Insert requested data
    newuser.login =req.body.userEmail;
    newuser.firstName = req.body.userFirstName;
    newuser.lastName = req.body.userLastName;
    newuser.password = req.body.userPass;
    newuser.emailNotifications = true;
    newuser.permission = 2;


    if(req.body.txt_id){ // User ID exists, Update User
        console.log('Update user');
        newuser._id= req.body.userId;
        dao.update(newuser);
        res.status(200);
        res.redirect('admin_users.html');

    }
    else{
        //insert user
        dao.create(newuser);   
        res.status(201);
        res.redirect('log_in.html');     
    }
}

// Delete one User
exports.deleteOne = function(req,res){
    
    let id = req.params.id; // Get User ID from params   
    dao.del(id);

    // let user = req.session.user;
    // if(user!=null && user.permission===1){    
    //     dao.del(id);
    // }

    res.redirect('/admin_users.html');
}

// Login 
exports.login = async function(req, res){
    // Get Login data
    let plogin = req.body.userEmail;
    let pwd = req.body.userPassword;
    let user = await dao.login(plogin, pwd);

    console.log(user);
    if(user != null){           // login successful
        user.password = null;   // for security
        //Save the user in the session
        req.session.user = user;
        res.redirect('homepage.html');
    }
    else{ //incorrect login or password
        res.redirect('log_in.html?error=1');
    }
}

exports.loggedUser = function(req,res){
    res.status(200); // 200 = Ok
    res.send( req.session.user ); //send the logged user
    res.end(); 
}

exports.logout = function(req, res){
    req.session.user = null;
    res.redirect('index.html');
}

exports.tester = function(req, res){
    res.send(  dao.testing() )
}