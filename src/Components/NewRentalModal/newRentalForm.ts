import * as yup from 'yup';

export const addNewRentalFormResolverShape = {
  manufacturer: yup.string().required('Manufacturer is required'),
  modelName: yup.string().required('Model Name is required'),
  year: yup
    .string()
    .notRequired()
    .test('Number only', 'Year should be a number', (value: any) => {
      const numberRegex = /^\d*\.?\d*$/;
      if (numberRegex.test(value)) {
        return true;
      }
      return false;
    })
    .test('Year too old', 'Should be greater than 1950', (value: any) => {
      const numValue = Number(value);
      if (!value || numValue > 1950) {
        return true;
      }
      return false;
    }),
  distance: yup
    .string()
    .required('Distance is required')
    .test('Number only', 'Distance should be a number', (value: any) => {
      const numberRegex = /^\d*\.?\d*$/;
      if (numberRegex.test(value)) {
        return true;
      }
      return false;
    }),
  vehicleImage1: yup.mixed().test('Empty', 'Image is required', (value: any) => {
    if (value.length > 0) {
      return true;
    }
    return false;
  }),
  vehicleImage2: yup.mixed().test('Empty', 'Image is required', (value: any) => {
    if (value.length === 0) {
      return false;
    }
    return true;
  }),
};
