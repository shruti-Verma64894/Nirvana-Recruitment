import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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

  // -------------------------
  // GET CANDIDATE BY ID
  // -------------------------

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

  // -------------------------
  // DELETE CANDIDATE
  // -------------------------

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

  // -------------------------
  // VIEW CV
  // -------------------------

  const handleViewCV = () => {
    const cvUrl = candidate?.cV?.link?.href;

    if (!cvUrl) {
      alert("CV is not available.");
      return;
    }

    const fullUrl = cvUrl.startsWith("http")
      ? cvUrl
      : `${import.meta.env.VITE_LIFERAY_BASE_URL}${cvUrl}`;

    window.open(fullUrl, "_blank");
  };

  // -------------------------
  // DOWNLOAD CV
  // -------------------------

  const handleDownloadCV = () => {
    const cvUrl = candidate?.cV?.link?.href;

    if (!cvUrl) {
      alert("CV is not available.");
      return;
    }

    const fullUrl = cvUrl.startsWith("http")
      ? cvUrl
      : `${import.meta.env.VITE_LIFERAY_BASE_URL}${cvUrl}`;

    const link = document.createElement("a");

    link.href = fullUrl;
    link.download =
      candidate?.cV?.name ||
      "candidate-resume";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // -------------------------
  // LOADING
  // -------------------------

  if (loading) {
    return (
      <div className="page">
        <p>Loading candidate...</p>
      </div>
    );
  }

  // -------------------------
  // ERROR
  // -------------------------

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

  // -------------------------
  // ACTUAL API VALUES
  // -------------------------

  const status =
    candidate.candidateStatus?.name ||
    candidate.candidateStatus?.key ||
    "";

  const role =
    candidate.picklist?.name ||
    candidate.picklist?.key ||
    "-";

  const createdDate = candidate.dateCreated
    ? new Date(
        candidate.dateCreated
      ).toLocaleDateString()
    : "-";

  const cvName =
    candidate.cV?.name ||
    "Candidate Resume";

  return (
    <div className="page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="details-header">

        <div>

          <Link
            to="/candidates"
            className="back-link"
          >
            ← Back to Candidates
          </Link>

          <h1>
            {candidate.firstName || "-"}{" "}
            {candidate.lastName || ""}
          </h1>

          <p>
            Candidate ID: {candidate.id}
          </p>

        </div>

        <div className="details-actions">

          <StatusBadge status={status} />

          <button
            className="primary-button"
            onClick={() => {
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


      {/* =========================
          PERSONAL INFORMATION
      ========================= */}

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
              {candidate.emailAddress || "-"}
            </strong>
          </div>


          <div className="detail-item">
            <span>Phone</span>

            <strong>
              {candidate.phoneNumber || "-"}
            </strong>
          </div>

        </div>

      </section>


      {/* =========================
          PROFESSIONAL INFORMATION
      ========================= */}

      <section className="details-section">

        <h2>Professional Information</h2>

        <div className="details-grid">

          <div className="detail-item">
            <span>Experience</span>

            <strong>
              {candidate.experience || "-"}
            </strong>
          </div>


          <div className="detail-item">
            <span>Current CTC</span>

            <strong>
              {candidate.currentCTC ?? "-"}
            </strong>
          </div>


          <div className="detail-item">
            <span>Expected CTC</span>

            <strong>
              {candidate.expectedCTC ?? "-"}
            </strong>
          </div>


          <div className="detail-item">
            <span>Notice Period</span>

            <strong>
              {candidate.noticePeriod || "-"}
            </strong>
          </div>


          <div className="detail-item">
            <span>Position Applied</span>

            <strong>
              {role}
            </strong>
          </div>

        </div>

      </section>


      {/* =========================
          RECRUITMENT INFORMATION
      ========================= */}

      <section className="details-section">

        <h2>Recruitment Information</h2>

        <div className="details-grid">

          <div className="detail-item">
            <span>Candidate ID</span>

            <strong>
              {candidate.id || "-"}
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

        </div>

      </section>


      {/* =========================
          CV / RESUME
      ========================= */}

      <section className="details-section">

        <h2>CV / Resume</h2>

        <div className="cv-box">

          <span>
            📄 {cvName}
          </span>


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


      {/* =========================
          COMMENTS
      ========================= */}

      <section className="details-section">

        <h2>Comments</h2>

        <div className="comment-box">

          <p>
            {candidate.commentsRawText ||
              candidate.comments ||
              "No comments available."}
          </p>

        </div>

      </section>


      {/* =========================
          STATUS HISTORY
      ========================= */}

      <section className="details-section">

        <h2>Status History</h2>

        <div className="status-history">

          <div className="history-item">

            <strong>
              {status || "-"}
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