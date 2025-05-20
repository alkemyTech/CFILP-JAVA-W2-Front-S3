// Valida si un numero de telefono es valido (ARG only)
export function isValidPhoneNumber(phone) {
  const cleaned = phone.replace(/\s|-/g, "");
  const regex = /^(\+54)?\d{10}$/; // +549 + 10 dígitos, o 11 + 8 dígitos
  return regex.test(cleaned);
}
