import {
  Menu,
  LogOut,
  Bell,
  Globe,
  ChevronDown,
} from "lucide-react";

import "./header.css";

const Header = () => {
  return (
    <header className="header">
      
      {/* LEFT SIDE */}
      <div className="header-left">

        <button className="menu-button">
          <Menu size={27} strokeWidth={2} />
        </button>

        <div className="breadcrumb">

          <span>Nirvana Lab India Private Limited</span>

          <span className="breadcrumb-arrow">›</span>

          <span>employee</span>

          <span className="breadcrumb-arrow">›</span>

          <span className="breadcrumb-active">
            employee-profile
          </span>

        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="header-right">

        {/* CHECK OUT */}
        <button className="checkout-button">
          <LogOut size={17} />
          <span>Check-Out</span>
        </button>


        {/* NOTIFICATION */}
        <button className="header-icon-button notification-button">
          <Bell size={26} strokeWidth={1.8} />

          <span className="notification-badge">
            !
          </span>
        </button>


        {/* LANGUAGE */}
        <button className="header-icon-button">
          <Globe size={27} strokeWidth={1.8} />
        </button>


        {/* PROFILE */}
        <div className="profile">

          <img
            src="/profile.jpg"
            alt="Ashutosh Tripathi"
            className="profile-image"
          />

          <span className="profile-name">
            Ashutosh Tripathi
          </span>

          <ChevronDown size={18} />

        </div>

      </div>

    </header>
  );
};

export default Header;