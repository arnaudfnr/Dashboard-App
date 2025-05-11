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

export function fetchClients() {
  return axiosClient.get(`/clients/`).then(response => response);
};

export function fetchConsumptions(clientId: string) {
  return axiosClient.get(`/consumption/?client_id=${clientId}`).then(response => response);
}