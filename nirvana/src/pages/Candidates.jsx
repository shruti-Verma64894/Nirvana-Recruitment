import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import CandidateFilters from "../components/CandidateFilters";
import CandidateTable from "../components/CandidateTable";
import { getCandidates } from "../services/liferayApi";
import { permissions } from "../services/permissions";

const Candidates = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [role, setRole] = useState("ALL");
  const [skill, setSkill] = useState("ALL");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "ALL",
    role: "ALL",
    skill: "ALL",
    startDate: "",
    endDate: "",
  });

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        setError("");

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

  const handleFilter = () => {
    setAppliedFilters({
      search,
      status,
      role,
      skill,
      startDate,
      endDate,
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("ALL");
    setRole("ALL");
    setSkill("ALL");
    setStartDate("");
    setEndDate("");

    setAppliedFilters({
      search: "",
      status: "ALL",
      role: "ALL",
      skill: "ALL",
      startDate: "",
      endDate: "",
    });
  };

  const filteredCandidates = candidates.filter((candidate) => {

    const searchText = appliedFilters.search.toLowerCase().trim();

    const matchesSearch =
      searchText === "" ||
      (candidate.firstName || "").toLowerCase().includes(searchText) ||
      (candidate.lastName || "").toLowerCase().includes(searchText) ||
      (candidate.emailAddress || "").toLowerCase().includes(searchText) ||
      String(candidate.phoneNumber || "").toLowerCase().includes(searchText) ||
      String(candidate.id || "").toLowerCase().includes(searchText);

    const candidateStatusKey = candidate.candidateStatus?.key || "";
    const candidateStatusName = candidate.candidateStatus?.name || "";
    const selectedStatus = appliedFilters.status;

    const matchesStatus =
      selectedStatus === "ALL" ||
      candidateStatusKey === selectedStatus ||
      candidateStatusName === selectedStatus;

    const candidateRoleKey = candidate.picklist?.key || "";
    const candidateRoleName = candidate.picklist?.name || "";
    const selectedRole = appliedFilters.role;

    const matchesRole =
      selectedRole === "ALL" ||
      candidateRoleKey === selectedRole ||
      candidateRoleName === selectedRole;

    const matchesSkill =
      appliedFilters.skill === "ALL" || !appliedFilters.skill;

    const candidateDate = candidate.dateCreated
      ? new Date(candidate.dateCreated)
      : null;

    const startDateValue = appliedFilters.startDate
      ? new Date(`${appliedFilters.startDate}T00:00:00`)
      : null;

    const endDateValue = appliedFilters.endDate
      ? new Date(`${appliedFilters.endDate}T23:59:59`)
      : null;

    const matchesStartDate =
      !startDateValue || (candidateDate && candidateDate >= startDateValue);

    const matchesEndDate =
      !endDateValue || (candidateDate && candidateDate <= endDateValue);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesRole &&
      matchesSkill &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Candidate List</h1>

          <p>Search and manage recruitment candidates</p>
        </div>

        {permissions.canCreateCandidate() && (
          <button
            className="primary-button"
            onClick={() => navigate("/candidates/create")}
          >
            + Create Candidate
          </button>
        )}
      </div>

      <div className="candidate-controls">
        <SearchBar search={search} setSearch={setSearch} />

        <CandidateFilters
          status={status}
          setStatus={setStatus}
          role={role}
          setRole={setRole}
          skill={skill}
          setSkill={setSkill}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        <button className="primary-button" onClick={handleFilter}>
          Filter
        </button>

        <button className="secondary-button" onClick={handleClearFilters}>
          Clear
        </button>
      </div>

      {loading && <p>Loading candidates...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <CandidateTable candidates={filteredCandidates} />
      )}
    </div>
  );
};

export default Candidates;