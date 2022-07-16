import request from 'supertest';
import app from '../../app';
import { Url } from '@e-commerce/shared';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post(Url.SignUp)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app).post(Url.SingOut).send({}).expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
