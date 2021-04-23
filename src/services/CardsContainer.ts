import { handleGetMethod } from '../http-requests/httpServices';

const apiBaseURL = `http://localhost:5000/api/v1/`;
const getAllRentalsEndpoint = `rentals/getAllRentals`;

export const fetchCardsData = async () => {
  const responseObject = await handleGetMethod(`${apiBaseURL}${getAllRentalsEndpoint}`, {});
  return responseObject.data;
};
