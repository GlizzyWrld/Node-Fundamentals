process.env.NODE_ENV = "test";
const request = require('supertest')
const app = require('./app')



describe("GET/companies", () =>{
    test('Getting all companies', async () => {
        res = await request(app).get('/companies')
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"companies": [{"code": "apple", "name": "Apple Computer"}, {"code": "ibm", "name": "IBM"}, {"code": "Gucci", "name": "Versace Robe"}, {"code": "Off-WHite", "name": "Omg what happened to Virgil"}]})
    })
})

describe("POST/companies", () =>{
    test('Creating a company', async () => {
        res = await request(app).post('/companies').send({code: 'apple product', name: 'apple ipad', description: 'first apple product I had'});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({company:{code: "apple product", name: "apple ipad", description: 'first apple product I had'}});
    })
})