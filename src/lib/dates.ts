// Page and section dates. Content stores ISO dates (2026-10-06); pages show them as "6 October 2026".
// A month on its own ("June 2026") is shown as written and counts as the first of that month.

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** The day the site was built, in UTC. Overdue flags are judged against it. */
export const BUILD_DATE = new Date().toISOString().slice(0, 10);

/** "2026-10-06", "6 October 2026" or "June 2026" to ISO "YYYY-MM-DD" (the first of the month for a bare month). */
export function toISO(s?: string | null): string | undefined {
  if (!s) return undefined;
  const t = String(s).trim();
  let m = t.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = t.match(/^(\d{1,2}) ([A-Z][a-z]+) (\d{4})$/);
  if (m && MONTHS.includes(m[2])) return `${m[3]}-${String(MONTHS.indexOf(m[2]) + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  m = t.match(/^([A-Z][a-z]+) (\d{4})$/);
  if (m && MONTHS.includes(m[1])) return `${m[2]}-${String(MONTHS.indexOf(m[1]) + 1).padStart(2, "0")}-01`;
  return undefined;
}

/** Show a date the way the site writes it: "6 October 2026". A bare month stays a bare month. */
export function fmtDate(s?: string | null): string {
  if (!s) return "";
  const t = String(s).trim();
  if (/^[A-Z][a-z]+ \d{4}$/.test(t)) return t;
  const iso = toISO(t);
  if (!iso) return t;
  const [y, mo, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[mo - 1]} ${y}`;
}

/** The latest of several dates, as ISO. */
export function latest(...dates: (string | null | undefined)[]): string | undefined {
  return dates.map(toISO).filter(Boolean).sort().pop();
}

/** The earliest of several dates, as ISO. */
export function earliest(...dates: (string | null | undefined)[]): string | undefined {
  return dates.map(toISO).filter(Boolean).sort()[0];
}

/** A date plus a number of days, as ISO. */
export function addDays(s: string | null | undefined, days: number): string | undefined {
  const iso = toISO(s);
  if (!iso) return undefined;
  return new Date(Date.parse(iso) + days * 86400000).toISOString().slice(0, 10);
}

/** True when a review-by date has passed. */
export function isOverdue(reviewBy?: string | null): boolean {
  const iso = toISO(reviewBy);
  return !!iso && iso < BUILD_DATE;
}
