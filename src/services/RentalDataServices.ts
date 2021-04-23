import { handleGetMethod, handlePostMethod } from '../http-requests/httpServices';
import { endpoints } from '../endpoints';

export const fetchAllRentalData = async () => {
  const requestURL = `${endpoints.apiBaseURL}${endpoints.getAllRentalsEndpoint}`;
  const responseObject = await handleGetMethod(requestURL, {});
  return responseObject.data;
};

export const addNewRentalData = async (requestBody: Object) => {
  const requestURL = `${endpoints.apiBaseURL}${endpoints.addNewRentalEndpoint}`;
  const responseObject = await handlePostMethod(requestURL, {}, requestBody);
  return responseObject;
};
