import axios from "axios";

const liferayApi = axios.create({
  baseURL: "/o/c",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_LIFERAY_TOKEN}`,
  },
});

export const getCandidates = async () => {
  const response = await liferayApi.get("/candidates");

  return response.data;
};

export const createCandidate = async (candidateData) => {
  const response = await liferayApi.post(
    "/candidates",
    candidateData
  );

  return response.data;
};

export const getCandidateById = async (id) => {
  const response = await liferayApi.get(
    `/candidates/${id}`
  );

  return response.data;
};
export const updateCandidate = async (
  id,
  candidateData
) => {
  const response = await liferayApi.put(
    `/candidates/${id}`,
    candidateData
  );

  return response.data;
};
export const deleteCandidate = async (id) => {
  const response = await liferayApi.delete(
    `/candidates/${id}`
  );

  return response.data;
};

export default liferayApi;