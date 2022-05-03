const dbcon = require('../model/DbConnection');
const controller = require('../controller/UserController');
const mock= require('./mockReqRes');
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


test('Controller getAll',function(){
  controller.getAll(req,res);
  expect(res._status).toBe(200); 
  expect(res._send.length).toBe(0);
});

test('controller get', function(){
    req.params = {id:'user'};
    controller.get(req,res);
    expect(res._status).toBe(200);
    expect(res._send).toBe('found');
    req.params.id = 'check false';
    controller.get(req,res);
    expect(res._status).toBe(404);
    expect(res._send).toStrictEqual({msg:'User not found.'});
});

test('controller deleteone', function(){
    req.params = {id:'delete'};
    controller.deleteOne(req,res);
    expect(res._redirect).toBe('/admin_users.html');
});

test('controller post create', function(){
  req.body = {userEmail:"create@email.com",userFirstName:"John",userLastName:"E",
                userPass:"password",emailNotifications:null,permission:null}
  controller.postCreateOrUpdate(req,res);
  expect(res._redirect).toBe('log_in.html');
  expect(res._status).toBe(201);
});

test('controller post update', function(){
  req.body = {userId:2, userEmail:"create@email.com",userFirstName:"John",userLastName:"E",
                userPass:"password",emailNotifications:null,permission:null}
  controller.postCreateOrUpdate(req,res);
  expect(res._redirect).toBe('admin_users.html');
  expect(res._status).toBe(200);
});

test('testing test', function(){
  controller.tester(req,res);
  expect(res._send).toStrictEqual({msg:'User not found.'});
});