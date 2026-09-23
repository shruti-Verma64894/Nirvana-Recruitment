import { Menu, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Header.css";

import { getCurrentUser, logout } from "../../services/authService";

const Header = ({ onMenuClick, isSidebarOpen }) => {
  const navigate = useNavigate();
  const { name, role } = getCurrentUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  const initials = (name || role || "?")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className={`header ${isSidebarOpen ? "" : "header-expanded"}`}>
      <div className="header-left">
        <button className="menu-button" onClick={onMenuClick}>
          <Menu size={27} strokeWidth={2} />
        </button>
        <div className="breadcrumb">
          <span>Nirvana Lab India Private Limited</span>
        </div>
      </div>

      <div className="header-right">
        <div className="profile" ref={menuRef}>
          <div
            className="profile-trigger"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div className="profile-image" aria-label={role}>
              {initials}
            </div>
            <span className="profile-name">{role}</span>
            <ChevronDown size={18} />
          </div>

          {menuOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <strong>{name}</strong>
                <span>{role}</span>
              </div>

              <button className="profile-dropdown-item" onClick={handleLogout}>
                <LogOut size={16} strokeWidth={1.8} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;