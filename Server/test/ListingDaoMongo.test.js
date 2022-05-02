const dbcon = require('../model/DbConnection');
const dao = require('../model/ListingDaoMongo');

beforeAll(function(){
    dbcon.connect('test');
});

afterAll( function(){
    // await dao.deleteAll();
    dbcon.disconnect();
});

beforeEach(async function(){
    dao.deleteAll('test');
    let newListing = {title:'test T', titleFR:'le test T', body:'test B', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2021-08-01'), 
                        autoOpen:false, autoClose:false, active:true, type:'Event'};
    let created = await dao.create(newListing);

})


//test('msg',function(){});

test('Testing Create listing', async function(){
    let newListing = {title:'test T', titleFR:'le test T', body:'test B', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2021-08-01'), 
                        autoOpen:false, autoClose:false, active:true, type:'Event'};
    let created = await dao.create(newListing);
    let found = await dao.read(created._id);
    expect(created.title).toBe(found.title); //assertion
});

test('Testing ReadAll', async function(){
    let listings = await dao.readAll();
    expect(listings.length).toBeGreaterThan(0);
});

test('Testing Read', async function(){
    let newListing = {title:'---', titleFR:'---', body:'---', bodyFR:'---', 
                        link:'---.com', listStart:new Date('2021-01-01'), listEnd:new Date('2021-08-01'), 
                        autoOpen:false, autoClose:false, active:true, type:'---'};
    let created = await dao.create(newListing);
    let found = await dao.read(created._id);
    expect(found.title).toBe(created.title);
    expect(found.body).toBe(created.body);
});

test('Testing Delete', async function(){
    let newListing = {title:'+++', titleFR:'+++', body:'+++', bodyFR:'+++', 
                        link:'+++.com', listStart:new Date('2021-03-01'), listEnd:new Date('2021-06-01'), 
                        autoOpen:false, autoClose:false, active:true, type:'+++'};
    let created = await dao.create(newListing);
    let beforeSize = (await dao.readAll()).length;
    let deleted = await dao.del(created._id);
    let afterSize = (await dao.readAll()).length;
    expect(afterSize).toBe(beforeSize-1);
    expect(await dao.readAll).not.toContain(deleted);
});

test('Testing Delete all', async function(){
    await dao.deleteAll();
    let beforeSize = (await dao.readAll()).length;
    expect(beforeSize).toBe(1);
    await dao.deleteAll('test');
    let afterSize = (await dao.readAll()).length;
    expect(afterSize).toBe(0);


})

test('read services', async function(){
    let beforeSize = (await dao.readServices()).length;
    expect(beforeSize).toBe(0);
    let newListing = {title:'test T', titleFR:'le test T', body:'test B', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2021-08-01'), 
                        autoOpen:false, autoClose:false, active:true, type:'Service'};
    await dao.create(newListing);
    let afterSize = (await dao.readServices()).length;
    expect(afterSize).toBe(1);
});

test('read Medias', async function(){
    let beforeSize = (await dao.readMedias()).length;
    expect(beforeSize).toBe(0);
    let newListing = {title:'test T', titleFR:'le test T', body:'test B', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2021-08-01'), 
                        autoOpen:false, autoClose:false, active:true, type:'Media'};
    await dao.create(newListing);
    let afterSize = (await dao.readMedias()).length;
    expect(afterSize).toBe(1);
});

test('read Internships', async function(){
    let beforeSize = (await dao.readInternships()).length;
    expect(beforeSize).toBe(0);
    let newListing = {title:'test T', titleFR:'le test T', body:'test B', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2021-08-01'), 
                        autoOpen:false, autoClose:false, active:true, type:'Internship'};
    await dao.create(newListing);
    let afterSize = (await dao.readInternships()).length;
    expect(afterSize).toBe(1);
});

