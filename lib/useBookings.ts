"use client";

import { useSyncExternalStore } from "react";
import {
  subscribe,
  getAllBookings,
  getMyBookings,
  getBookingByRef,
  getServerBookings,
  getServerMyBookings,
} from "./store";
import type { Booking } from "./types";

/**
 * React bindings for the booking store. `useSyncExternalStore` is the
 * hydration-safe way to read browser-only state (localStorage): the server and
 * first client render use the seed snapshot, then React swaps in the live
 * client snapshot without a hydration mismatch — and without calling setState
 * inside an effect.
 */

export function useAllBookings(): Booking[] {
  return useSyncExternalStore(subscribe, getAllBookings, getServerBookings);
}

export function useMyBookings(): Booking[] {
  return useSyncExternalStore(subscribe, getMyBookings, getServerMyBookings);
}

export function useBooking(ref: string): Booking | undefined {
  return useSyncExternalStore(
    subscribe,
    () => getBookingByRef(ref),
    () => undefined
  );
}

/** True once the component has hydrated on the client. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
