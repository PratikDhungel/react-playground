import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: '001', label: 'Kathmandu Valley' },
  { value: '002', label: 'Pokhara' },
  { value: '003', label: 'Biratnagar' },
];

const ReactSelect = () => {
  const { register, errors, control, handleSubmit } = useForm();

  // const control = () => {
  //   console.log('This is ground control to Major Tom');
  // };

  const submitForm = (data: any) => {
    console.log(data);
    data.cityMultiSelect.forEach((option: any) => {
      console.log(option.value);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          as={Select}
          control={control}
          // isMulti
          name='cityMultiSelect'
          options={options}
          className='basic-multi-select multi-select'
        />
        {/* <Select name='city' isMulti options={options} className='basic-multi-select multi-select' ref={register} /> */}
        <input name='firstName' type='text' ref={register} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default ReactSelect;
