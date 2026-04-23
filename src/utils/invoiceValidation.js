export function validateInvoice(invoice) {
  const errors = {};

  const req = (value) => String(value ?? "").trim().length > 0;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!req(invoice.description)) errors.description = "Required";
  if (!req(invoice.clientName)) errors.clientName = "Required";

  if (!req(invoice.clientEmail)) errors.clientEmail = "Required";
  else if (!emailRegex.test(invoice.clientEmail)) errors.clientEmail = "Invalid email format";

  // Sender address
  if (!req(invoice.senderAddress?.street)) errors["senderAddress.street"] = "Required";
  if (!req(invoice.senderAddress?.city)) errors["senderAddress.city"] = "Required";
  if (!req(invoice.senderAddress?.postCode)) errors["senderAddress.postCode"] = "Required";
  if (!req(invoice.senderAddress?.country)) errors["senderAddress.country"] = "Required";

  // Client address
  if (!req(invoice.clientAddress?.street)) errors["clientAddress.street"] = "Required";
  if (!req(invoice.clientAddress?.city)) errors["clientAddress.city"] = "Required";
  if (!req(invoice.clientAddress?.postCode)) errors["clientAddress.postCode"] = "Required";
  if (!req(invoice.clientAddress?.country)) errors["clientAddress.country"] = "Required";

  // Items
  if (!Array.isArray(invoice.items) || invoice.items.length < 1) {
    errors.items = "At least one item is required";
  } else {
    invoice.items.forEach((item, index) => {
      if (!req(item.name)) errors[`items.${index}.name`] = "Required";
      if (Number(item.quantity) <= 0) errors[`items.${index}.quantity`] = "Must be > 0";
      if (Number(item.price) <= 0) errors[`items.${index}.price`] = "Must be > 0";
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    fieldErrors: errors,
  };
}