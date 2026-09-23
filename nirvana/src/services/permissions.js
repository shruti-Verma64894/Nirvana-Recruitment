import { getCurrentUser } from "./authService";
const MANAGER_CAN_CREATE_CANDIDATE = false;
const MANAGER_CAN_UPLOAD_CV = true;
const isMyAssignedCandidate = (candidate) => {
  const { email } = getCurrentUser();

  const assignedEmail =
    candidate?.assignedManagerEmail ||
    candidate?.assignedManager?.emailAddress ||
    "";

  return (
    assignedEmail &&
    email &&
    assignedEmail.toLowerCase() === email.toLowerCase()
  );
};

export const permissions = {
  canCreateCandidate: () => {
    const { role } = getCurrentUser();
    if (role === "HR") return true;
    if (role === "Manager") return MANAGER_CAN_CREATE_CANDIDATE;
    return false;
  },
  canEditCandidate: (candidate) => {
    const { role } = getCurrentUser();
    if (role === "HR") return true;
    if (role === "Manager") return isMyAssignedCandidate(candidate);
    return false;
  },
  canEditRestrictedFields: () => {
    const { role } = getCurrentUser();
    return role === "HR";
  },

  canDeleteCandidate: () => {
    const { role } = getCurrentUser();
    return role === "HR";
  },
  canUploadCV: (candidate) => {
    const { role } = getCurrentUser();
    if (role === "HR") return true;
    if (role === "Manager")
      return MANAGER_CAN_UPLOAD_CV && isMyAssignedCandidate(candidate);
    return false;
  },

  canViewCV: () => {
    const { role } = getCurrentUser();
    return role === "HR" || role === "Manager";
  },
  canChangeStatus: (candidate) => {
    const { role } = getCurrentUser();
    if (role === "HR") return true;
    if (role === "Manager") return isMyAssignedCandidate(candidate);
    return false;
  },
  canSetOfferLetter: () => {
    const { role } = getCurrentUser();
    return role === "HR";
  },
  canAddComments: () => {
    const { role } = getCurrentUser();
    return role === "HR" || role === "Manager";
  },
  canManageUsers: () => {
    const { role } = getCurrentUser();
    return role === "HR";
  },

  canAssignManager: () => {
    const { role } = getCurrentUser();
    return role === "HR";
  },

  isMyAssignedCandidate,
};