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

export default liferayApi;