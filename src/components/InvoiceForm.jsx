import React, { useEffect, useMemo, useState } from "react";
import { validateInvoice } from "../utils/invoiceValidation";

const emptyAddress = { street: "", city: "", postCode: "", country: "" };

function InvoiceForm({ editingInvoice, onCancel, onSave }) {
  const isEdit = Boolean(editingInvoice);

  const [form, setForm] = useState({
    description: "",
    paymentTerms: 30,
    clientName: "",
    clientEmail: "",
    status: "Draft",
    senderAddress: { ...emptyAddress },
    clientAddress: { ...emptyAddress },
    items: [{ name: "", quantity: 1, price: 0, total: 0 }],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!editingInvoice) return;
    setForm({
      description: editingInvoice.description,
      paymentTerms: editingInvoice.paymentTerms,
      clientName: editingInvoice.clientName,
      clientEmail: editingInvoice.clientEmail,
      status: editingInvoice.status,
      senderAddress: { ...editingInvoice.senderAddress },
      clientAddress: { ...editingInvoice.clientAddress },
      items: editingInvoice.items.map((i) => ({ ...i })),
    });
  }, [editingInvoice]);

  const paymentDue = useMemo(() => {
    const base = editingInvoice ? new Date(editingInvoice.createdAt) : new Date();
    const due = new Date(base);
    due.setDate(due.getDate() + Number(form.paymentTerms || 0));
    return due.toISOString();
  }, [form.paymentTerms, editingInvoice]);

  const total = useMemo(
    () => form.items.reduce((sum, item) => sum + Number(item.total || 0), 0),
    [form.items]
  );

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateAddress = (type, key, value) => {
    setForm((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value,
      },
    }));
  };

  const updateItem = (index, key, value) => {
    setForm((prev) => {
      const copy = [...prev.items];
      copy[index] = { ...copy[index], [key]: value };

      const quantity = Number(copy[index].quantity || 0);
      const price = Number(copy[index].price || 0);
      copy[index].total = quantity * price;

      return { ...prev, items: copy };
    });
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0, total: 0 }],
    }));
  };

  const removeItem = (index) => {
    setForm((prev) => {
      const copy = prev.items.filter((_, i) => i !== index);
      return { ...prev, items: copy.length ? copy : [{ name: "", quantity: 1, price: 0, total: 0 }] };
    });
  };

  const handleSubmit = (finalStatus) => {
    const payload = {
      ...form,
      status: finalStatus,
      paymentDue,
      total,
    };

    const { isValid, fieldErrors } = validateInvoice(payload);
    setErrors(fieldErrors);

    if (!isValid) return;
    onSave(payload);
  };

  const saveStatus = isEdit ? form.status : "Pending";

  return (
    <section className="form-panel">
      <h2>{isEdit ? `Edit #${editingInvoice.id.slice(0, 6)}` : "New Invoice"}</h2>

      <div className="form-block">
        <h3>Bill From</h3>
        <div className="grid-1">
          <Field
            label="Street Address"
            value={form.senderAddress.street}
            onChange={(v) => updateAddress("senderAddress", "street", v)}
            error={errors["senderAddress.street"]}
          />
        </div>
        <div className="grid-3">
          <Field
            label="City"
            value={form.senderAddress.city}
            onChange={(v) => updateAddress("senderAddress", "city", v)}
            error={errors["senderAddress.city"]}
          />
          <Field
            label="Post Code"
            value={form.senderAddress.postCode}
            onChange={(v) => updateAddress("senderAddress", "postCode", v)}
            error={errors["senderAddress.postCode"]}
          />
          <Field
            label="Country"
            value={form.senderAddress.country}
            onChange={(v) => updateAddress("senderAddress", "country", v)}
            error={errors["senderAddress.country"]}
          />
        </div>
      </div>

      <div className="form-block">
        <h3>Bill To</h3>
        <Field
          label="Client's Name"
          value={form.clientName}
          onChange={(v) => updateField("clientName", v)}
          error={errors.clientName}
        />
        <Field
          label="Client's Email"
          value={form.clientEmail}
          onChange={(v) => updateField("clientEmail", v)}
          error={errors.clientEmail}
          type="email"
        />
        <Field
          label="Street Address"
          value={form.clientAddress.street}
          onChange={(v) => updateAddress("clientAddress", "street", v)}
          error={errors["clientAddress.street"]}
        />

        <div className="grid-3">
          <Field
            label="City"
            value={form.clientAddress.city}
            onChange={(v) => updateAddress("clientAddress", "city", v)}
            error={errors["clientAddress.city"]}
          />
          <Field
            label="Post Code"
            value={form.clientAddress.postCode}
            onChange={(v) => updateAddress("clientAddress", "postCode", v)}
            error={errors["clientAddress.postCode"]}
          />
          <Field
            label="Country"
            value={form.clientAddress.country}
            onChange={(v) => updateAddress("clientAddress", "country", v)}
            error={errors["clientAddress.country"]}
          />
        </div>

        <div className="grid-2">
          <div className="field">
            <label>Payment Terms</label>
            <select
              className="input"
              value={form.paymentTerms}
              onChange={(e) => updateField("paymentTerms", Number(e.target.value))}
            >
              <option value={1}>Net 1 Day</option>
              <option value={7}>Net 7 Days</option>
              <option value={14}>Net 14 Days</option>
              <option value={30}>Net 30 Days</option>
            </select>
          </div>

          {isEdit && (
            <div className="field">
              <label>Status</label>
              <select
                className="input"
                value={form.status}
                onChange={(e) => updateField("status", e.target.value)}
              >
                {editingInvoice.status === "Paid" ? (
                  <option value="Paid">Paid</option>
                ) : editingInvoice.status === "Pending" ? (
                  <>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </>
                ) : (
                  <>
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                  </>
                )}
              </select>
            </div>
          )}
        </div>

        <Field
          label="Project Description"
          value={form.description}
          onChange={(v) => updateField("description", v)}
          error={errors.description}
        />
      </div>

      <div className="form-block">
        <h3>Item List</h3>
        {errors.items && <p className="error-text">{errors.items}</p>}

        <div className="items-editor-head">
          <p>Item Name</p>
          <p>Qty.</p>
          <p>Price</p>
          <p>Total</p>
          <p> </p>
        </div>

        {form.items.map((item, index) => (
          <div className="items-editor-row" key={index}>
            <input
              className={`input ${errors[`items.${index}.name`] ? "input-error" : ""}`}
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              placeholder="Item name"
            />
            <input
              className={`input ${errors[`items.${index}.quantity`] ? "input-error" : ""}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
            />
            <input
              className={`input ${errors[`items.${index}.price`] ? "input-error" : ""}`}
              type="number"
              min="0.01"
              step="0.01"
              value={item.price}
              onChange={(e) => updateItem(index, "price", Number(e.target.value))}
            />
            <p className="item-total">${Number(item.total).toFixed(2)}</p>
            <button className="icon-delete" type="button" onClick={() => removeItem(index)}>
              ✕
            </button>
          </div>
        ))}

        <button className="btn btn-secondary wide" type="button" onClick={addItem}>
          + Add New Item
        </button>
      </div>

      <div className="form-actions sticky">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Discard
        </button>

        {!isEdit && (
          <button type="button" className="btn btn-muted" onClick={() => handleSubmit("Draft")}>
            Save as Draft
          </button>
        )}

        <button type="button" className="btn btn-primary" onClick={() => handleSubmit(saveStatus)}>
          {isEdit ? "Save Changes" : "Save & Send"}
        </button>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, error, type = "text" }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        className={`input ${error ? "input-error" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
      {error ? <small className="error-text">{error}</small> : null}
    </div>
  );
}

export default InvoiceForm;
