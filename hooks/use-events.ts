"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
  type CalendarEvent,
} from "@/lib/events";

export function useEvents() {
  const [events, setEvents] = useState<Record<string, CalendarEvent[]>>({});

  const refresh = useCallback(() => {
    setEvents(getAllEvents());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(
    (event: Omit<CalendarEvent, "id">) => {
      addEvent(event);
      refresh();
    },
    [refresh]
  );

  const update = useCallback(
    (event: CalendarEvent) => {
      updateEvent(event);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (dateKey: string, eventId: string) => {
      deleteEvent(dateKey, eventId);
      refresh();
    },
    [refresh]
  );

  const getForDate = useCallback(
    (dateKey: string): CalendarEvent[] => {
      return events[dateKey] || [];
    },
    [events]
  );

  return { events, add, update, remove, getForDate };
}
