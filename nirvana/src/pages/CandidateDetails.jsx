import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import {
  getCandidateById,
  deleteCandidate,
} from "../services/liferayApi";

const CandidateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCandidateById(id);

        console.log("Liferay Candidate:", data);

        setCandidate(data);
      } catch (error) {
        console.error(
          "Candidate Details Error:",
          error
        );

        console.error(
          "Liferay Error Response:",
          error.response?.data
        );

        setError(
          error.response?.data?.title ||
            "Failed to load candidate."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (!confirmed) return;

    try {
      await deleteCandidate(id);

      alert("Candidate deleted successfully!");

      navigate("/candidates");
    } catch (error) {
      console.error(
        "Delete Candidate Error:",
        error
      );

      alert(
        error.response?.data?.title ||
          "Failed to delete candidate."
      );
    }
  };

  // View CV
  const handleViewCV = () => {
    const cvUrl = candidate?.cVResume?.fileURL;

    if (!cvUrl) {
      alert("CV is not available.");
      return;
    }

    window.open(cvUrl, "_blank");
  };

  // Download CV
  const handleDownloadCV = () => {
    const cvUrl = candidate?.cVResume?.fileURL;

    if (!cvUrl) {
      alert("CV is not available.");
      return;
    }

    const link = document.createElement("a");

    link.href = cvUrl;
    link.download =
      candidate?.cVResume?.name || "candidate-resume";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="page">
        <p>Loading candidate...</p>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="page">
        <h1>Candidate Not Found</h1>

        <p className="error-message">
          {error || "Candidate does not exist."}
        </p>

        <Link to="/candidates">
          ← Back to Candidates
        </Link>
      </div>
    );
  }

  const status =
    candidate.nirvanaStatus?.name ||
    candidate.nirvanaStatus?.key ||
    "";

  const skills =
    typeof candidate.skills === "string"
      ? candidate.skills
      : Array.isArray(candidate.skills)
      ? candidate.skills.join(", ")
      : "-";

  const createdDate = candidate.dateCreated
    ? new Date(
        candidate.dateCreated
      ).toLocaleDateString()
    : "-";

  return (
    <div className="page">

      {/* Page Header */}

      <div className="details-header">

        <div>

          <Link
            to="/candidates"
            className="back-link"
          >
            ← Back to Candidates
          </Link>

          <h1>
            {candidate.firstName}{" "}
            {candidate.lastName}
          </h1>

          <p>{candidate.candidateID}</p>

        </div>

        <div className="details-actions">

          <StatusBadge status={status} />

          <button
            className="primary-button"
            onClick={() => {
              console.log("Edit clicked");
              console.log(
                "Candidate ID:",
                candidate.id
              );

              navigate(
                `/candidates/${candidate.id}/edit`
              );
            }}
          >
            Edit Candidate
          </button>

          <button
            className="delete-button"
            onClick={handleDelete}
          >
            Delete Candidate
          </button>

        </div>

      </div>


      {/* Personal Information */}

      <section className="details-section">

        <h2>Personal Information</h2>

        <div className="details-grid">

          <div className="detail-item">
            <span>First Name</span>
            <strong>
              {candidate.firstName || "-"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Last Name</span>
            <strong>
              {candidate.lastName || "-"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Email</span>
            <strong>
              {candidate.email || "-"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Phone</span>
            <strong>
              {candidate.phone || "-"}
            </strong>
          </div>

          <div className="detail-item detail-full">
            <span>Address</span>
            <strong>
              {candidate.address || "-"}
            </strong>
          </div>

        </div>

      </section>


      {/* Professional Information */}

      <section className="details-section">

        <h2>Professional Information</h2>

        <div className="details-grid">

          <div className="detail-item">
            <span>Experience</span>
            <strong>
              {candidate.experience ?? "-"} Years
            </strong>
          </div>

          <div className="detail-item">
            <span>Current CTC</span>
            <strong>
              {candidate.cTC ?? "-"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Expected CTC</span>
            <strong>
              {candidate.eCTC ?? "-"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Notice Period</span>
            <strong>
              {candidate.noticePeriod ?? "-"} Days
            </strong>
          </div>

          <div className="detail-item">
            <span>Role</span>
            <strong>
              {candidate.role || "-"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Skills</span>
            <strong>
              {skills}
            </strong>
          </div>

        </div>

      </section>


      {/* Recruitment Information */}

      <section className="details-section">

        <h2>Recruitment Information</h2>

        <div className="details-grid">

          <div className="detail-item">
            <span>Candidate ID</span>
            <strong>
              {candidate.candidateID || "-"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Status</span>

            <StatusBadge status={status} />
          </div>

          <div className="detail-item">
            <span>Created Date</span>

            <strong>
              {createdDate}
            </strong>
          </div>

          <div className="detail-item">
            <span>Assigned Manager</span>

            <strong>
              {candidate.assignedManager || "-"}
            </strong>
          </div>

        </div>

      </section>


      {/* CV */}

      <section className="details-section">

        <h2>CV / Resume</h2>

        <div className="cv-box">

          <span>📄 Candidate Resume</span>

          <button
            className="secondary-button"
            onClick={handleViewCV}
          >
            View CV
          </button>

          <button
            className="secondary-button"
            onClick={handleDownloadCV}
          >
            Download CV
          </button>

        </div>

      </section>


      {/* Comments */}

      <section className="details-section">

        <h2>Comments</h2>

        <div className="comment-box">

          <p>
            {candidate.comments ||
              "No comments available."}
          </p>

        </div>

      </section>


      {/* Status History */}

      <section className="details-section">

        <h2>Status History</h2>

        <div className="status-history">

          <div className="history-item">

            <strong>
              {status || "ACTIVE"}
            </strong>

            <span>
              {createdDate}
            </span>

          </div>

        </div>

      </section>

    </div>
  );
};

export default CandidateDetails;