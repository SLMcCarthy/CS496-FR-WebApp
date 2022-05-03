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
    await dao.create(newListing);
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

test('testing update listing', async function(){
    let newListing = {title:'test T', titleFR:'le test T', body:'test B', bodyFR:'le test B', 
                    link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2021-08-01'), 
                    autoOpen:false, autoClose:false, active:true, type:'Event'};
    let created = await dao.create(newListing);
    created.title = 'updated test';
    created.active = false;
    await dao.update(created);
    let updated = await dao.read(created._id);
    expect(updated._id).toStrictEqual(created._id);
    expect(updated.title).toStrictEqual('updated test');
    expect(updated.active).toBe(false);
})

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
});

//Events
test('read Events', async function(){
    let beforeSize = (await dao.readEvents()).length;
    expect(beforeSize).toBe(1);
    let newListing = {title:'test T', titleFR:'le test T', body:'test B', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2021-08-01'), 
                        autoOpen:false, autoClose:false, active:true, type:'Event'};
    await dao.create(newListing);
    let afterSize = (await dao.readEvents()).length;
    expect(afterSize).toBe(2);
});

test('read events new', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Event', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readEventsNew();
    expect(listings.length).toBeGreaterThan(0);
});

test('read events old', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Event', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readEventsOld();
    expect(listings.length).toBeGreaterThan(0);
});

test('read events asc', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Event', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readEventsAsc();
    expect(listings.length).toBeGreaterThan(0);
});

test('read events desc', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Event', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readEventsDesc();
    expect(listings.length).toBeGreaterThan(0);
});

// Services
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

test('read Services new', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Service', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readServicesNew();
    expect(listings.length).toBeGreaterThan(0);
});

test('read Services old', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Service', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readServicesOld();
    expect(listings.length).toBeGreaterThan(0);
});

test('read Services asc', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Service', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readServicesAsc();
    expect(listings.length).toBeGreaterThan(0);
});

test('read Services desc', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Service', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readServicesDesc();
    expect(listings.length).toBeGreaterThan(0);
});

// Medias
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

test('read Medias new', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Media', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readMediasNew();
    expect(listings.length).toBeGreaterThan(0);
});

test('read Medias old', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Media', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readMediasOld();
    expect(listings.length).toBeGreaterThan(0);
});

test('read Medias asc', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Media', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readMediasAsc();
    expect(listings.length).toBeGreaterThan(0);
});

test('read Medias desc', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Media', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readMediasDesc();
    expect(listings.length).toBeGreaterThan(0);
});

// Internships
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

test('read Internships new', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Internship', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readInternshipsNew();
    expect(listings.length).toBeGreaterThan(0);
});

test('read Internships old', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Internship', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readInternshipsOld();
    expect(listings.length).toBeGreaterThan(0);
});

test('read Internships asc', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Internship', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readInternshipsAsc();
    expect(listings.length).toBeGreaterThan(0);
});

test('read Internships desc', async function(){
    let newListing = {title:'test A', titleFR:'le test A', body:'test A', bodyFR:'le test B', 
                        link:'test.com', listStart:new Date('2021-01-01'), listEnd:new Date('2022-10-10'), 
                        autoOpen:false, autoClose:false, active:true, type:'Internship', creation: new Date('2021-09-01')};
    await dao.create(newListing);
    let listings = await dao.readInternshipsDesc();
    expect(listings.length).toBeGreaterThan(0);
});