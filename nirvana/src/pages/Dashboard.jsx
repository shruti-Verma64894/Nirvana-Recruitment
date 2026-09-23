import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import { getCandidates } from "../services/liferayApi";

const Dashboard = () => {
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

  const getStatus = (candidate) => {
    const status = candidate.candidateStatus;
    const value = typeof status === "string" ? status : status?.key || status?.name;

    return String(value || "")
      .trim()
      .toUpperCase()
      .replace(/[\s_-]+/g, "");
  };

  const stats = [
    {
      title: "Total Candidates",
      value: candidates.length,
    },
    {
      title: "Active",
      value: candidates.filter(
        (candidate) => getStatus(candidate) === "ACTIVE"
      ).length,
    },
    {
      title: "Under Review",
      value: candidates.filter(
        (candidate) => ["REVIEW", "UNDERREVIEW"].includes(getStatus(candidate))
      ).length,
    },
    {
      title: "Selected",
      value: candidates.filter(
        (candidate) => getStatus(candidate) === "SELECTED"
      ).length,
    },
    {
      title: "On Hold",
      value: candidates.filter(
        (candidate) => getStatus(candidate) === "ONHOLD"
      ).length,
    },
    {
      title: "Round 1",
      value: candidates.filter(
        (candidate) => getStatus(candidate) === "ROUND1"
      ).length,
    },
    {
      title: "Round 2",
      value: candidates.filter(
        (candidate) => getStatus(candidate) === "ROUND2"
      ).length,
    },
    {
      title: "Round 3",
      value: candidates.filter(
        (candidate) => getStatus(candidate) === "ROUND3"
      ).length,
    },
    {
      title: "Round 4",
      value: candidates.filter(
        (candidate) => getStatus(candidate) === "ROUND4"
      ).length,
    },
    {
      title: "Rejected",
      value: candidates.filter(
        (candidate) => getStatus(candidate) === "REJECTED"
      ).length,
    },
    {
      title: "Approved",
      value: candidates.filter(
        (candidate) => getStatus(candidate) === "APPROVED"
      ).length,
    },
    {
      title: "Offer Letter",
      value: candidates.filter(
        (candidate) => getStatus(candidate) === "OFFERLETTER"
      ).length,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Recruitment overview</p>
        </div>
      </div>

      {loading && <p>Loading candidates...</p>}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;