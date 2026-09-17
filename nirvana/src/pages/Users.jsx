const Users = () => {
  const users = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@nirvana.com",
      role: "HR",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@nirvana.com",
      role: "Manager",
      status: "Active",
    },
    {
      id: 3,
      name: "Aman Singh",
      email: "aman@nirvana.com",
      role: "Manager",
      status: "Active",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p>Manage HR and Manager users</p>
        </div>

        <button className="primary-button">
          + Add User
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button className="secondary-button">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;