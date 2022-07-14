import React, { FC } from 'react';
import Navbar from '../navbar/navbar';
import Spinner from './spinner';
import SignInUpModal from './signInUpModal';

const Layout: FC<any> = ({ children }) => (
  <>
    <Navbar />
    {children}
    {/*<Spinner />*/}
    <SignInUpModal />
  </>
);

export default Layout;
