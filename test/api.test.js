const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Import the server code, but we need to refactor server.js to export the app for testing
let app;

beforeAll(() => {
  app = require('../server');
});

describe('Todo API', () => {
  let todoId;

  it('should start with an empty todo list', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('should add a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ text: 'Test todo' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.text).toBe('Test todo');
    expect(res.body.completed).toBe(false);
    todoId = res.body.id;
  });

  it('should list the added todo', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].id).toBe(todoId);
  });

  it('should update a todo (toggle completed)', async () => {
    const res = await request(app)
      .patch(`/todos/${todoId}`)
      .send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it('should delete a todo', async () => {
    const res = await request(app).delete(`/todos/${todoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(todoId);
  });

  it('should return 404 for deleting non-existent todo', async () => {
    const res = await request(app).delete(`/todos/9999`);
    expect(res.statusCode).toBe(404);
  });

  it('should return 400 for adding todo without text', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.statusCode).toBe(400);
  });
});
