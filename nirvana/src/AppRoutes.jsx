import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import CandidateDetails from "./pages/CandidateDetails";
import CandidateForm from "./pages/CandidateForm";
import Reports from "./pages/Reports";
import Users from "./pages/Users";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/candidates" element={<Candidates />} />

      <Route
        path="/candidates/create"
        element={<CandidateForm />}
      />

      <Route
        path="/candidates/:id"
        element={<CandidateDetails />}
      />

      <Route path="/reports" element={<Reports />} />

      <Route path="/users" element={<Users />} />
    </Routes>
  );
};

export default AppRoutes;