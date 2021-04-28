import { handlePostMethod } from '../../http-requests/httpServices';
import { endpoints } from '../../constants/endpoints';

export const loginUser = async (requestBody: Object) => {
  const apiRequestBody = JSON.stringify(requestBody);
  const requestURL = `${endpoints.apiBaseURL}${endpoints.loginEndpoint}`;
  const apiResponse = await handlePostMethod(requestURL, {}, apiRequestBody);
  return apiResponse;
};
