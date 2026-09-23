import { Navigate, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import CandidateDetails from "./pages/CandidateDetails";
import CandidateForm from "./pages/CandidateForm";
import Users from "./pages/Users";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidates/:id" element={<CandidateDetails />} />

        <Route path="/candidates/:id/edit" element={<CandidateForm />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["HR"]} />}>
        <Route path="/candidates/create" element={<CandidateForm />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;