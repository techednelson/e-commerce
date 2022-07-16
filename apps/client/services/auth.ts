import { ISignInUp, Url } from '@e-commerce/shared';
import { getAxios, postAxios } from '../utils';

export const signUp = (body: ISignInUp) => postAxios(Url.SignUp, body);

export const signIn = (body: ISignInUp) => postAxios(Url.SignIn, body);

export const signOut = () => postAxios(Url.SingOut);

export const currentUser = () => getAxios(Url.CurrentUser);
