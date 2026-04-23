import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetail from "./components/InvoiceDetail";
import InvoiceForm from "./components/InvoiceForm";
import DeleteModal from "./components/DeleteModal";
import { loadInvoices, saveInvoices, loadTheme, saveTheme } from "./utils/storage";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [theme, setTheme] = useState("light");

  // views: list | detail | form
  const [view, setView] = useState("list");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);

  // filter set: All or combination of statuses
  const [activeFilters, setActiveFilters] = useState(new Set());

  // delete modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  // -------- Load persisted state once --------
  useEffect(() => {
    setInvoices(loadInvoices());
    setTheme(loadTheme());
  }, []);

  // -------- Persist invoices --------
  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  // -------- Apply + persist theme --------
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    saveTheme(theme);
  }, [theme]);

  // -------- Derived selected invoice --------
  const selectedInvoice = useMemo(
    () => invoices.find((inv) => inv.id === selectedInvoiceId) || null,
    [invoices, selectedInvoiceId]
  );

  // -------- Filtering logic --------
  const filteredInvoices = useMemo(() => {
    // If no checkbox selected => show all
    if (activeFilters.size === 0) return invoices;
    return invoices.filter((inv) => activeFilters.has(inv.status));
  }, [invoices, activeFilters]);

  // -------- Handlers --------
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleNewInvoice = () => {
    setEditingInvoice(null);
    setView("form");
  };

  const handleSelectInvoice = (id) => {
    setSelectedInvoiceId(id);
    setView("detail");
  };

  const handleBackToList = () => {
    setSelectedInvoiceId(null);
    setEditingInvoice(null);
    setView("list");
  };

  const handleEditInvoice = (invoice) => {
    // Paid can still be viewed; editing rule can be adjusted.
    // As per requested logic, we prevent reverting paid to draft in form.
    setEditingInvoice(invoice);
    setView("form");
  };

  const handleSaveInvoice = (invoicePayload) => {
    if (editingInvoice) {
      // update existing
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === editingInvoice.id
            ? {
                ...inv,
                ...invoicePayload,
                id: editingInvoice.id,
                createdAt: editingInvoice.createdAt,
              }
            : inv
        )
      );
      setSelectedInvoiceId(editingInvoice.id);
      setEditingInvoice(null);
      setView("detail");
    } else {
      // create new
      const newInvoice = {
        ...invoicePayload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setInvoices((prev) => [newInvoice, ...prev]);
      setSelectedInvoiceId(newInvoice.id);
      setView("detail");
    }
  };

  const handleMarkAsPaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv;
        if (inv.status === "Pending") return { ...inv, status: "Paid" };
        return inv;
      })
    );
  };

  const openDeleteModal = (invoice) => {
    setInvoiceToDelete(invoice);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setInvoiceToDelete(null);
  };

  const confirmDelete = () => {
    if (!invoiceToDelete) return;
    setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceToDelete.id));
    closeDeleteModal();
    handleBackToList();
  };

  return (
    <div className="app-shell">
      <Sidebar theme={theme} onToggleTheme={handleToggleTheme} />

      <div className="content-area">
        <Header
          totalCount={invoices.length}
          filteredCount={filteredInvoices.length}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          onNewInvoice={handleNewInvoice}
          view={view}
          onBack={handleBackToList}
        />

        <main>
          {view === "list" && (
            <InvoiceList
              invoices={filteredInvoices}
              onSelectInvoice={handleSelectInvoice}
            />
          )}

          {view === "detail" && selectedInvoice && (
            <InvoiceDetail
              invoice={selectedInvoice}
              onBack={handleBackToList}
              onEdit={handleEditInvoice}
              onDelete={openDeleteModal}
              onMarkAsPaid={handleMarkAsPaid}
            />
          )}

          {view === "form" && (
            <InvoiceForm
              editingInvoice={editingInvoice}
              onCancel={() => {
                if (editingInvoice) {
                  setSelectedInvoiceId(editingInvoice.id);
                  setView("detail");
                } else {
                  setView("list");
                }
              }}
              onSave={handleSaveInvoice}
            />
          )}
        </main>
      </div>

      <DeleteModal
        isOpen={isDeleteOpen}
        invoice={invoiceToDelete}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default App;