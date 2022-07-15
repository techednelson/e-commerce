import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useMutation } from 'react-query';
import { signIn, signUp } from '../services/auth';
import { useRouter } from 'next/router';
import { refreshBrowser } from '../utils';

const SignInUpModal = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const signInMutation = useMutation(signIn);
  const signUpMutation = useMutation(signUp);
  const [errors, setErrors] = useState<[]>([]);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const payload = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      isSignIn
        ? await signInMutation.mutateAsync(payload)
        : await signUpMutation.mutateAsync(payload);
      refreshBrowser(router);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="checkbox" id="sign-in-up-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-96 h-96">
          <label
            htmlFor="sign-in-up-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="text-center">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width="100"
              height="100"
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="input input-bordered input-primary w-full max-w-xs my-1"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input input-bordered input-primary w-full max-w-xs my-1"
            />
            <div className="my-1">
              <button type="submit" className="btn w-80">
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
            <p>
              {isSignIn ? "Don't have an account?" : 'Do you have an account?'}
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignInUpModal;
