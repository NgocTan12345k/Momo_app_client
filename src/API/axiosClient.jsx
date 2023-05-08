import axios from "axios";

const createAPI = () => {
  const APIInstance = axios.create({
    // baseURL: "http://localhost:5005/api",
    baseURL: "https://momo-app-server.onrender.com/api",
  });
  return APIInstance;
};

const instance = createAPI();

function handleResult(api) {
  return api
    .then((res) => {
      return handleResponse(res);
    })
    .catch(async (err) => {
      return handleResponse(err);
    });
}

function handleResponse(data) {
  if (data.status === 200 || data.status === 201) {
    return Promise.resolve(data);
  }
  return Promise.reject(data);
}

export const APIClient = {
  get: (url, payload) => handleResult(instance.get(url, payload)),
  post: (url, payload) => handleResult(instance.post(url, payload)),
  put: (url, payload) => handleResult(instance.put(url, payload)),
  delete: (url, payload) =>
    handleResult(instance.delete(url, { data: payload })),
};
