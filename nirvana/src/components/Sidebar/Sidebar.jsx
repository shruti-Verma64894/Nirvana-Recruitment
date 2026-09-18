import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  UserRound,
} from "lucide-react";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <div className="company-section">

        <div className="company-logo">
          <img
            src=""
            alt="Nirvana Lab"
          />
        </div>

        <div className="company-info">

          <div className="company-name">
            Nirvana Lab India Private
            <br />
            Limited.
          </div>

          <div className="company-subtitle">
            My Company
          </div>

        </div>

      </div>


      

      <nav className="sidebar-nav">

        {/* DASHBOARD */}

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <LayoutDashboard size={20} strokeWidth={1.8} />

          <span>Dashboard</span>
        </NavLink>


        {/* CANDIDATES */}

        <NavLink
          to="/candidates"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <Users size={30} strokeWidth={1.8} />

          <span>Employee</span>
        </NavLink>


        {/* CREATE CANDIDATE */}

        <NavLink
          to="/candidates/create"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <UserPlus size={30} strokeWidth={1.8} />

          <span>Attendance</span>
        </NavLink>


        {/* REPORTS */}

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <FileText size={30} strokeWidth={1.8} />

          <span>Leave</span>
        </NavLink>


        {/* USERS */}

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <UserRound size={30} strokeWidth={1.8} />

          <span>Payroll</span>
        </NavLink>


        {/* EXTRA MENU ITEMS */}

        <div className="sidebar-link disabled-link">
          <FileText size={30} strokeWidth={1.8} />
          <span>Performance</span>
        </div>

        <div className="sidebar-link disabled-link">
          <FileText size={30} strokeWidth={1.8} />
          <span>Assets</span>
        </div>

        <div className="sidebar-link disabled-link">
          <Users size={30} strokeWidth={1.8} />
          <span>Help Desk</span>
        </div>

        <div className="sidebar-link disabled-link">
          <FileText size={30} strokeWidth={1.8} />
          <span>Project</span>
        </div>

      </nav>

    </aside>
  );
};

export default Sidebar;