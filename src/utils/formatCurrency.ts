/**
 * Standard Indian Rupee currency formatter with universal display fallback
 * (renders reliably on all mobile, desktop, and minimal OS environments).
 */
export function formatPrice(amount: number): string {
  return `₹${amount}`;
}

export function formatPriceDisplay(amount: number): string {
  return `Rs. ${amount}`;
}
