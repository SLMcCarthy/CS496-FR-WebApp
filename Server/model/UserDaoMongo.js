const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: { type:String, alias:'email', required:true },
    firstName: { type:String, required:true},
    lastName: { type:String, required:true},
    password: String,
    emailNotifications: Boolean,
    permission: Number,
    creation: { type:Date, default:Date.now } 
});

const userModel = mongoose.model('user',userSchema);

exports.readAll = async function(){
    let users = await userModel.find();
    return users;
}

exports.read = async function(id){
    let user = await userModel.findById(id);
    return user;
}

exports.create = async function(newuser){
    const user = new userModel(newuser);
    await user.save();
    return user;
}

exports.del = async function(id){
    let user = await userModel.findByIdAndDelete(id);
    return user;
} 

exports.deleteAll = async function(test){
    if (test === 'test')
        await userModel.deleteMany();
}

exports.update = function(user){
    //leave as homework
}

exports.login = async function(plogin, pwd){
    let user = await userModel.findOne({login:plogin, password:pwd});
    return user;
}
