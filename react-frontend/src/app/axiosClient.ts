import axios from 'axios';

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:8000/api/';

axiosClient.defaults.headers.common = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

export function searchClients(query: string) {
  return axiosClient.get(`/clients/?${query}`).then(response => response);
};

/*
Here I did not use the endpoint admin/clients to fetch the clients
because I did not want to set authentication on React side.
I understood it was not an essential part of the technical test.
*/
export function fetchClients(page: number) {
  return axiosClient.get(`/clients/?page=${page}`).then(response => response);
};

export function fetchConsumptions(clientId: string) {
  return axiosClient.get(`/consumption/?client_id=${clientId}`).then(response => response);
}