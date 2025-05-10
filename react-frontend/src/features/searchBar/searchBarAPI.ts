// A mock function to mimic making an async request for data
export function fetchClients(query: string) {
  //const response = await axios.get(`/api/clients?query=${query}`);
  return new Promise<{ data: string[] }>((resolve) =>
    setTimeout(() => resolve({ data: ["Martin Durand", "Jeanne d'Arc"] }), 500)
  );
};