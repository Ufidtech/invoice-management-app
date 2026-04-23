export function loadInvoices() {
  const raw = localStorage.getItem("invoices");
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveInvoices(invoices) {
  localStorage.setItem("invoices", JSON.stringify(invoices));
}

export function loadTheme() {
  const saved = localStorage.getItem("theme");
  return saved === "dark" ? "dark" : "light";
}

export function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}