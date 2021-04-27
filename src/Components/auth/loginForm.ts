import * as yup from 'yup';
import { emailRegex } from '../../constants/email';

export const loginFormResolverShape = {
  email: yup
    .string()
    .required('Email is required')
    .test('Email Pattern', 'Invalid email address', (value: any) => {
      if (emailRegex.test(value)) {
        return true;
      }
      return false;
    }),
  password: yup
    .string()
    .required('Password is required')
    .test('Length', 'Password should be 8 characters long ', (value: any) => {
      if (value.length >= 8) {
        return true;
      }
      return false;
    }),
};
