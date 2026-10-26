export const BOUTIQUE_PHONE = '+91 99500 55657';
export const BOUTIQUE_WHATSAPP_NUMBER = '919950055657';

export function getWhatsAppEnquiryUrl(text: string): string {
  return `https://wa.me/${BOUTIQUE_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getGeneralEnquiryUrl(): string {
  const message = 'Namaste Radha Bootic Centre! I am visiting your website and want to enquire about your designs and custom stitching services.';
  return getWhatsAppEnquiryUrl(message);
}

export function getProductEnquiryUrl(productName: string, category: string, price?: number): string {
  const rateInfo = price ? ` (Stitching/Rate: approx Rs. ${price})` : '';
  const message = `Namaste Radha Bootic Centre! I am interested in your design:\n• Design: ${productName}\n• Category: ${category}${rateInfo}\n\nPlease share design details, fabric options, and fitting turnaround.`;
  return getWhatsAppEnquiryUrl(message);
}

export function getRateEnquiryUrl(serviceName: string, estimatedPrice: number): string {
  const message = `Namaste Radha Bootic Centre! I checked your official Rate Card and want to enquire about:\n• Service: ${serviceName}\n• Estimated Rate: Rs. ${estimatedPrice}\n\nPlease let me know when I can bring my fabric or visit the boutique for measurements.`;
  return getWhatsAppEnquiryUrl(message);
}
