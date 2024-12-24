let request = require("supertest");
let app = require("../dist/index.js")


describe("POST /create", () => {
  it('should create a new todo', async ()=> {
    const todo = {id: 1, message: "make software", status: "doing"}
    const response = await request(app).post('/create').send(todo);
    expect(response.statusCode).toBe(201);
  });

  it('should not create a duplicate todo',  ()=> {
    const todo = {id: 1, message: "make software", status: "doing"}
    const todo2 = {id: 1, message: "make software", status: "doing"}

    request(app).post('/create').send(todo);
    request(app).post('/create').send(todo2).expect(400)
  });
})

describe("PUT /update/:id", ()=> {
  beforeEach(async () => {
    const todo = {id: 1, message: "make software", status: "doing"}
    await request(app).post('/create').send(todo);
  });

  it('should update a todo', ()=>{
    const todo1 = {id: 1, message: "making software", status: "doing"}
    request(app).put('/update/1').send(todo1).expect(201)
  })
  
  it('should not update a non existing todo', () => {
    const todo1 = {id: 2, message: "making software", status: "doing"}
    request(app).put('/update/2').send(todo1).expect(404)
  })
})

describe("DELETE /delete/:id", ()=> {
  beforeEach(async () => {
    const todo = {id: 1, message: "make software", status: "doing"}
    await request(app).post('/create').send(todo);
  });

    it('should delete a todo', () => {
      request(app).delete('/delete/1').send({id: 1}).expect(201)
    })

    it('should not delete a todo', () => { 
      request(app).delete('/delete/2').send({id: 10}).expect(404)
    })
})
