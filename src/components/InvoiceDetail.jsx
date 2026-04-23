import React from "react";
import StatusBadge from "./StatusBadge";

function InvoiceDetail({ invoice, onBack, onEdit, onDelete, onMarkAsPaid }) {
  const canMarkPaid = invoice.status === "Pending";

  const itemSubTotal = invoice.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <section className="detail-wrap">
      <div className="detail-actions-mobile">
        <button className="back-btn" onClick={onBack}>
          ← Go back
        </button>
      </div>

      <div className="status-bar">
        <p>Status</p>
        <StatusBadge status={invoice.status} />
        <div className="status-actions">
          <button className="btn btn-secondary" onClick={() => onEdit(invoice)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(invoice)}>
            Delete
          </button>
          <button
            className="btn btn-primary"
            disabled={!canMarkPaid}
            onClick={() => onMarkAsPaid(invoice.id)}
          >
            Mark as Paid
          </button>
        </div>
      </div>

      <article className="detail-card">
        <div className="detail-top">
          <div>
            <h3>
              <span>#</span>
              {invoice.id.slice(0, 6)}
            </h3>
            <p>{invoice.description}</p>
          </div>
          <div className="sender-address">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>

        <div className="detail-grid">
          <div>
            <p className="label">Invoice Date</p>
            <h4>{new Date(invoice.createdAt).toLocaleDateString()}</h4>

            <p className="label mt">Payment Due</p>
            <h4>{new Date(invoice.paymentDue).toLocaleDateString()}</h4>
          </div>

          <div>
            <p className="label">Bill To</p>
            <h4>{invoice.clientName}</h4>
            <p>{invoice.clientAddress.street}</p>
            <p>{invoice.clientAddress.city}</p>
            <p>{invoice.clientAddress.postCode}</p>
            <p>{invoice.clientAddress.country}</p>
          </div>

          <div>
            <p className="label">Sent to</p>
            <h4>{invoice.clientEmail}</h4>
          </div>
        </div>

        <div className="items-box">
          <div className="items-head">
            <p>Item Name</p>
            <p>QTY.</p>
            <p>Price</p>
            <p>Total</p>
          </div>

          {invoice.items.map((item, idx) => (
            <div className="items-row" key={`${item.name}-${idx}`}>
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              <p>${item.price.toFixed(2)}</p>
              <p>${item.total.toFixed(2)}</p>
            </div>
          ))}

          <div className="grand-total">
            <p>Amount Due</p>
            <h3>${itemSubTotal.toFixed(2)}</h3>
          </div>
        </div>
      </article>
    </section>
  );
}

export default InvoiceDetail;