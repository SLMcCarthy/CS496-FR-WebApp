const dbcon = require('../model/DbConnection');
const controller = require('../controller/UserController');
const mock= require('./mockReqRes');
const { testing } = require('./MockDaoMem');
const res = mock.response;
const req = mock.request;

beforeAll(function(){
//    controller.mockDAO();
  dbcon.connect('test');
});
afterAll(async function(){
    //await dao.deleteAll();
    dbcon.disconnect();
});
beforeEach(function() {
  controller.useMock('test');
});


test('User Controller getAll',function(){
  controller.getAll(req,res);
  expect(res._status).toBe(200); 
  expect(res._send.length).toBe(0);
});

test('user controller get', function(){
    req.params = {id:'user'};
    controller.get(req,res);
    expect(res._status).toBe(200);
    expect(res._send).toBe('found');
    req.params.id = 'check false';
    controller.get(req,res);
    expect(res._status).toBe(404);
    expect(res._send).toStrictEqual({msg:'User not found.'});
});

test('user controller deleteone', function(){
    req.params = {id:'delete'};
    controller.deleteOne(req,res);
    expect(res._redirect).toBe('/admin_users.html');
});

test('user controller post create', function(){
  req.body = {userEmail:"create@email.com",userFirstName:"John",userLastName:"E",
                userPass:"password",emailNotifications:null,permission:null}
  controller.postCreateOrUpdate(req,res);
  expect(res._redirect).toBe('log_in.html');
  expect(res._status).toBe(201);
});

test('user controller post update', function(){
  req.body = {userId:2, userEmail:"create@email.com",userFirstName:"John",userLastName:"E",
                userPass:"password",emailNotifications:null,permission:null}
  controller.postCreateOrUpdate(req,res);
  expect(res._redirect).toBe('admin_users.html');
  expect(res._status).toBe(200);
});

// test('User controller login', function(){
//   //test if login fails
//   req.body = {userEmail: 'test@email.com', userPassword: 'wrongpass'};
//   controller.login(req,res);
//   expect(res._redirect).toBe('log_in.html?error=1');
//   //test if login succeeds 
//   req.body = {userEmail: 'test@email.com', userPassword: 'testing'};
//   dao.login(req,res);
//   expect(req.session.user).toBe({userEmail: 'test@email.com', userPassword: null});
//   expect(res._redirect).toBe('homepage.html');
// });

// test('user Controlle loggedUser', function(){

// })




// exports.loggedUser = function(req,res){
//   res.status(200); // 200 = Ok
//   res.send( req.session.user ); //send the logged user
//   res.end(); 
// }

// exports.logout = function(req, res){
//   req.session.user = null;
//   res.redirect('homepage.html');

test('testing test', function(){
  controller.tester(req,res);
  expect(res._send).toStrictEqual({msg:'User not found.'});
});