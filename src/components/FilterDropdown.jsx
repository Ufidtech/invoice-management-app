import React from "react";

const OPTIONS = ["Draft", "Pending", "Paid"];

function FilterDropdown({ isOpen, setIsOpen, activeFilters, setActiveFilters }) {
  const toggleStatus = (status) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  return (
    <div className="filter-wrapper">
      <button className="filter-btn" onClick={() => setIsOpen((v) => !v)}>
        Filter <span className="caret">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="filter-menu">
          {OPTIONS.map((status) => (
            <label key={status} className="checkbox-row">
              <input
                type="checkbox"
                checked={activeFilters.has(status)}
                onChange={() => toggleStatus(status)}
              />
              <span>{status}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;