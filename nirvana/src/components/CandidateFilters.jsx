const CandidateFilters = ({
  status,
  setStatus,
  role,
  setRole,
  skill,
  setSkill,
}) => {
  return (
    <div className="filters">

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="ALL">All Status</option>
        <option value="ACTIVE">Active</option>
        <option value="REVIEW">Review</option>
        <option value="ROUND1">Round 1</option>
        <option value="ROUND2">Round 2</option>
        <option value="ROUND3">Round 3</option>
        <option value="ROUND4">Round 4</option>
        <option value="REJECTED">Rejected</option>
        <option value="APPROVED">Approved</option>
        <option value="OFFER_LETTER">Offer Letter</option>
      </select>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="ALL">All Roles</option>
        <option value="Frontend Developer">
          Frontend Developer
        </option>
        <option value="Backend Developer">
          Backend Developer
        </option>
        <option value="Full Stack Developer">
          Full Stack Developer
        </option>
        <option value="Java Developer">
          Java Developer
        </option>
        <option value="Python Developer">
          Python Developer
        </option>
      </select>

      <select
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      >
        <option value="ALL">All Skills</option>
        <option value="React">React</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Node.js">Node.js</option>
        <option value="Java">Java</option>
        <option value="Python">Python</option>
        <option value="SQL">SQL</option>
      </select>

      <input type="date" />

      <input type="date" />

    </div>
  );
};

export default CandidateFilters;