import React, { useMemo, useState } from "react";
import InvoiceCard from "./InvoiceCard";

/*
  InvoiceList.jsx
  ---------------
  Handles:
  - Filter controls
  - Filtered list rendering
*/

function InvoiceList({ invoices, onEdit, onDelete, onMarkPaid }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredInvoices = useMemo(() => {
    if (statusFilter === "All") return invoices;
    return invoices.filter((invoice) => invoice.status === statusFilter);
  }, [invoices, statusFilter]);

  return (
    <section className="list-section">
      <div className="list-toolbar">
        <div className="filter-row">
          <label htmlFor="statusFilter">Filter:</label>
          <select
            id="statusFilter"
            className="select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="empty-state">
          <h3>No invoices</h3>
          <p>Nothing matches this filter yet.</p>
        </div>
      ) : (
        <div className="cards-wrap">
          {filteredInvoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onEdit={onEdit}
              onDelete={onDelete}
              onMarkPaid={onMarkPaid}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default InvoiceList;