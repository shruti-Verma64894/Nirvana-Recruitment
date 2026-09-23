import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const getAssignedManager = (candidate) => {
  const value =
    candidate.assignedManagerEmail ||
    candidate.assignedManager?.emailAddress ||
    candidate.assignedManager?.email ||
    candidate.assignedManager?.name;

  return value && value !== "null" && value !== "undefined"
    ? value
    : "Unassigned";
};

const CandidateTable = ({ candidates }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Experience</th>
            <th>Current CTC</th>
            <th>Expected CTC</th>
            <th>Notice Period</th>
            <th>Position Applied</th>
            <th>Candidate Status</th>
            <th>Comments</th>
            <th>Assigned Manager</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {candidates.length === 0 ? (
            <tr>
              <td colSpan="15" className="empty-state">
                No candidates found
              </td>
            </tr>
          ) : (
            candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.id || "-"}</td>

                <td>{candidate.firstName || "-"}</td>

                <td>{candidate.lastName || "-"}</td>

                <td>{candidate.emailAddress || "-"}</td>

                <td>{candidate.phoneNumber || "-"}</td>

                <td>
                  {candidate.experience !== undefined &&
                  candidate.experience !== null
                    ? `${candidate.experience} years`
                    : "-"}
                </td>

                <td>
                  {candidate.currentCTC !== undefined &&
                  candidate.currentCTC !== null
                    ? candidate.currentCTC
                    : "-"}
                </td>

                <td>
                  {candidate.expectedCTC !== undefined &&
                  candidate.expectedCTC !== null
                    ? candidate.expectedCTC
                    : "-"}
                </td>

                <td>
                  {candidate.noticePeriod !== undefined &&
                  candidate.noticePeriod !== null
                    ? `${candidate.noticePeriod} days`
                    : "-"}
                </td>

                <td>{candidate.picklist?.name || "-"}</td>

                <td>
                  <StatusBadge
                    status={
                      candidate.candidateStatus?.name ||
                      candidate.candidateStatus?.key ||
                      ""
                    }
                  />
                </td>

                <td>
                  {candidate.commentsRawText ||
                    candidate.comments ||
                    "-"}
                </td>
                <td>{getAssignedManager(candidate)}</td>

                <td>
                  {candidate.dateCreated
                    ? new Date(candidate.dateCreated).toLocaleDateString()
                    : "-"}
                </td>

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