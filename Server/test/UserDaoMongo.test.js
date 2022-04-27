const dbcon = require('../model/DbConnection');
const dao = require('../model/UserDaoMongo');

beforeAll(function(){
    dbcon.connect('test');
});

afterAll( function(){
    // await dao.deleteAll();
    dbcon.disconnect();
});

beforeEach(async function(){
    dao.deleteAll('test');
    let newUser = {login:'test@email.com', firstName:'John', lastName:'B', password:'password', 
                        emailNotifications: true, permission: 2};
    let created = await dao.create(newUser);
})

test('Create new user', async function(){
    let usersLength = (await dao.readAll()).length;
    let newUser = {login:'created@email.com', firstName:'John', lastName:'C', password:'password', 
                        emailNotifications: true, permission: 2};
    let created = await dao.create(newUser);
    expect((await dao.readAll()).length).toBe(usersLength+1);
});

test('read All users', async function(){
    let usersLength = (await dao.readAll()).length;
    expect(usersLength).toBeGreaterThan(0);
})

test('read user', async function(){
    let newUser = {login:'created@email.com', firstName:'John', lastName:'C', password:'password', 
                        emailNotifications: true, permission: 2};
    let created = await dao.create(newUser);
    let read = await dao.read(created._id);
    expect(read.lastName).toBe(created.lastName);
});

test('delete', async function(){
    let newUser = {login:'created@email.com', firstName:'John', lastName:'C', password:'password', 
                        emailNotifications: true, permission: 2};
    let created = await dao.create(newUser);
    let deleted = await dao.del(created._id);
    let users= await dao.readAll();
    expect(users.length).toBe(1);
    expect(await dao.read(deleted._id)).toBe(null);
});

test('delete All', async function(){
    await dao.deleteAll();
    expect((await dao.readAll()).length).toBe(1);
    await dao.deleteAll('test');
    expect((await dao.readAll()).length).toBe(0);
});
