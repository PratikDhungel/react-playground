import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { loginFormResolverShape } from './loginForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Row, Col, Button } from 'react-bootstrap';

const Login = () => {
  const resolverScheme = yup.object().shape(loginFormResolverShape);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resolverScheme) });

  const submitLoginForm = async (data: any) => {
    console.log(data);
  };

  const handleErrors = (errors: any) => {
    console.log(errors);
  };

  return (
    <div className='login-container'>
      <Form className='login-form' onSubmit={handleSubmit(submitLoginForm, handleErrors)}>
        <div className='login-form__title'>
          <h2>Rent Out</h2>
        </div>
        <div className='login-form__form-title'>
          <h3>Login</h3>
        </div>
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
      </Form>
    </div>
  );
};

export default Login;
