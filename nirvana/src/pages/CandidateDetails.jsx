import { Link, useParams } from "react-router-dom";

import StatusBadge from "../components/StatusBadge";

const CandidateDetails = () => {
  const { id } = useParams();

  // Temporary data
  // Later this will come from Liferay API.
  const candidates = [
    {
      id: 1,
      candidateId: "CAN001",
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      address: "Lucknow, Uttar Pradesh",
      experience: 2,
      currentCTC: "5 LPA",
      expectedCTC: "7 LPA",
      noticePeriod: "30 Days",
      skills: ["React", "JavaScript"],
      role: "Frontend Developer",
      status: "ROUND2",
      createdDate: "17 Sep 2026",
      comments: "Good technical performance.",
      assignedManager: "Amit Sharma",
    },

    {
      id: 2,
      candidateId: "CAN002",
      firstName: "Priya",
      lastName: "Verma",
      email: "priya@gmail.com",
      phone: "9876543211",
      address: "Lucknow, Uttar Pradesh",
      experience: 1,
      currentCTC: "4 LPA",
      expectedCTC: "6 LPA",
      noticePeriod: "15 Days",
      skills: ["Java", "SQL"],
      role: "Java Developer",
      status: "REVIEW",
      createdDate: "16 Sep 2026",
      comments: "Candidate under technical review.",
      assignedManager: "Neha Singh",
    },

    {
      id: 3,
      candidateId: "CAN003",
      firstName: "Aman",
      lastName: "Singh",
      email: "aman@gmail.com",
      phone: "9876543212",
      address: "Kanpur, Uttar Pradesh",
      experience: 3,
      currentCTC: "6 LPA",
      expectedCTC: "9 LPA",
      noticePeriod: "30 Days",
      skills: ["Node.js", "JavaScript"],
      role: "Backend Developer",
      status: "ROUND1",
      createdDate: "15 Sep 2026",
      comments: "Passed initial screening.",
      assignedManager: "Amit Sharma",
    },

    {
      id: 4,
      candidateId: "CAN004",
      firstName: "Neha",
      lastName: "Gupta",
      email: "neha@gmail.com",
      phone: "9876543213",
      address: "Delhi",
      experience: 4,
      currentCTC: "8 LPA",
      expectedCTC: "11 LPA",
      noticePeriod: "60 Days",
      skills: ["React", "Node.js"],
      role: "Full Stack Developer",
      status: "APPROVED",
      createdDate: "14 Sep 2026",
      comments: "Candidate approved.",
      assignedManager: "Neha Singh",
    },
  ];

  const candidate = candidates.find(
    (candidate) => candidate.id === Number(id)
  );

  if (!candidate) {
    return (
      <div className="page">
        <h1>Candidate Not Found</h1>

        <Link to="/candidates">
          ← Back to Candidates
        </Link>
      </div>
    );
  }

  return (
    <div className="page">

      {/* Page Header */}

      <div className="details-header">

        <div>
          <Link to="/candidates" className="back-link">
            ← Back to Candidates
          </Link>

          <h1>
            {candidate.firstName} {candidate.lastName}
          </h1>

          <p>{candidate.candidateId}</p>
        </div>

        <div className="details-actions">

          <StatusBadge status={candidate.status} />

          <button className="primary-button">
            Edit Candidate
          </button>

        </div>

      </div>


      {/* Personal Information */}

      <section className="details-section">

        <h2>Personal Information</h2>

        <div className="details-grid">

          <div className="detail-item">
            <span>First Name</span>
            <strong>{candidate.firstName}</strong>
          </div>

          <div className="detail-item">
            <span>Last Name</span>
            <strong>{candidate.lastName}</strong>
          </div>

          <div className="detail-item">
            <span>Email</span>
            <strong>{candidate.email}</strong>
          </div>

          <div className="detail-item">
            <span>Phone</span>
            <strong>{candidate.phone}</strong>
          </div>

          <div className="detail-item detail-full">
            <span>Address</span>
            <strong>{candidate.address}</strong>
          </div>

        </div>

      </section>


      {/* Professional Information */}

      <section className="details-section">

        <h2>Professional Information</h2>

        <div className="details-grid">

          <div className="detail-item">
            <span>Experience</span>
            <strong>{candidate.experience} Years</strong>
          </div>

          <div className="detail-item">
            <span>Current CTC</span>
            <strong>{candidate.currentCTC}</strong>
          </div>

          <div className="detail-item">
            <span>Expected CTC</span>
            <strong>{candidate.expectedCTC}</strong>
          </div>

          <div className="detail-item">
            <span>Notice Period</span>
            <strong>{candidate.noticePeriod}</strong>
          </div>

          <div className="detail-item">
            <span>Role</span>
            <strong>{candidate.role}</strong>
          </div>

          <div className="detail-item">
            <span>Skills</span>
            <strong>{candidate.skills.join(", ")}</strong>
          </div>

        </div>

      </section>


      {/* Recruitment Information */}

      <section className="details-section">

        <h2>Recruitment Information</h2>

        <div className="details-grid">

          <div className="detail-item">
            <span>Candidate ID</span>
            <strong>{candidate.candidateId}</strong>
          </div>

          <div className="detail-item">
            <span>Status</span>
            <StatusBadge status={candidate.status} />
          </div>

          <div className="detail-item">
            <span>Created Date</span>
            <strong>{candidate.createdDate}</strong>
          </div>

          <div className="detail-item">
            <span>Assigned Manager</span>
            <strong>{candidate.assignedManager}</strong>
          </div>

        </div>

      </section>


      {/* CV */}

      <section className="details-section">

        <h2>CV / Resume</h2>

        <div className="cv-box">
          <span>📄 Candidate Resume</span>

          <button className="secondary-button">
            View CV
          </button>

          <button className="secondary-button">
            Download CV
          </button>
        </div>

      </section>


      {/* Comments */}

      <section className="details-section">

        <h2>Comments</h2>

        <div className="comment-box">
          <p>{candidate.comments}</p>
        </div>

      </section>


      {/* Status History */}

      <section className="details-section">

        <h2>Status History</h2>

        <div className="status-history">

          <div className="history-item">
            <strong>ACTIVE</strong>
            <span>17 Sep 2026</span>
          </div>

          <div className="history-item">
            <strong>REVIEW</strong>
            <span>17 Sep 2026</span>
          </div>

          <div className="history-item">
            <strong>ROUND1</strong>
            <span>18 Sep 2026</span>
          </div>

          <div className="history-item">
            <strong>ROUND2</strong>
            <span>19 Sep 2026</span>
          </div>

        </div>

      </section>

    </div>
  );
};

export default CandidateDetails;