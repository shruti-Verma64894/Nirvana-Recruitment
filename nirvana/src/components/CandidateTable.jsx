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
            <th>Address</th>
            <th>Experience</th>
            <th>Current CTC</th>
            <th>Expected CTC</th>
            <th>Notice Period</th>
            <th>Skills</th>
            <th>Role</th>
            <th>Status</th>
            <th>Comments</th>
            <th>Assigned Manager</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {candidates.length === 0 ? (
            <tr>
              <td colSpan="17" className="empty-state">
                No candidates found
              </td>
            </tr>
          ) : (
            candidates.map((candidate) => (
              <tr key={candidate.id}>

                {/* Candidate ID */}
                <td>{candidate.candidateID || "-"}</td>

                {/* First Name */}
                <td>{candidate.firstName || "-"}</td>

                {/* Last Name */}
                <td>{candidate.lastName || "-"}</td>

                {/* Email */}
                <td>{candidate.email || "-"}</td>

                {/* Phone */}
                <td>{candidate.phone || "-"}</td>

                {/* Address */}
                <td>{candidate.address || "-"}</td>

                {/* Experience */}
                <td>
                  {candidate.experience !== undefined &&
                  candidate.experience !== null
                    ? `${candidate.experience} years`
                    : "-"}
                </td>

                {/* Current CTC */}
                <td>
                  {candidate.cTC !== undefined &&
                  candidate.cTC !== null
                    ? candidate.cTC
                    : "-"}
                </td>

                {/* Expected CTC */}
                <td>
                  {candidate.eCTC !== undefined &&
                  candidate.eCTC !== null
                    ? candidate.eCTC
                    : "-"}
                </td>

                {/* Notice Period */}
                <td>
                  {candidate.noticePeriod !== undefined &&
                  candidate.noticePeriod !== null
                    ? `${candidate.noticePeriod} days`
                    : "-"}
                </td>

                {/* Skills */}
                <td>
                  {typeof candidate.skills === "string"
                    ? candidate.skills
                    : Array.isArray(candidate.skills)
                    ? candidate.skills.join(", ")
                    : "-"}
                </td>

                {/* Role */}
                <td>{candidate.role || "-"}</td>

                {/* Status */}
                <td>
                  <StatusBadge
                    status={
                      candidate.nirvanaStatus?.name ||
                      candidate.nirvanaStatus?.key ||
                      ""
                    }
                  />
                </td>

                {/* Comments */}
                <td>{candidate.comments || "-"}</td>

                {/* Assigned Manager */}
                <td>{candidate.assignedManager || "-"}</td>

                {/* Created Date */}
                <td>
                  {candidate.dateCreated
                    ? new Date(
                        candidate.dateCreated
                      ).toLocaleDateString()
                    : "-"}
                </td>

                {/* Action */}
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