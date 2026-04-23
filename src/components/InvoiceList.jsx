import React from "react";
import InvoiceRow from "./InvoiceRow";

function InvoiceList({ invoices, onSelectInvoice }) {
  if (!invoices.length) {
    return (
      <section className="empty-state">
        <svg className="empty-illustration" viewBox="0 0 200 200" width="180" height="180">
          {/* Mailbox illustration */}
          <rect x="50" y="100" width="100" height="50" rx="8" fill="#f4f4f5" stroke="#dfe3fa" strokeWidth="2"/>
          <path d="M60 70 Q70 50 100 50 Q130 50 140 70" fill="none" stroke="#dfe3fa" strokeWidth="3"/>
          <circle cx="75" cy="85" r="8" fill="#7c5dfa"/>
          <circle cx="125" cy="85" r="8" fill="#7c5dfa"/>
          <rect x="70" y="115" width="60" height="25" rx="4" fill="#ecfdf3" stroke="#33d69f" strokeWidth="2"/>
          <text x="100" y="135" textAnchor="middle" fill="#33d69f" fontSize="12" fontWeight="bold">✓</text>
          {/* Envelope */}
          <g transform="translate(100, 70)">
            <rect x="-30" y="-25" width="60" height="40" rx="2" fill="white" stroke="#7c5dfa" strokeWidth="2"/>
            <path d="M-30 -25 L0 -5 L30 -25" fill="none" stroke="#7c5dfa" strokeWidth="2"/>
          </g>
        </svg>
        <h3>There is nothing here</h3>
        <p>Create a new invoice by clicking the New Invoice button.</p>
      </section>
    );
  }

  return (
    <section className="invoice-list">
      {invoices.map((invoice) => (
        <InvoiceRow key={invoice.id} invoice={invoice} onClick={() => onSelectInvoice(invoice.id)} />
      ))}
    </section>
  );
}

export default InvoiceList;