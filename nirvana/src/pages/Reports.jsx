const Reports = () => {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>View recruitment reports and candidate statistics</p>
        </div>
      </div>

      <div className="report-section">
        <div className="report-card">
          <h3>Candidate Report</h3>
          <p>View candidate recruitment statistics.</p>
          <button className="primary-button">
            View Report
          </button>
        </div>

        <div className="report-card">
          <h3>Status Report</h3>
          <p>View candidates based on recruitment status.</p>
          <button className="primary-button">
            View Report
          </button>
        </div>

        <div className="report-card">
          <h3>Role Report</h3>
          <p>View candidates based on applied roles.</p>
          <button className="primary-button">
            View Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;