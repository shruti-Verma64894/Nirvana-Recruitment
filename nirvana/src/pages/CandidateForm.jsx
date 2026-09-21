import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createCandidate,
  getCandidateById,
  updateCandidate,
} from "../services/liferayApi";

// ADDED: Convert file to Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const CandidateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    candidateID: "",
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

  const [loading, setLoading] = useState(false);
  const [loadingCandidate, setLoadingCandidate] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const fetchCandidate = async () => {
      try {
        setLoadingCandidate(true);
        setError("");

        const candidate = await getCandidateById(id);

        console.log("Candidate for Edit:", candidate);

        setFormData({
          candidateID: candidate.candidateID || "",
          firstName: candidate.firstName || "",
          lastName: candidate.lastName || "",
          email: candidate.email || "",

          phone:
            candidate.phone !== undefined &&
            candidate.phone !== null
              ? String(candidate.phone)
              : "",

          address: candidate.address || "",

          experience:
            candidate.experience !== undefined &&
            candidate.experience !== null
              ? String(candidate.experience)
              : "",

          currentCTC:
            candidate.cTC !== undefined &&
            candidate.cTC !== null
              ? String(candidate.cTC)
              : "",

          expectedCTC:
            candidate.eCTC !== undefined &&
            candidate.eCTC !== null
              ? String(candidate.eCTC)
              : "",

          noticePeriod:
            candidate.noticePeriod !== undefined &&
            candidate.noticePeriod !== null
              ? String(candidate.noticePeriod)
              : "",

          skills:
            typeof candidate.skills === "string"
              ? candidate.skills
              : Array.isArray(candidate.skills)
              ? candidate.skills.join(", ")
              : "",

          role: candidate.role || "",

          status:
            candidate.nirvanaStatus?.key ||
            candidate.nirvanaStatus?.name ||
            "ACTIVE",

          comments: candidate.comments || "",

          cv: null,
        });
      } catch (error) {
        console.error(
          "Load Candidate Error:",
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
        setLoadingCandidate(false);
      }
    };

    fetchCandidate();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const candidateData = {
        candidateID: formData.candidateID.trim(),

        firstName: formData.firstName.trim(),

        lastName: formData.lastName.trim(),

        email: formData.email.trim(),

        phone: Number(formData.phone),

        address: formData.address.trim(),

        experience: Number(formData.experience),

        cTC: formData.currentCTC
          ? Number(formData.currentCTC)
          : 0,

        eCTC: Number(formData.expectedCTC),

        noticePeriod: Number(formData.noticePeriod),

        skills: formData.skills.trim(),

        role: formData.role,

        nirvanaStatus: {
          key: formData.status,
          name: formData.status,
        },

        comments: formData.comments.trim(),
      };

      // ADDED: Send CV as Base64 to Liferay
      if (formData.cv) {
        const base64 = await fileToBase64(formData.cv);

        candidateData.cVResume = {
          name: formData.cv.name,
          fileBase64: base64,
        };
      }

      console.log(
        "Sending Candidate Data:",
        candidateData
      );

      if (isEditMode) {
        const response = await updateCandidate(
          id,
          candidateData
        );

        console.log(
          "Candidate Updated:",
          response
        );

        alert("Candidate updated successfully!");
      } else {
        const response = await createCandidate(
          candidateData
        );

        console.log(
          "Candidate Created:",
          response
        );

        alert("Candidate created successfully!");
      }

      navigate("/candidates");
    } catch (error) {
      console.error(
        isEditMode
          ? "Update Candidate Error:"
          : "Create Candidate Error:",
        error
      );

      console.error(
        "Liferay Error Response:",
        error.response?.data
      );

      setError(
        error.response?.data?.title ||
          `Failed to ${
            isEditMode ? "update" : "create"
          } candidate.`
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingCandidate) {
    return (
      <div className="page">
        <p>Loading candidate...</p>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="page-header">

        <div>

          <h1>
            {isEditMode
              ? "Edit Candidate"
              : "Create Candidate"}
          </h1>

          <p>
            {isEditMode
              ? "Update candidate information"
              : "Add a new candidate to the recruitment system"}
          </p>

        </div>

      </div>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <form
        className="candidate-form"
        onSubmit={handleSubmit}
      >

        {/* Personal Information */}

        <section className="form-section">

          <h2>Personal Information</h2>

          <div className="form-grid">

            <div className="form-group">

              <label>Candidate ID *</label>

              <input
                type="text"
                name="candidateID"
                value={formData.candidateID}
                onChange={handleChange}
                placeholder="e.g. CAN004"
                required
                disabled={isEditMode}
              />

            </div>

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

                <option value="ACTIVE">
                  Active
                </option>

                <option value="REVIEW">
                  Review
                </option>

                <option value="ROUND1">
                  Round 1
                </option>

                <option value="ROUND2">
                  Round 2
                </option>

                <option value="ROUND3">
                  Round 3
                </option>

                <option value="ROUND4">
                  Round 4
                </option>

                <option value="REJECTED">
                  Rejected
                </option>

                <option value="APPROVED">
                  Approved
                </option>

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
            onClick={() =>
              navigate("/candidates")
            }
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Candidate"
              : "Create Candidate"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default CandidateForm;