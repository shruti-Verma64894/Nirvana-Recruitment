import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserRound,
} from "lucide-react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";

import { permissions } from "../../services/permissions";

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
          to="/dashboard"
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

        {permissions.canCreateCandidate() && (
          <NavLink
            to="/candidates/create"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <UserPlus size={20} strokeWidth={1.8} />
            {isOpen && <span>Create Candidate</span>}
          </NavLink>
        )}

        {permissions.canManageUsers() && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <UserRound size={20} strokeWidth={1.8} />
            {isOpen && <span>Users</span>}
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;