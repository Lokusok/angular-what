import Fastify from 'fastify';
import cors from '@fastify/cors';

import db from './db.js';
import { DELETE, POST, PUT } from './schemas.js';

const fastify = Fastify();
await fastify.register(cors, {});

fastify.get('/', async () => {
  return db;
});

fastify.get('/users', async (req) => {
  return db.users;
});

fastify.get('/users/:id', async (req) => {
  return db.users.find((user) => user.id === req.params.id);
});

fastify.post(
  '/users',
  {
    schema: POST.users,
  },
  async (req) => {
    db.users.push(req.body);
    return db.users;
  }
);

fastify.put(
  '/users/:id',
  {
    schema: PUT.users,
  },
  async (req) => {
    db.users = db.users.map((user) => (user.id === req.params.id ? req.body : user));
    return db.users;
  }
);

fastify.delete(
  '/users/:id',
  {
    schema: DELETE.users,
  },
  async (req) => {
    db.users = db.users.filter((user) => user.id !== req.params.id);
    return db.users;
  }
);

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
