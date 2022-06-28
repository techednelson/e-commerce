import request from 'supertest';
import app from '../../app';
import { Url } from '../../enums/url';

it('fails when a email that does not exist is supplied', async () => {
  return request(app)
    .post(Url.SignIn)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post(Url.SignUp)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post(Url.SignIn)
    .send({
      email: 'test@test.com',
      password: 'aslkdfjalskdfj',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post(Url.SignUp)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post(Url.SignIn)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
