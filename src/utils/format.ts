/**
 * Deterministic number formatting utility for DonateFood.in.
 * 
 * Uses deterministic Indian numbering formatting (Lakhs & Crores) to guarantee
 * that SSR (Node.js/Edge Server) and Browser Client hydration produce 100% identical
 * strings, eliminating Next.js React hydration mismatch errors caused by client-side
 * OS locale differences.
 */

export function formatIndianNumber(num: number | string): string {
  const n = typeof num === "string" ? parseFloat(num) : num;
  if (isNaN(n)) return "0";
  const str = Math.round(n).toString();
  if (str.length <= 3) return str;
  const lastThree = str.substring(str.length - 3);
  const otherNumbers = str.substring(0, str.length - 3);
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
}

export function formatNumber(num: number | string): string {
  return formatIndianNumber(num);
}
