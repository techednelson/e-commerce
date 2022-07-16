import request from 'supertest';
import app from '../../app';
import { Url } from '@e-commerce/shared';

it('returns a 201 on successful sign-up', async () =>
  request(app)
    .post(Url.SignUp)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201));

it('returns a 400 with an invalid email', async () =>
  request(app)
    .post(Url.SignUp)
    .send({
      email: 'alskdflaskjfd',
      password: 'password',
    })
    .expect(400));

it('returns a 400 with an invalid password', async () =>
  request(app)
    .post(Url.SignUp)
    .send({
      email: 'alskdflaskjfd',
      password: 'p',
    })
    .expect(400));

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post(Url.SignUp)
    .send({
      email: 'test@test.com',
    })
    .expect(400);

  await request(app)
    .post(Url.SignUp)
    .send({
      password: 'alskjdf',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post(Url.SignUp)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post(Url.SignUp)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after successful sign-up', async () => {
  const response = await request(app)
    .post(Url.SignUp)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
