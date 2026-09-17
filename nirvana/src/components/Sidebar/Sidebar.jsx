import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        Menu
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/">
          Dashboard
        </NavLink>

        <NavLink to="/candidates">
          Candidates
        </NavLink>

        <NavLink to="/candidates/create">
          Create Candidate
        </NavLink>

        <NavLink to="/reports">
          Reports
        </NavLink>

        <NavLink to="/users">
          Users
        </NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;