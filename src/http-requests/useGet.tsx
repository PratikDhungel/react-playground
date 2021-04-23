import React, { useCallback, useEffect, useState } from 'react';
import axiosClient from './axios-client';

const defaultApiStates = {
  apiResponseData: {
    success: false,
    message: 'Loading',
    data: [],
  },
  isApiLoading: false,
  isApiError: false,
};

// const responseDataDefaultState = ;

const useGet = (endPoint: any, apiConfig: any) => {
  const [apiRequestStates, setApiRequestStates] = useState(defaultApiStates);

  console.log('Render useGet');

  const callAPI = useCallback(async () => {
    console.log('useGet callAPI');

    console.log('Set Loading true');
    setApiRequestStates({ ...apiRequestStates, isApiLoading: true });
    try {
      const apiResponse = await axiosClient.get(endPoint, apiConfig);
      if (apiResponse.data && apiResponse.data.success) {
        const data = apiResponse.data;
        console.log('Set Data');
        setApiRequestStates({ ...apiRequestStates, apiResponseData: data, isApiLoading: false });
      } else {
      }
    } catch (err) {
      console.log('Set Error True');
      setApiRequestStates({ ...apiRequestStates, isApiError: true, isApiLoading: false });
      throw err;
    }
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setApiRequestStates({ ...apiRequestStates, isApiLoading: true });
  //     try {
  //       const apiResponse = await axiosClient.get(endPoint, apiConfig);
  //       if (apiResponse.data && apiResponse.data.success) {
  //         const data = apiResponse.data;
  //         setApiRequestStates({ ...apiRequestStates, apiResponseData: data, isApiLoading: false });
  //       } else {
  //       }
  //     } catch (err) {
  //       setApiRequestStates({ ...apiRequestStates, isApiError: true });
  //       throw err;
  //     }
  //   };

  //   fetchData();
  // }, []);

  return { apiRequestStates, callAPI };
};

export default useGet;
