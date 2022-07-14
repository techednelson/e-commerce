import axios from 'axios';
import { Url, ISignInUp } from '@e-commerce/domain';

export const signUp = async (body: ISignInUp) =>
  await axios.post(Url.SignUp, body);

export const signIn = async (body: ISignInUp) =>
  await axios.post(Url.SignIn, body);

export const signOut = async () => await axios.post(Url.SingOut);

export const currentUser = async () => await axios.get(Url.CurrentUser);
