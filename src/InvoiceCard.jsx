import React from "react";

/*
  InvoiceCard.jsx
  ---------------
  One invoice summary card.
*/

function InvoiceCard({ invoice, onEdit, onDelete, onMarkPaid }) {
  const canEdit = invoice.status !== "Paid";
  const canMarkPaid = invoice.status === "Pending";

  const statusClass = `badge badge-${invoice.status.toLowerCase()}`;
  const shortId = invoice.id.slice(0, 8);
  const createdDate = new Date(invoice.createdAt).toLocaleDateString();

  return (
    <article className="invoice-card">
      <div className="invoice-top">
        <p className="invoice-id">
          <span>#</span>
          {shortId}
        </p>
        <span className={statusClass}>{invoice.status}</span>
      </div>

      <h3 className="invoice-client">{invoice.clientName}</h3>
      <p className="invoice-email">{invoice.clientEmail}</p>
      <p className="invoice-description">{invoice.description}</p>

      <div className="invoice-meta">
        <p className="invoice-amount">${Number(invoice.amount).toFixed(2)}</p>
        <p className="invoice-date">Created: {createdDate}</p>
      </div>

      <div className="invoice-actions">
        <button
          className="btn btn-secondary"
          disabled={!canEdit}
          onClick={() => onEdit(invoice)}
          title={!canEdit ? "Paid invoices cannot be edited" : "Edit invoice"}
        >
          Edit
        </button>

        <button className="btn btn-danger" onClick={() => onDelete(invoice.id)}>
          Delete
        </button>

        <button
          className="btn btn-success"
          disabled={!canMarkPaid}
          onClick={() => onMarkPaid(invoice.id)}
          title={!canMarkPaid ? "Only pending invoices can be marked as paid" : "Mark as paid"}
        >
          Mark as Paid
        </button>
      </div>
    </article>
  );
}

export default InvoiceCard;