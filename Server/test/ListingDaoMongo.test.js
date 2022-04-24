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