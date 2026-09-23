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

const ASSIGNMENTS_STORAGE_KEY = "candidateManagerAssignments";

const getStoredAssignments = () => {
  try {
    return JSON.parse(
      localStorage.getItem(ASSIGNMENTS_STORAGE_KEY) || "{}"
    );
  } catch {
    return {};
  }
};

const storeAssignment = (candidateId, email) => {
  if (!candidateId) return;

  const assignments = getStoredAssignments();

  if (email) {
    assignments[candidateId] = email;
  } else {
    delete assignments[candidateId];
  }

  localStorage.setItem(
    ASSIGNMENTS_STORAGE_KEY,
    JSON.stringify(assignments)
  );
};

const withStoredAssignment = (candidate) => {
  if (candidate.assignedManagerEmail) return candidate;

  const email = getStoredAssignments()[candidate.id];

  return email
    ? { ...candidate, assignedManagerEmail: email }
    : candidate;
};

const getApiCandidateData = (candidateData) => {
  const apiCandidateData = { ...candidateData };

  delete apiCandidateData.assignedManagerEmail;

  if (apiCandidateData.picklist && typeof apiCandidateData.picklist === "object") {
    apiCandidateData.picklist = apiCandidateData.picklist.key;
  }

  if (
    apiCandidateData.candidateStatus &&
    typeof apiCandidateData.candidateStatus === "object"
  ) {
    apiCandidateData.candidateStatus = apiCandidateData.candidateStatus.key;
  }

  return apiCandidateData;
};

export const getCandidates = async () => {
  const response = await liferayApi.get("/candidates/");

  return {
    ...response.data,
    items: (response.data.items || []).map(withStoredAssignment),
  };
};
export const getCandidateById = async (id) => {
  const response = await liferayApi.get(`/candidates/${id}`);

  return withStoredAssignment(response.data);
};
export const createCandidate = async (candidateData) => {
  console.log("CREATE REQUEST BODY:", candidateData);

  const response = await liferayApi({
    method: "POST",
    url: "/candidates/",
    data: getApiCandidateData(candidateData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth}`,
    },
  });

  storeAssignment(
    response.data.id,
    candidateData.assignedManagerEmail
  );

  return withStoredAssignment(response.data);
};
export const updateCandidate = async (id, candidateData) => {
  const response = await liferayApi({
    method: "PUT",
    url: `/candidates/${id}`,
    data: getApiCandidateData(candidateData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth}`,
    },
  });

  storeAssignment(
    response.data.id || id,
    candidateData.assignedManagerEmail
  );

  return withStoredAssignment(response.data);
};
export const deleteCandidate = async (id) => {
  const response = await liferayApi.delete(
    `/candidates/${id}`
  );

  return response.data;
};

export default liferayApi;