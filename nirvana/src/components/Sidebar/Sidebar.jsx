import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  UserRound,
} from "lucide-react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "" : "sidebar-collapsed"}`}>
      <div className="company-section">
        <div className="company-logo">
          <img src={logo} alt="Nirvana Lab" />
        </div>

        {isOpen && (
          <div className="company-info">
            <div className="company-name">Nirvana Recrurement</div>
            <div className="company-subtitle">My Company</div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <LayoutDashboard size={20} strokeWidth={1.8} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/candidates"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <Users size={20} strokeWidth={1.8} />
          {isOpen && <span>Candidates</span>}
        </NavLink>

        <NavLink
          to="/candidates/create"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <UserPlus size={20} strokeWidth={1.8} />
          {isOpen && <span>Create Candidate</span>}
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FileText size={20} strokeWidth={1.8} />
          {isOpen && <span>Reports</span>}
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <UserRound size={20} strokeWidth={1.8} />
          {isOpen && <span>Users</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;