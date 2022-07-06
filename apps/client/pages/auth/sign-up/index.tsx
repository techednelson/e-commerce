import * as React from 'react';
import { FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { signUp } from '../../../services/auth';

const SignUp = () => {
  const { isLoading, isSuccess, mutateAsync } = useMutation(signUp);
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const payload = {
        email: formData.get('email'),
        password: formData.get('password'),
      };
      const { data } = await mutateAsync(payload);
      console.log(data);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.errors);
    }
  };

  return (
    <h1 className="text-3xl font-bold underline">Hello world Login page!</h1>
  );
};

export default SignUp;
