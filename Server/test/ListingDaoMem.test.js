const dbcon = require('../model/DbConnection');
const dao = require('../model/ListingDaoMem');

beforeAll(function(){
    dbcon.connect('test');
});

afterAll(async function(){
    //await dao.deleteAll();
    dbcon.disconnect();
});

//test('msg',function(){});
test('Testing ReadAll', async function(){
    let listings = dao.readAll();
    expect(listings.length).toBeGreaterThan(0);
});

test('Testing Create listing', async function(){
    let newListing = {title:'test T', titleFR:'le test T', body:'test B', bodyFR:'le test B', 
                        link:'test.com', listStart:'2021-01-01', listEnd:'2021-08-01', 
                        autoOpen:false, autoClose:false, active:true, type:'Event'};
    let created = await dao.create(newListing);
    let found = await dao.read(created._id);
    expect(created.title).toBe(found.title); //assertion

});