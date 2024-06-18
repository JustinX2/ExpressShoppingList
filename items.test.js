const request= require('supertest');
const app=require('../app');
const global=require('../fakeDb');

beforeEach(function(){
    items.length=0;
    items.push({name:'item1', price:10});
});

describe('GET /items', function(){
    const res=await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({items:[{name:'item1', price:10}]});
});

describe('POST /items', function(){
    const res=await request(app).post('/items').send({name:'item2', price:20});
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({added:{name:'item2', price:20}});
});

describe('GET /items/:name', function(){
    const res=await request(app).get('/items/item1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({name:'item1', price:10});
});

describe('PATCH /items/:name', function(){
    const res=await request(app).patch('/items/item1').send({name:'item1', price:20});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({updated:{name:'item1', price:20}});
});

describe('DELETE /items/:name', function(){
    const res=await request(app).delete('/items/item1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({message:'Deleted'});
    expect(items.length).toBe(0);
});