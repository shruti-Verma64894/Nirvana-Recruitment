import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const CandidateTable = ({ candidates }) => {
  return (
    <div className="table-container">

      <table>

        <thead>
          <tr>
            <th>Candidate ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Experience</th>
            <th>Skills</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {candidates.length === 0 ? (
    <tr>
      <td colSpan="11" className="empty-state">
        No candidates found
      </td>
    </tr>
  ) : (
    candidates.map((candidate) => (
      <tr key={candidate.id}>

        <td>{candidate.candidateId}</td>

        <td>{candidate.firstName}</td>

        <td>{candidate.lastName}</td>

        <td>{candidate.email}</td>

        <td>{candidate.phone}</td>

        <td>{candidate.experience} years</td>

        <td>{candidate.skills.join(", ")}</td>

        <td>{candidate.role}</td>

        <td>
          <StatusBadge status={candidate.status} />
        </td>

        <td>{candidate.createdDate}</td>

        <td>
          <Link to={`/candidates/${candidate.id}`}>
            View Profile
          </Link>
        </td>

      </tr>
    ))
  )}
</tbody>
      </table>

    </div>
  );
};

export default CandidateTable;