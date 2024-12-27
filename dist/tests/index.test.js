"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let request = require("supertest");
let app = require("../dist/index.js");
describe("POST /create", () => {
    it('should create a new todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const todo = { id: 1, message: "make software", status: "doing" };
        const response = yield request(app).post('/create').send(todo);
        expect(response.statusCode).toBe(201);
    }));
    it('should not create a duplicate todo', () => {
        const todo = { id: 1, message: "make software", status: "doing" };
        const todo2 = { id: 1, message: "make software", status: "doing" };
        request(app).post('/create').send(todo);
        request(app).post('/create').send(todo2).expect(400);
    });
});
describe("PUT /update/:id", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const todo = { id: 1, message: "make software", status: "doing" };
        yield request(app).post('/create').send(todo);
    }));
    it('should update a todo', () => {
        const todo1 = { id: 1, message: "making software", status: "doing" };
        request(app).put('/update/1').send(todo1).expect(201);
    });
    it('should not update a non existing todo', () => {
        const todo1 = { id: 2, message: "making software", status: "doing" };
        request(app).put('/update/2').send(todo1).expect(404);
    });
});
describe("DELETE /delete/:id", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const todo = { id: 1, message: "make software", status: "doing" };
        yield request(app).post('/create').send(todo);
    }));
    it('should delete a todo', () => {
        request(app).delete('/delete/1').send({ id: 1 }).expect(201);
    });
    it('should not delete a todo', () => {
        request(app).delete('/delete/2').send({ id: 10 }).expect(404);
    });
});
