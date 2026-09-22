const CandidateFilters = ({
  status,
  setStatus,
  role,
  setRole,
  skill,
  setSkill,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div className="filters">

      {/* STATUS */}

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="ALL">
          All Status
        </option>

        <option value="Active">
          Active
        </option>

        <option value="Review">
          Review
        </option>

        <option value="Round1">
          Round 1
        </option>

        <option value="Round2">
          Round 2
        </option>

        <option value="Round3">
          Round 3
        </option>

        <option value="Round4">
          Round 4
        </option>

        <option value="Rejected">
          Rejected
        </option>

        <option value="Approved">
          Approved
        </option>

        <option value="OfferLetter">
          Offer Letter
        </option>
      </select>


      {/* POSITION APPLIED */}

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="ALL">
          All Positions
        </option>

        <option value="Liferay">
          Liferay
        </option>

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

        <option value="AI/ML Engineer">
          AI/ML Engineer
        </option>
      </select>


      {/* SKILLS */}

      <select
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      >
        <option value="ALL">
          All Skills
        </option>

        <option value="React">
          React
        </option>

        <option value="JavaScript">
          JavaScript
        </option>

        <option value="Node.js">
          Node.js
        </option>

        <option value="Java">
          Java
        </option>

        <option value="Python">
          Python
        </option>

        <option value="SQL">
          SQL
        </option>
      </select>


      {/* START DATE */}

      <input
        type="date"
        value={startDate}
        onChange={(e) =>
          setStartDate(e.target.value)
        }
      />


      {/* END DATE */}

      <input
        type="date"
        value={endDate}
        onChange={(e) =>
          setEndDate(e.target.value)
        }
      />

    </div>
  );
};

export default CandidateFilters;