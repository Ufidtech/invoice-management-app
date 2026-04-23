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
      </div>
    </aside>
  );
}

export default Sidebar;
