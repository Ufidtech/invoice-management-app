import React, { useEffect, useRef } from "react";

function DeleteModal({ isOpen, invoice, onCancel, onConfirm }) {
  const modalRef = useRef(null);
  const cancelRef = useRef(null);
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    cancelRef.current?.focus();

    const handleEsc = (e) => {
      if (e.key === "Escape") onCancel();
    };

    const trapFocus = (e) => {
      if (e.key !== "Tab") return;
      const focusable = [cancelRef.current, confirmRef.current].filter(Boolean);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isOpen, onCancel]);

  if (!isOpen || !invoice) return null;

  return (
    <div className="modal-overlay" role="presentation" onClick={onCancel}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="delete-title">Confirm Deletion</h3>
        <p>
          Are you sure you want to delete invoice #{invoice.id.slice(0, 6)}? This action cannot be
          undone.
        </p>

        <div className="modal-actions">
          <button ref={cancelRef} className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button ref={confirmRef} className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;