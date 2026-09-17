import React from 'react';

const candidates = [
  { first: 'Sudhanshu', last: 'Gupta', email: 'sudhanshu@gmail.com', phone: '+919987654321', role: 'Liferay', status: 'Active', exp: '3 yrs' },
  { first: 'Srishti', last: 'Prashar', email: 'srishti@gmail.com', phone: '+919856781234', role: 'Devops', status: 'Active', exp: '2 yrs' },
  { first: 'Aarav', last: 'Sharma', email: 'aarav.sharma@example.com', phone: '+917890956782', role: 'Python', status: 'Selected', exp: '4 yrs' },
  { first: 'Rohan', last: 'Mehta', email: 'rohan.mehta@gmail.com', phone: '+919876543214', role: 'Python', status: 'Rejected', exp: '1 yr' },
];

const statusBadge = {
  Active: 'bg-success-subtle text-success border border-success-subtle',
  Selected: 'bg-success-subtle text-success border border-success-subtle',
  Rejected: 'bg-danger-subtle text-danger border border-danger-subtle',
  Review: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle',
};

export default function Dashboard({ onLogout }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white border-bottom px-4 py-3">
        <div className="d-flex align-items-center gap-2">
          <div className="nv-logo-wrap">
            <div className="nv-logo-box">N</div>
            <span className="nv-logo-tag">NirvanaLab</span>
          </div>
          <span className="fw-bold fs-5">Nirvana Recruitment Hub</span>
        </div>
        <div className="ms-auto d-flex align-items-center gap-4">
          <a href="/dashboard" className="text-dark text-decoration-none fw-semibold">Home</a>
          <a href="/login" className="text-dark text-decoration-none fw-semibold">Reset Password</a>
          <a
            href="#"
            className="text-dark text-decoration-none fw-semibold"
            onClick={(e) => { e.preventDefault(); onLogout(); }}
          >
            Logout
          </a>
          <div className="d-flex align-items-center gap-2 fw-semibold">
            <div
              className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
              style={{ width: 34, height: 34, fontSize: 13 }}
            >
              DS
            </div>
            Deepanshi Singh
            <i className="bi bi-chevron-down small"></i>
          </div>
        </div>
      </nav>

      <div className="container-fluid px-4 py-4">
        <div className="text-nv-orange fw-bold small mb-1 nv-eyebrow">DASHBOARD</div>
        <h1 className="fw-bold">Candidate Overview</h1>
        <p className="text-muted mb-1">Track applications, review candidate progress, and manage the recruitment pipeline.</p>
        <p className="fw-semibold small mb-4">
          Recruitment workspace <span className="text-nv-orange mx-1">&bull;</span> Candidate applications
        </p>

        <div className="d-flex gap-3 mb-4">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input type="text" className="form-control" placeholder="Search candidates..." />
          </div>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2 px-3">
            <i className="bi bi-funnel"></i> Filters
          </button>
        </div>

        <div className="table-responsive">
          <table className="table align-middle nv-table">
            <thead>
              <tr>
                <th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th>
                <th>Position Applied</th><th>Comments</th><th>Status</th><th>Experience</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, i) => (
                <tr key={i}>
                  <td className="fw-semibold">{c.first}</td>
                  <td className="fw-semibold">{c.last}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.role}</td>
                  <td>
                    <button className="btn btn-outline-secondary btn-sm">View Comments</button>
                  </td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-2 nv-status-badge ${statusBadge[c.status]}`}>
                      {c.status} <i className="bi bi-chevron-down ms-1"></i>
                    </span>
                  </td>
                  <td>{c.exp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}