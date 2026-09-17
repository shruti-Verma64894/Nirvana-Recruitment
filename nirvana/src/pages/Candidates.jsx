import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import CandidateFilters from "../components/CandidateFilters";
import CandidateTable from "../components/CandidateTable";
import { getCandidates } from "../services/liferayApi";

const Candidates = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [role, setRole] = useState("ALL");
  const [skill, setSkill] = useState("ALL");

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);

        const data = await getCandidates();

        console.log("Liferay Candidates:", data);

        setCandidates(data.items || []);
      } catch (error) {
        console.error("Liferay API Error:", error);
        setError("Failed to load candidates.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter((candidate) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (candidate.firstName || "").toLowerCase().includes(searchText) ||
      (candidate.lastName || "").toLowerCase().includes(searchText) ||
      (candidate.email || "").toLowerCase().includes(searchText) ||
      (candidate.phone || "").includes(searchText) ||
      (candidate.candidateId || "").toLowerCase().includes(searchText);

    const matchesStatus =
      status === "ALL" || candidate.status === status;

    const matchesRole =
      role === "ALL" || candidate.role === role;

    const candidateSkills =
      typeof candidate.skills === "string"
        ? candidate.skills.split(",").map((skill) => skill.trim())
        : candidate.skills || [];

    const matchesSkill =
      skill === "ALL" || candidateSkills.includes(skill);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesRole &&
      matchesSkill
    );
  });

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Candidate List</h1>
          <p>Search and manage recruitment candidates</p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/candidates/create")}
        >
          + Create Candidate
        </button>
      </div>

      <div className="candidate-controls">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <CandidateFilters
          status={status}
          setStatus={setStatus}
          role={role}
          setRole={setRole}
          skill={skill}
          setSkill={setSkill}
        />

      </div>

      {loading && (
        <p>Loading candidates...</p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && (
        <CandidateTable
          candidates={filteredCandidates}
        />
      )}

    </div>
  );
};

export default Candidates;