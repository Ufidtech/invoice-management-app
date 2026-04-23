import React, { useState } from "react";
import FilterDropdown from "./FilterDropdown";

function Header({
  totalCount,
  filteredCount,
  activeFilters,
  setActiveFilters,
  onNewInvoice,
  view,
  onBack,
}) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        {view !== "list" && (
          <button className="back-btn" onClick={onBack}>
            ← Go back
          </button>
        )}

        <h1>Invoices</h1>
        <p className="subtext">
          {activeFilters.size === 0
            ? `There are ${totalCount} total invoices`
            : `Showing ${filteredCount} filtered invoices`}
        </p>
      </div>

      {view === "list" && (
        <div className="topbar-actions">
          <FilterDropdown
            isOpen={filterOpen}
            setIsOpen={setFilterOpen}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
          <button className="btn btn-primary new-btn" onClick={onNewInvoice}>
            <span className="plus-circle">+</span>
            <span>New Invoice</span>
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;