import axiosClient from './axios-client';

export const handleGetMethod = async (endPoint: any, apiConfig: any) => {
  const apiResponse = await axiosClient.get(endPoint, apiConfig);
  return apiResponse;
};

export const handlePostMethod = async (endPoint: string, apiConfig: Object, requestBody: Object) => {
  const apiResponse = await axiosClient.post(endPoint, requestBody, apiConfig);
  return apiResponse;
};
