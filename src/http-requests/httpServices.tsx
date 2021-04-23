import axiosClient from './axios-client';

export const handleGetMethod = async (endPoint: any, apiConfig: any) => {
  try {
    const apiResponse = await axiosClient.get(endPoint, apiConfig);
    if (apiResponse.data && apiResponse.data.success) {
      const data = apiResponse.data;
      return data;
    }
  } catch (err) {
    throw err;
  }
};

export const handlePostMethod = async (endPoint: string, apiConfig: Object, requestBody: Object) => {
  try {
    const apiResponse = await axiosClient.post(endPoint, requestBody, apiConfig);
    if (apiResponse.data && apiResponse.data.success) {
      const data = apiResponse.data;
      return data;
    }
  } catch (err) {
    throw err;
  }
};
