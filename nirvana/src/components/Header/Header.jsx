import { Menu, Bell, ChevronDown } from "lucide-react";
import "./Header.css";

const Header = ({ onMenuClick, isSidebarOpen }) => {
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
        <button className="header-icon-button notification-button">
          <Bell size={26} strokeWidth={1.8} />
          <span className="notification-badge">17</span>
        </button>
        <div className="profile">
          <div className="profile-image" aria-label="HR">HR</div>
          <span className="profile-name">HR</span>
          <ChevronDown size={18} />
        </div>
      </div>
    </header>
  );
};

export default Header;