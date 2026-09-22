import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createCandidate,
  getCandidateById,
  updateCandidate,
} from "../services/liferayApi";

const CandidateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    experience: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    positionApplied: "",
    candidateStatus: "Active",
    comments: "",
    cv: null,

    // Existing CV ID from Liferay
    existingCVId: null,
  });

  const [loading, setLoading] = useState(false);
  const [loadingCandidate, setLoadingCandidate] =
    useState(false);

  const [error, setError] = useState("");

  // =========================
  // LOAD CANDIDATE FOR EDIT
  // =========================

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const fetchCandidate = async () => {
      try {
        setLoadingCandidate(true);
        setError("");

        const candidate = await getCandidateById(id);

        console.log(
          "Candidate for Edit:",
          candidate
        );

        setFormData({
          firstName:
            candidate.firstName || "",

          lastName:
            candidate.lastName || "",

          emailAddress:
            candidate.emailAddress || "",

          phoneNumber:
            candidate.phoneNumber || "",

          experience:
            candidate.experience !== undefined &&
            candidate.experience !== null
              ? String(candidate.experience)
              : "",

          currentCTC:
            candidate.currentCTC !== undefined &&
            candidate.currentCTC !== null
              ? String(candidate.currentCTC)
              : "",

          expectedCTC:
            candidate.expectedCTC !== undefined &&
            candidate.expectedCTC !== null
              ? String(candidate.expectedCTC)
              : "",

          noticePeriod:
            candidate.noticePeriod !== undefined &&
            candidate.noticePeriod !== null
              ? String(candidate.noticePeriod)
              : "",

          positionApplied:
            candidate.picklist?.key ||
            candidate.picklist?.name ||
            "",

          candidateStatus:
            candidate.candidateStatus?.key ||
            candidate.candidateStatus?.name ||
            "Active",

          comments:
            candidate.commentsRawText ||
            candidate.comments ||
            "",

          cv: null,

          // IMPORTANT
          existingCVId:
            candidate.cV?.id || null,
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

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));
  };

  // =========================
  // FILE TO BASE64
  // =========================

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64 =
          reader.result.split(",")[1];

        resolve(base64);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // =========================
  // STATUS NAME
  // =========================

  const getStatusName = (key) => {
    const statusMap = {
      Active: "Active",
      Review: "Review",
      Round1: "Round 1",
      Round2: "Round 2",
      Round3: "Round 3",
      Round4: "Round 4",
      Rejected: "Rejected",
      Approved: "Approved",
      OfferLetter: "Offer Letter",
    };

    return statusMap[key] || key;
  };

  // =========================
  // SUBMIT
  // =========================

 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    // =========================
    // CREATE BASIC CANDIDATE DATA
    // =========================

    const candidateData = {
      firstName: formData.firstName.trim(),

      lastName: formData.lastName.trim(),

      emailAddress: formData.emailAddress.trim(),

      phoneNumber: formData.phoneNumber.trim(),

      experience: formData.experience.trim(),

      currentCTC: formData.currentCTC
        ? Number(formData.currentCTC)
        : 0,

      expectedCTC: formData.expectedCTC
        ? Number(formData.expectedCTC)
        : 0,

      noticePeriod: formData.noticePeriod.trim(),

      // Liferay Picklist
      picklist: {
        key: formData.positionApplied,
        name: formData.positionApplied,
      },

      // Liferay Candidate Status Picklist
      candidateStatus: {
        key: formData.candidateStatus,
        name: getStatusName(formData.candidateStatus),
      },

      comments: formData.comments.trim(),
    };

    // =========================
    // CV
    // =========================

    if (formData.cv) {
      const base64 = await fileToBase64(formData.cv);

      candidateData.cV = {
        name: formData.cv.name,
        fileBase64: base64,
      };
    } else if (formData.existingCVId) {
      // Required for Edit Candidate
      candidateData.cV = formData.existingCVId;
    } else {
      throw new Error(
        "CV is required. Please upload a CV."
      );
    }

    // =========================
    // DEBUG
    // =========================

    console.log(
      "========== LIFERAY REQUEST =========="
    );

    console.log(
      "Mode:",
      isEditMode ? "UPDATE" : "CREATE"
    );

    console.log(
      "Candidate Data:",
      JSON.stringify(candidateData, null, 2)
    );

    // =========================
    // UPDATE
    // =========================

    if (isEditMode) {
      const response = await updateCandidate(
        id,
        candidateData
      );

      console.log(
        "Candidate Updated:",
        response
      );

      alert(
        "Candidate updated successfully!"
      );
    }

    // =========================
    // CREATE
    // =========================

    else {
      const response = await createCandidate(
        candidateData
      );

      console.log(
        "Candidate Created:",
        response
      );

      alert(
        "Candidate created successfully!"
      );
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

    console.error(
      "Liferay Status:",
      error.response?.status
    );

    console.error(
      "Liferay Request:",
      error.config
    );

    setError(
      error.response?.data?.title ||
      error.response?.data?.message ||
      error.message ||
      `Failed to ${
        isEditMode
          ? "update"
          : "create"
      } candidate.`
    );

  } finally {
    setLoading(false);
  }
};
  // =========================
  // LOADING
  // =========================

  if (loadingCandidate) {
    return (
      <div className="page">
        <p>Loading candidate...</p>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="page">

      {/* HEADER */}

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


      {/* ERROR */}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}


      <form
        className="candidate-form"
        onSubmit={handleSubmit}
      >

        {/* =========================
            PERSONAL INFORMATION
        ========================= */}

        <section className="form-section">

          <h2>
            Personal Information
          </h2>

          <div className="form-grid">

            <div className="form-group">

              <label>
                First Name *
              </label>

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

              <label>
                Last Name *
              </label>

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

              <label>
                Email Address *
              </label>

              <input
                type="email"
                name="emailAddress"
                value={
                  formData.emailAddress
                }
                onChange={handleChange}
                placeholder="Enter email"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Phone Number *
              </label>

              <input
                type="tel"
                name="phoneNumber"
                value={
                  formData.phoneNumber
                }
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />

            </div>

          </div>

        </section>


        {/* =========================
            PROFESSIONAL INFORMATION
        ========================= */}

        <section className="form-section">

          <h2>
            Professional Information
          </h2>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Experience *
              </label>

              <input
                type="text"
                name="experience"
                value={
                  formData.experience
                }
                onChange={handleChange}
                placeholder="e.g. 2 years"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Current CTC
              </label>

              <input
                type="number"
                name="currentCTC"
                value={
                  formData.currentCTC
                }
                onChange={handleChange}
                placeholder="e.g. 500000"
                min="0"
              />

            </div>


            <div className="form-group">

              <label>
                Expected CTC *
              </label>

              <input
                type="number"
                name="expectedCTC"
                value={
                  formData.expectedCTC
                }
                onChange={handleChange}
                placeholder="e.g. 700000"
                min="0"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Notice Period *
              </label>

              <input
                type="text"
                name="noticePeriod"
                value={
                  formData.noticePeriod
                }
                onChange={handleChange}
                placeholder="e.g. 30 days"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Position Applied *
              </label>

              <select
                name="positionApplied"
                value={
                  formData.positionApplied
                }
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Position
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

            </div>

          </div>

        </section>


        {/* =========================
            RECRUITMENT INFORMATION
        ========================= */}

        <section className="form-section">

          <h2>
            Recruitment Information
          </h2>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Candidate Status *
              </label>

              <select
                name="candidateStatus"
                value={
                  formData.candidateStatus
                }
                onChange={handleChange}
                required
              >

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

            </div>


            <div className="form-group">

              <label>
                Upload CV
              </label>

              <input
                type="file"
                name="cv"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
              />

              {isEditMode &&
                formData.existingCVId && (
                  <small>
                    Existing CV is already
                    attached. Select a new
                    file only if you want to
                    replace it.
                  </small>
                )}

            </div>


            <div className="form-group form-full">

              <label>
                Comments
              </label>

              <textarea
                name="comments"
                value={
                  formData.comments
                }
                onChange={handleChange}
                placeholder="Add comments..."
                rows="4"
              />

            </div>

          </div>

        </section>


        {/* =========================
            BUTTONS
        ========================= */}

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