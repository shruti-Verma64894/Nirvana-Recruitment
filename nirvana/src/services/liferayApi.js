import axios from "axios";

const liferayApi = axios.create({
  baseURL: "/o/c",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCandidates = async () => {
  const response = await liferayApi.get("/candidates");

  return response.data;
};

export default liferayApi;