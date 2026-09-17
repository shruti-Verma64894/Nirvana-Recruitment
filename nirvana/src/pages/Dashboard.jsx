import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Candidates",
      value: 120,
    },
    {
      title: "Active",
      value: 25,
    },
    {
      title: "Under Review",
      value: 18,
    },
    {
      title: "Round 1",
      value: 20,
    },
    {
      title: "Round 2",
      value: 15,
    },
    {
      title: "Round 3",
      value: 10,
    },
    {
      title: "Round 4",
      value: 8,
    },
    {
      title: "Rejected",
      value: 12,
    },
    {
      title: "Approved",
      value: 7,
    },
    {
      title: "Offer Letter",
      value: 5,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Recruitment overview</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;