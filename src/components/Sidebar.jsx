import React from "react";

function Sidebar({ theme, onToggleTheme }) {
  return (
    <aside className="sidebar">
      <div className="logo-block">
        <div className="logo-mark">◢</div>
      </div>

      <div className="sidebar-bottom">
        <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        
        <div className="avatar-block">
          <div className="avatar">
            <svg viewBox="0 0 60 60" width="40" height="40">
              <circle cx="30" cy="15" r="10" fill="#7c5dfa"/>
              <path d="M 15 35 Q 15 25 30 25 Q 45 25 45 35 Q 45 45 30 45 Q 15 45 15 35" fill="#7c5dfa"/>
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
