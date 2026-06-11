import seedData from "@/data/lumastay.json";
import type { Booking } from "./types";
import { BookingStatus } from "./types";

/**
 * Client-side booking store.
 *
 * LumaStay has no backend, so the "database" is the seed JSON shipped in
 * `data/lumastay.json`. To make the booking lifecycle feel real end to end,
 * this store overlays two pieces of browser state on top of that seed:
 *
 *   1. User-created bookings   — reservations the guest completes at checkout.
 *   2. Status overrides        — lifecycle changes (e.g. cancellations) applied
 *                                to either seed or user bookings.
 *
 * Every interactive surface (confirmation, dashboard, admin) reads through this
 * store so a freshly created or cancelled booking is reflected everywhere.
 */

const BOOKINGS_KEY = "lumastay_user_bookings";
const OVERRIDES_KEY = "lumastay_status_overrides";

/** The signed-in demo guest. */
export const CURRENT_GUEST = "John Smith";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — ignore in prototype */
  }
}

/** Bookings that ship with the prototype. */
export function getSeedBookings(): Booking[] {
  return seedData.bookings as Booking[];
}

/** Bookings the guest has created in this browser. */
export function getUserBookings(): Booking[] {
  return readJSON<Booking[]>(BOOKINGS_KEY, []);
}

function getStatusOverrides(): Record<string, string> {
  return readJSON<Record<string, string>>(OVERRIDES_KEY, {});
}

function applyOverride(booking: Booking, overrides: Record<string, string>): Booking {
  const next = overrides[booking.bookingRef];
  return next ? { ...booking, status: next } : booking;
}

// ---------------------------------------------------------------------------
// Reactive layer
//
// The store is a tiny external store so React components can subscribe via
// `useSyncExternalStore` (see lib/useBookings.ts). Snapshots are cached by a
// version counter — every mutation bumps the version, which both invalidates
// the cache and notifies subscribers so all open views (dashboard, admin,
// confirmation) stay in sync. Caching keeps `getSnapshot` referentially stable,
// which `useSyncExternalStore` requires.
// ---------------------------------------------------------------------------

const SERVER_SNAPSHOT: Booking[] = getSeedBookings();
const SERVER_MY_SNAPSHOT: Booking[] = SERVER_SNAPSHOT.filter(
  (b) => b.guestName === CURRENT_GUEST
);

let version = 0;
let cacheVersion = -1;
let cachedAll: Booking[] = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

function emitChange(): void {
  version += 1;
  listeners.forEach((listener) => listener());
}

function onStorageEvent(e: StorageEvent): void {
  if (e.key === BOOKINGS_KEY || e.key === OVERRIDES_KEY) emitChange();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (isBrowser() && listeners.size === 1) {
    window.addEventListener("storage", onStorageEvent);
  }
  return () => {
    listeners.delete(listener);
    if (isBrowser() && listeners.size === 0) {
      window.removeEventListener("storage", onStorageEvent);
    }
  };
}

function rebuild(): Booking[] {
  const overrides = getStatusOverrides();
  const user = getUserBookings().map((b) => applyOverride(b, overrides));
  const seed = getSeedBookings().map((b) => applyOverride(b, overrides));
  return [...user, ...seed];
}

/**
 * Every booking visible in the app — user-created first (most recent), then the
 * seed reservations — with any status overrides applied. Result is cached and
 * referentially stable until the next mutation.
 */
export function getAllBookings(): Booking[] {
  if (!isBrowser()) return SERVER_SNAPSHOT;
  if (cacheVersion !== version) {
    cachedAll = rebuild();
    cacheVersion = version;
  }
  return cachedAll;
}

/** Stable server/initial snapshot (seed only) for useSyncExternalStore. */
export function getServerBookings(): Booking[] {
  return SERVER_SNAPSHOT;
}

/** Stable server/initial snapshot of the current guest's seed bookings. */
export function getServerMyBookings(): Booking[] {
  return SERVER_MY_SNAPSHOT;
}

/** Bookings belonging to the signed-in guest (their seed history + new ones). */
export function getMyBookings(): Booking[] {
  return getAllBookings().filter(
    (b) => b.isUserCreated || b.guestName === CURRENT_GUEST
  );
}

export function getBookingByRef(ref: string): Booking | undefined {
  return getAllBookings().find((b) => b.bookingRef === ref);
}

/** Persist a reservation created at checkout. */
export function saveBooking(booking: Booking): void {
  const existing = getUserBookings().filter(
    (b) => b.bookingRef !== booking.bookingRef
  );
  writeJSON(BOOKINGS_KEY, [{ ...booking, isUserCreated: true }, ...existing]);
  emitChange();
}

/** Move a booking to a new lifecycle status (persists across seed + user). */
export function setBookingStatus(ref: string, status: BookingStatus | string): void {
  const userBookings = getUserBookings();
  const idx = userBookings.findIndex((b) => b.bookingRef === ref);
  if (idx !== -1) {
    userBookings[idx] = { ...userBookings[idx], status };
    writeJSON(BOOKINGS_KEY, userBookings);
  } else {
    // Seed booking — record an override so we never mutate the shipped JSON.
    const overrides = getStatusOverrides();
    overrides[ref] = status as string;
    writeJSON(OVERRIDES_KEY, overrides);
  }
  emitChange();
}

export function cancelBooking(ref: string): void {
  setBookingStatus(ref, BookingStatus.Cancelled);
}
