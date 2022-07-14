import React, { memo } from 'react';
import Link from 'next/link';
import Cart from './cart';
import Notification from './notification';
import Profile from './profile';
import Image from 'next/image';

const Navbar = () => (
  <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm">
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">
            <Image
              src="/assets/images/logo_nav.png"
              alt="logo"
              width="42"
              height="42"
            />
          </a>
        </Link>
        <Link href="/categories?category=women">
          <a className="btn btn-ghost normal-case text-xl">Women</a>
        </Link>
        <Link href="/categories?category=men">
          <a className="btn btn-ghost normal-case text-xl">Men</a>
        </Link>
        <Link href="/categories?category=kids">
          <a className="btn btn-ghost normal-case text-xl">Kids</a>
        </Link>
      </div>
      <div className="navbar-center">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
            />
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <Cart />
        <Notification />
        <Profile />
      </div>
    </nav>
  </div>
);

export default memo(Navbar);
