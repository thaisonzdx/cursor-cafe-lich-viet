export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  color: string;
  note: string;
}

const STORAGE_KEY = "lich-viet-events";

export const EVENT_COLORS = [
  { value: "red", label: "Đỏ", class: "bg-red-500" },
  { value: "blue", label: "Xanh dương", class: "bg-blue-500" },
  { value: "green", label: "Xanh lá", class: "bg-green-500" },
  { value: "yellow", label: "Vàng", class: "bg-yellow-500" },
  { value: "purple", label: "Tím", class: "bg-purple-500" },
  { value: "pink", label: "Hồng", class: "bg-pink-500" },
] as const;

export type EventColor = (typeof EVENT_COLORS)[number]["value"];

function readEvents(): Record<string, CalendarEvent[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeEvents(events: Record<string, CalendarEvent[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function getAllEvents(): Record<string, CalendarEvent[]> {
  return readEvents();
}

export function getEventsForDate(dateKey: string): CalendarEvent[] {
  return readEvents()[dateKey] || [];
}

export function addEvent(event: Omit<CalendarEvent, "id">): CalendarEvent {
  const all = readEvents();
  const newEvent: CalendarEvent = {
    ...event,
    id: crypto.randomUUID(),
  };
  if (!all[event.date]) {
    all[event.date] = [];
  }
  all[event.date].push(newEvent);
  writeEvents(all);
  return newEvent;
}

export function updateEvent(event: CalendarEvent) {
  const all = readEvents();
  const dateEvents = all[event.date];
  if (!dateEvents) return;
  const idx = dateEvents.findIndex((e) => e.id === event.id);
  if (idx !== -1) {
    dateEvents[idx] = event;
    writeEvents(all);
  }
}

export function deleteEvent(dateKey: string, eventId: string) {
  const all = readEvents();
  const dateEvents = all[dateKey];
  if (!dateEvents) return;
  all[dateKey] = dateEvents.filter((e) => e.id !== eventId);
  if (all[dateKey].length === 0) {
    delete all[dateKey];
  }
  writeEvents(all);
}
