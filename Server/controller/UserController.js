let dao = require('../model/UserDaoMongo');

exports.useMock = function(test) {
    if (test === 'test')
        dao = require('../test/MockDaoMem');
}

exports.getAll = async function(req,res){ // REST get (all) method
    res.status(200); // 200 = Ok
    res.send(await dao.readAll()); //send the users back to the client
    res.end(); 
}

exports.get = function(req,res){ //REST get (one) method
    //URL parameter always on req.params.<name>
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

exports.postCreateOrUpdate = function(req,res){
    let newuser = {}; //empty obj
    newuser.login =req.body.userEmail;
    newuser.firstName = req.body.userFirstName;
    newuser.lastName = req.body.userLastName;
    newuser.password = req.body.userPass;
    newuser.emailNotifications = true;
    newuser.permission = 2;


    if(req.body.userId){
        //update user
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

exports.deleteOne = function(req,res){
    //URL parameter always on req.params.<name>
    let id = req.params.id; //get param and convert to int    
    dao.del(id);
    // let user = req.session.user;
    // if(user!=null && user.permission===1){    
    //     dao.del(id);
    // }

    res.redirect('/admin_users.html');
}

exports.login = async function(req, res){
    let plogin = req.body.userEmail;
    let pwd = req.body.userPassword;
    let user = await dao.login(plogin, pwd);
    console.log(user);
    if(user != null){ //login successful
        user.password = null; //for security
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