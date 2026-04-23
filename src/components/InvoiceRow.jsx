import React from "react";
import StatusBadge from "./StatusBadge";

function InvoiceRow({ invoice, onClick }) {
  const dueDate = new Date(invoice.paymentDue).toLocaleDateString();
  const amount = Number(invoice.total).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });

  return (
    <button className="invoice-row" onClick={onClick}>
      <p className="cell id">
        <span>#</span>
        {invoice.id.slice(0, 6)}
      </p>
      <p className="cell due">Due {dueDate}</p>
      <p className="cell client">{invoice.clientName}</p>
      <p className="cell amount">{amount}</p>
      <div className="cell status">
        <StatusBadge status={invoice.status} />
      </div>
      <span className="arrow">›</span>
    </button>
  );
}

export default InvoiceRow;