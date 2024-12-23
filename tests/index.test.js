const request = require("supertest");
const app = require("../dist/index.js");

describe("POST /create", () => {
  it('should create a new todo', async ()=> {
    const todo = {id: 1, message: "make software", status: "doing"}
    const response = await request(app).post('/create').send(todo);

    expect(response.statusCode).toBe(201);
  });

  it('should not create a duplicate todo', async ()=> {
    const todo = {id: 1, message: "make software", status: "doing"}
    const todo2 = {id: 1, message: "make software", status: "doing"}

    await request(app).post('/create').send(todo1);
    const response2 = await request(app).post('/create').send(todo2);

    expect(response2.statusCode).toBe(400);
  });
})

describe("PUT /update/:id", ()=> {
  beforeEach(async () => {
    const todo = {id: 1, message: "make software", status: "doing"}
    await request(app).post('/create').send(todo);
  });

  it('should update a todo', async ()=>{
    const todo1 = {id: 1, message: "making software", status: "doing"}
    const response = await request(app).put('/update/1').send(todo1);
    expect(response.statusCode).toBe(201)
  })
  
  it('should not update a non existing todo', async () => {
    const todo1 = {id: 2, message: "making software", status: "doing"}
    const response1 = await request(app).put('/update/2').send(todo1);
    expect(response1.statusCode).toBe(404)
  })

 describe("DELETE /delete/:id", ()=> {
  beforeEach(async () => {
    const todo = {id: 1, message: "make software", status: "doing"}
    await request(app).post('/create').send(todo);
  });

    it('should delete a todo', async () => {
      const response1 = await request(app).delete('/delete/1').send({id: 1});
      expect(response1.statusCode).toBe(201)
    })

    it('should not delete a todo', async () => { 
      const response1 = await request(app).delete('/delete/2').send({id: 2});
      expect(response1.statusCode).toBe(404)
    })
 })
})