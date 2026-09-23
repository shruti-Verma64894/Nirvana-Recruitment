import axios from "axios";
import { resolveRole } from "./authService";

const BASE_URL = import.meta.env.VITE_LIFERAY_BASE_URL;

const serviceUsername = import.meta.env.VITE_LIFERAY_USERNAME;
const servicePassword = import.meta.env.VITE_LIFERAY_PASSWORD;
const serviceBasicAuth = btoa(`${serviceUsername}:${servicePassword}`);

export const getUsers = async () => {

  const response = await axios.get(
    `${BASE_URL}/o/headless-admin-user/v1.0/user-accounts`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${serviceBasicAuth}`,
      },
      params: {
        pageSize: 100,
      },
    }
  );

  return response.data.items || [];
};