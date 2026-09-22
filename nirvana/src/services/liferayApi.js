import axios from "axios";

const username = import.meta.env.VITE_LIFERAY_USERNAME;
const password = import.meta.env.VITE_LIFERAY_PASSWORD;

const basicAuth = btoa(`${username}:${password}`);

const liferayApi = axios.create({
  baseURL: "/o/c",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${basicAuth}`,
  },

  withCredentials: true,
});

// GET ALL
export const getCandidates = async () => {
  const response = await liferayApi.get("/candidates/");
  return response.data;
};

// GET BY ID
export const getCandidateById = async (id) => {
  const response = await liferayApi.get(`/candidates/${id}`);
  return response.data;
};

// CREATE
export const createCandidate = async (candidateData) => {
  console.log("CREATE REQUEST BODY:", candidateData);

  const response = await liferayApi({
    method: "POST",
    url: "/candidates/",
    data: candidateData,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth}`,
    },
  });

  return response.data;
};

// UPDATE
export const updateCandidate = async (id, candidateData) => {
  const response = await liferayApi({
    method: "PUT",
    url: `/candidates/${id}`,
    data: candidateData,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth}`,
    },
  });

  return response.data;
};

// DELETE
export const deleteCandidate = async (id) => {
  const response = await liferayApi.delete(
    `/candidates/${id}`
  );

  return response.data;
};

export default liferayApi;