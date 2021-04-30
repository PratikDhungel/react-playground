import React, { useEffect, useRef, useState } from 'react';

import * as yup from 'yup';
import { Redirect } from 'react-router';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { loginFormResolverShape } from './loginForm';
import { yupResolver } from '@hookform/resolvers/yup';

import Loading from '../Common/Loading';
import { errorToast, successToast } from '../../utils/toast/toast';
import { loginUser } from '../../services/auth/loginServices';
import { authenticate } from '../../utils/auth/authentication';

interface ILoginFormStates {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}

const initialFormState: ILoginFormStates = {
  isSuccess: false,
  isError: false,
  isLoading: false,
};

let containerHeight: number | undefined;

const Login = () => {
  const [loginFormStates, setLoginFormStates] = useState<ILoginFormStates>(initialFormState);
  const { isSuccess, isLoading } = loginFormStates;

  const formFieldsContainerRef = useRef<HTMLDivElement>(null);

  const resolverScheme = yup.object().shape(loginFormResolverShape);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resolverScheme) });

  const submitLoginForm = async (formData: any) => {
    setLoginFormStates({ ...loginFormStates, isLoading: true });
    try {
      const loginUserResponseBody = await loginUser(formData);
      const authToken = loginUserResponseBody.data.data.token;
      const message = loginUserResponseBody.data.message;
      authenticate(authToken, () => setLoginFormStates({ ...loginFormStates, isSuccess: true, isLoading: false }));
      successToast(message);
    } catch (err) {
      setLoginFormStates({ isLoading: false, isSuccess: false, isError: true });
      const errorMessage = err.response.data.error;
      errorToast(errorMessage);
    }
  };

  const handleErrors = (errors: any) => {
    console.log(errors);
  };

  const redirectUser = () => {
    if (isSuccess) {
      return <Redirect to='/' />;
    }
  };

  useEffect(() => {
    let formContainerHeight: number | undefined;
    formContainerHeight = formFieldsContainerRef?.current?.getBoundingClientRect().height;
    containerHeight = formContainerHeight;
  }, []);

  return (
    <div className='login-container'>
      <Form className='login-form' onSubmit={handleSubmit(submitLoginForm, handleErrors)}>
        <div className='login-form__title'>
          <h2>Rent Out</h2>
        </div>
        <div className='login-form__form-title'>
          <h3>Login</h3>
        </div>
        {isLoading ? (
          <Loading containerHeight={containerHeight} />
        ) : (
          <div ref={formFieldsContainerRef}>
            <Form.Row className='login-form__row'>
              <Form.Label className='field-title'>Email</Form.Label>
              <Form.Control
                placeholder='Email'
                className='login-form__input'
                {...register('email')}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid' className='login-form_error'>
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Row>
            <Form.Row className='login-form__row'>
              <Form.Label className='field-title'>Password</Form.Label>
              <Form.Control
                placeholder='Password'
                type='password'
                className='login-form__input'
                {...register('password')}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type='invalid' className='login-form_error'>
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Row>
            <div className='btn-container'>
              <Button type='submit' className='btn login-btn'>
                Continue
              </Button>
            </div>
          </div>
        )}
      </Form>
      {redirectUser()}
    </div>
  );
};

export default Login;
