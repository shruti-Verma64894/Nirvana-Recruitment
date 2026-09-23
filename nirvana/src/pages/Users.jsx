import { useEffect, useState } from "react";

import { getUsers } from "../services/userService";
import { resolveRole, isHR, getCurrentUser } from "../services/authService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { email: currentUserEmail } = getCurrentUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getUsers();

        const mapped = data.map((user) => ({
          id: user.id,
          name: user.name || "-",
          email: user.emailAddress || "-",
          role: resolveRole(user.roleBriefs),
          status: user.status || "-",
        }));
        const loginEligible = mapped.filter((user) => user.role !== null);

        setUsers(loginEligible);
      } catch (error) {
        console.error("Users Fetch Error:", error);

        setError(
          error.response?.data?.title ||
            error.message ||
            "Failed to load users."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p>All users who can log in to this system</p>
        </div>

        {isHR() && (
          <button className="primary-button">+ Add User</button>
        )}
      </div>

      {loading && <p>Loading users...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Session</th>
                {isHR() && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={isHR() ? 7 : 6} className="empty-state">
                    No login-eligible users found
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isCurrentUser =
                    user.email.toLowerCase() ===
                    currentUserEmail.toLowerCase();

                  return (
                    <tr
                      key={user.id}
                      className={isCurrentUser ? "current-user-row" : ""}
                    >
                      <td>{user.id}</td>

                      <td>
                        {user.name}
                        {isCurrentUser && (
                          <span className="you-badge"> (You)</span>
                        )}
                      </td>

                      <td>{user.email}</td>

                      <td>
                        <span
                          className={`status-badge status-${user.role.toLowerCase()}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td>{user.status}</td>

                      <td>
                        {isCurrentUser ? (
                          <span className="status-badge status-active">
                            Active now
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>

                      {isHR() && (
                        <td>
                          <button className="secondary-button">Edit</button>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;