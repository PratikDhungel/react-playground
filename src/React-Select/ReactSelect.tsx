import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: '001', label: 'Kathmandu Valley' },
  { value: '002', label: 'Pokhara' },
  { value: '003', label: 'Biratnagar' },
];

const scheme = yup.object().shape({
  fullName: yup.string().required('This field is required'),
  email: yup.string().required('This field is required').email('Invalid Email'),
});

const ReactSelect = () => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(scheme),
  });

  const submitForm = (data: any) => {
    console.log(data);
  };

  const handleErrors = (errors: any) => {
    console.log(errors);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm, handleErrors)}>
        <input {...register('fullName')} type='text' placeholder='Full Name' />
        <div>{errors.fullName?.message}</div>
        <input {...register('email')} type='text' placeholder='Email' />
        <div>{errors.email?.message}</div>
        <Controller
          control={control}
          name='cityMultiSelect'
          render={({ field }) => <Select {...field} isMulti options={options} className='basic-multi-select multi-select' />}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default ReactSelect;
