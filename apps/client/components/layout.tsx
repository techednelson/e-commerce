import { FC } from 'react';
import Spinner from './spinner';
import SignInUpModal from './signInUpModal';
import Navbar from './navbar/navbar';

const Layout: FC<any> = ({ children }) => (
  <>
    <Navbar />
    {children}
    {/*<Spinner />*/}
    <SignInUpModal />
  </>
);

export default Layout;
