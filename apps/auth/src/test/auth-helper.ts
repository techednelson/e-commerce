import request from 'supertest';
import app from '../app/app';
import { Url } from '../app/enums/url';

const authHelper = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post(Url.SignUp)
    .send({
      email,
      password,
    })
    .expect(201);

  return response.get('Set-Cookie');
};

export default authHelper;
