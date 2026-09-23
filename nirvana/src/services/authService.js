import axios from "axios";

const BASE_URL = import.meta.env.VITE_LIFERAY_BASE_URL;

const serviceUsername = import.meta.env.VITE_LIFERAY_USERNAME;
const servicePassword = import.meta.env.VITE_LIFERAY_PASSWORD;
const serviceBasicAuth = btoa(`${serviceUsername}:${servicePassword}`);

export const resolveRole = (roleBriefs = []) => {
  if (!Array.isArray(roleBriefs) || roleBriefs.length === 0) {
    return "Manager";
  }

  const allKeys = roleBriefs.map((r) => r.key);
  if (allKeys.includes("HR")) {
    return "HR";
  }
  if (allKeys.includes("Administrator")) {
    return "HR";
  }
  return "Manager";
};

export const login = async (username, password) => {
  const basicAuth = btoa(`${username}:${password}`);

  try {
    await axios.get(
      `${BASE_URL}/o/headless-admin-user/v1.0/my-user-account`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );
  } catch (error) {
    console.error("Login Error Status:", error.response?.status);

    if (error.response?.status === 401) {
      throw new Error("Invalid username or password.");
    }

    throw new Error("Unable to reach the server. Please try again.");
  }

  let userResponse;

  try {
    userResponse = await axios.get(
      `${BASE_URL}/o/headless-admin-user/v1.0/user-accounts`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${serviceBasicAuth}`,
        },
        params: {
          filter: `emailAddress eq '${username}'`,
        },
      }
    );
  } catch (error) {
    console.error("Role Fetch Error:", error.response?.data);
    throw new Error("Unable to verify account permissions.");
  }

  const user = userResponse.data?.items?.[0];

  if (!user) {
    throw new Error("Account not found.");
  }

  console.log("Login -> roleBriefs:", user.roleBriefs);

  const role = resolveRole(user.roleBriefs);

  console.log("Login -> final resolved role:", role);

  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("role", role);
  localStorage.setItem("userName", user.name || "");
  localStorage.setItem("userEmail", user.emailAddress || "");

  sessionStorage.setItem("basicAuth", basicAuth);

  return { ...user, role };
};

export const logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("role");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  sessionStorage.removeItem("basicAuth");
};

export const getCurrentUser = () => ({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  role: localStorage.getItem("role") || "",
  name: localStorage.getItem("userName") || "",
  email: localStorage.getItem("userEmail") || "",
});

export const isHR = () => getCurrentUser().role === "HR";
export const isManager = () => getCurrentUser().role === "Manager";