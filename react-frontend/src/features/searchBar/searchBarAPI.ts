import { axiosClient } from "../../app/axiosClient";

// A mock function to mimic making an async request for data
export function fetchClients(query: string) {
  if (Number.isNaN(Number(query))) {
    query = "search=" + query;
  } else {
    query = "id=" + query;
  }
  return axiosClient.get(`/clients/?${query}`).then(response => response);
};