import request from 'supertest';
import app from '../../app';
import { Url } from '@e-commerce/shared';
import authCookieHelper from '../../../test/auth-helper';

it('responds with details about the current user', async () => {
  const cookie = await authCookieHelper();

  const response = await request(app)
    .get(Url.CurrentUser)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app).get(Url.CurrentUser).send().expect(200);

  expect(response.body.currentUser).toEqual(null);
});
