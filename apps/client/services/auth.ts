import axios from 'axios';

export const signUp = async (body: any) =>
  await axios.post('/api/users/sign-up', body);
