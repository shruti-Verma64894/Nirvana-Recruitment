import { Navigate, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import CandidateDetails from "./pages/CandidateDetails";
import CandidateForm from "./pages/CandidateForm";
import Users from "./pages/Users";
import Login from "./pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
     
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />
     

      <Route path="/candidates" element={<Candidates />} />

      <Route
        path="/candidates/create"
        element={<CandidateForm />}
      />

      <Route
        path="/candidates/:id/edit"
        element={<CandidateForm />}
      />

      <Route
        path="/candidates/:id"
        element={<CandidateDetails />}
      />

      <Route path="/users" element={<Users />} />
    </Routes>
  );
};

export default AppRoutes;