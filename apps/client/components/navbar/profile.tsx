import React from 'react';
import useStore from '../../store/useStore';
import { userSelector } from '../../store/selectors';
import Image from 'next/image';
import { useMutation, useQuery } from 'react-query';
import { currentUser, signOut } from '../../services/auth';
import { useRouter } from 'next/router';
import { refreshBrowser } from '../../utils';

const Profile = () => {
  const { mutateAsync } = useMutation(signOut);
  const { user, setUser } = useStore(userSelector);
  const { data } = useQuery(['currentUser'], currentUser, { enabled: !user });
  const router = useRouter();
  setUser(user ?? data?.currentUser);

  const handleSignOut = async () => {
    try {
      await mutateAsync();
      setUser(null);
      refreshBrowser(router);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {user ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src="https://placeimg.com/80/80/people"
                alt="profile"
                width="42"
                height="42"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={handleSignOut}>Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <label htmlFor="sign-in-up-modal" className="btn btn-link">
          Sign In
        </label>
      )}
    </>
  );
};

export default Profile;
