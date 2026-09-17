import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CandidateForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    skills: "",
    role: "",
    status: "ACTIVE",
    comments: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Candidate Data:", formData);

    // Liferay POST API will be added later.

    alert("Candidate form submitted!");

    navigate("/candidates");
  };

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Create Candidate</h1>
          <p>Add a new candidate to the recruitment system</p>
        </div>
      </div>

      <form
        className="candidate-form"
        onSubmit={handleSubmit}
      >

        {/* Personal Information */}

        <section className="form-section">

          <h2>Personal Information</h2>

          <div className="form-grid">

            <div className="form-group">
              <label>First Name *</label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name *</label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-group form-full">
              <label>Address</label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows="3"
              />
            </div>

          </div>

        </section>


        {/* Professional Information */}

        <section className="form-section">

          <h2>Professional Information</h2>

          <div className="form-grid">

            <div className="form-group">
              <label>Experience (Years) *</label>

              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 2"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Current CTC</label>

              <input
                type="number"
                name="currentCTC"
                value={formData.currentCTC}
                onChange={handleChange}
                placeholder="e.g. 500000"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Expected CTC *</label>

              <input
                type="number"
                name="expectedCTC"
                value={formData.expectedCTC}
                onChange={handleChange}
                placeholder="e.g. 700000"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Notice Period (Days) *</label>

              <input
                type="number"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                placeholder="e.g. 30"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Skills *</label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, JavaScript, Node.js"
                required
              />
            </div>

            <div className="form-group">
              <label>Role Applied For *</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Role
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
            </div>

          </div>

        </section>


        {/* Recruitment Information */}

        <section className="form-section">

          <h2>Recruitment Information</h2>

          <div className="form-grid">

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">Active</option>
                <option value="REVIEW">Review</option>
                <option value="ROUND1">Round 1</option>
                <option value="ROUND2">Round 2</option>
                <option value="ROUND3">Round 3</option>
                <option value="ROUND4">Round 4</option>
                <option value="REJECTED">Rejected</option>
                <option value="APPROVED">Approved</option>
                <option value="OFFER_LETTER">
                  Offer Letter
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Upload CV</label>

              <input
                type="file"
                name="cv"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
              />
            </div>

            <div className="form-group form-full">
              <label>Comments</label>

              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Add comments..."
                rows="4"
              />
            </div>

          </div>

        </section>


        {/* Buttons */}

        <div className="form-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/candidates")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            Create Candidate
          </button>

        </div>

      </form>

    </div>
  );
};

export default CandidateForm;