import axios from "axios";

const BASE_URL = import.meta.env.VITE_LIFERAY_BASE_URL;

// Roles jo humare app me matter karti hain (priority order)
// pehle ye line thi:
// const resolveRole = (roleBriefs = []) => { ... };

// isko export kar do:
export const resolveRole = (roleBriefs = []) => {
  const keys = roleBriefs.map((r) => r.key);

  if (keys.includes("HR")) return "HR";
  if (keys.includes("Manager")) return "Manager";
  if (keys.includes("Administrator")) return "HR";

  return null;
};

export const login = async (username, password) => {
  const basicAuth = btoa(`${username}:${password}`);

  let response;

  try {
    response = await axios.get(
      `${BASE_URL}/o/headless-admin-user/v1.0/my-user-account`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Invalid username or password.");
    }
    throw new Error("Unable to reach the server. Please try again.");
  }

  const user = response.data;
  const role = resolveRole(user.roleBriefs);

  if (!role) {
    throw new Error(
      "Your account doesn't have HR or Manager access assigned."
    );
  }

  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("role", role);
  localStorage.setItem("userName", user.name || "");
  localStorage.setItem("userEmail", user.emailAddress || "");

  // Login credentials ko session ke liye bhi rakhna hoga,
  // taaki candidate API calls bhi isi user ke saath ho sakein
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

