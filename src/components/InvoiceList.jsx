import React from "react";
import InvoiceRow from "./InvoiceRow";

function InvoiceList({ invoices, onSelectInvoice }) {
  if (!invoices.length) {
    return (
      <section className="empty-state">
        <img
          src="https://via.placeholder.com/180x120?text=No+Invoices"
          alt="No invoices illustration"
        />
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