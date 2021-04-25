import { handleGetMethod, handlePostMethod } from '../http-requests/httpServices';
import { endpoints } from '../endpoints';

export const fetchAllRentalData = async () => {
  const requestURL = `${endpoints.apiBaseURL}${endpoints.getAllRentalsEndpoint}`;
  const apiResponse = await handleGetMethod(requestURL, {});
  return apiResponse;
};

export const addNewRentalData = async (requestBody: Object) => {
  const requestURL = `${endpoints.apiBaseURL}${endpoints.addNewRentalEndpoint}`;
  const responseBody = await handlePostMethod(requestURL, {}, requestBody);
  return responseBody;
};
