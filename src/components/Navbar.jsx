import React from 'react';

const Navbar = () => {
  // Icon components
  const HeadphonesIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  );

  const BellIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );

  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          {/* ✅ ADD YOUR LOGO CODE HERE - Replace the old logo */}
          <div className="logo">
            <div className="logo-container">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#6366f1"/>
                  <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="white"/>
                </svg>
              </div>
              <span className="logo-text">User Profiles</span>
            </div>
          </div>
        </div>
        
        {/* Removed navbar-center - No "Front-end task" text */}
        
        <div className="navbar-right">
          <button className="icon-btn" title="Support">
            <HeadphonesIcon />
          </button>
          <button className="icon-btn" title="Notifications">
            <BellIcon />
          </button>
          <button className="icon-btn user-icon" title="Profile">
            <UserIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

