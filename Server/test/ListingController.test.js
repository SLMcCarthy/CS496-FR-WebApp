const dbcon = require('../model/DbConnection');
const controller = require('../controller/ListingController');
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

test('Controller getEvents',function(){
    controller.getEvents(req,res);
    expect(res._status).toBe(200); 
    expect(res._send.length).toBe(0);
});

test('controller get listing', function(){
    req.params = {id:'listing'};
    controller.get(req,res);
    expect(res._status).toBe(200);
    expect(res._send).toBe('found');
    req.params.id = 'check false';
    controller.get(req,res);
    expect(res._status).toBe(404);
    expect(res._send).toStrictEqual({msg:'Listing not found.'});
});

test('controller deleteone listing', function(){
    req.params = {id:'delete'};
    controller.deleteOne(req,res);
    expect(res._redirect).toBe('/admin_page.html');
});

test('controller create listing', function(){
    req.body = {title:"test title", titleFR:"le test", body:"test body",
                bodyFR:"le body", link:"test.com", listStart: new Date('2021-11-05T13:15:30Z'),
                listEnd:new Date('2021-11-05T13:15:30Z'), autoOpen:false, autoClose:false,
                active: false, type: "Event"}
    controller.postCreateOrUpdateListing(req,res);
    expect(res._redirect).toBe('admin_page.html');
    expect(res._status).toBe(201);
});

test('controller update listing', function(){
    req.body = {listingId:1, title:"test title", titleFR:"le test", body:"test body",
                bodyFR:"le body", link:"test.com", listStart: new Date('2021-11-05T13:15:30Z'),
                listEnd:new Date('2021-11-05T13:15:30Z'), autoOpen:false, autoClose:false,
                active: false, type: "Event"}
    controller.postCreateOrUpdateListing(req,res);
    expect(res._redirect).toBe('admin_page.html');
    expect(res._status).toBe(200);
});

test('get services', function(){
    controller.getServices(req,res);
    expect(res._status).toBe(208)
});

test('Controller getServicesAsc',function(){
    controller.getServicesAsc(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getServicesDesc',function(){
    controller.getServicesDesc(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getServicesNew',function(){
    controller.getServicesNew(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getServicesOld',function(){
    controller.getServicesOld(req,res);
    expect(res._status).toBe(200); 
});





test('Controller getAll',function(){
    controller.getAll(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getEventsAsc',function(){
    controller.getEventsAsc(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getEventsDesc',function(){
    controller.getEventsDesc(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getEventsNew',function(){
    controller.getEventsNew(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getEventsOld',function(){
    controller.getEventsOld(req,res);
    expect(res._status).toBe(200); 
});


test('Controller getInternships',function(){
    controller.getInternships(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getInternshipsAsc',function(){
    controller.getInternshipsAsc(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getInternshipsDesc',function(){
    controller.getInternshipsDesc(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getInternshipsNew',function(){
    controller.getInternshipsNew(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getInternshipsOld',function(){
    controller.getInternshipsOld(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getMedias',function(){
    controller.getMedias(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getMediasAsc',function(){
    controller.getMediasAsc(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getMediasDesc',function(){
    controller.getMediasDesc(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getMediasNew',function(){
    controller.getMediasNew(req,res);
    expect(res._status).toBe(200); 
});

test('Controller getMediasOld',function(){
    controller.getMediasOld(req,res);
    expect(res._status).toBe(200); 
});
//-------------------


