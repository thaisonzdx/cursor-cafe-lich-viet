"use client";

import { useMemo } from "react";
import { DayCell } from "@/components/day-cell";
import {
  getMonthDays,
  getNextMonthLeadingDays,
  getPrevMonthTrailingDays,
  type DayInfo,
} from "@/lib/lunar";
import type { CalendarEvent } from "@/lib/events";

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

interface CalendarGridProps {
  month: number;
  year: number;
  events: Record<string, CalendarEvent[]>;
  onDayClick: (day: DayInfo) => void;
}

export function CalendarGrid({
  month,
  year,
  events,
  onDayClick,
}: CalendarGridProps) {
  const today = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  const { prevDays, currentDays, nextDays } = useMemo(() => {
    const prev = getPrevMonthTrailingDays(month, year);
    const current = getMonthDays(month, year);
    const next = getNextMonthLeadingDays(month, year, prev.length + current.length);
    return { prevDays: prev, currentDays: current, nextDays: next };
  }, [month, year]);

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-7 gap-0">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="flex items-center justify-center py-2 text-xs font-medium text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0">
        {prevDays.map((day) => (
          <DayCell
            key={day.dateKey}
            day={day}
            isCurrentMonth={false}
            isToday={day.dateKey === today}
            events={events[day.dateKey] || []}
            onClick={() => onDayClick(day)}
          />
        ))}
        {currentDays.map((day) => (
          <DayCell
            key={day.dateKey}
            day={day}
            isCurrentMonth={true}
            isToday={day.dateKey === today}
            events={events[day.dateKey] || []}
            onClick={() => onDayClick(day)}
          />
        ))}
        {nextDays.map((day) => (
          <DayCell
            key={day.dateKey}
            day={day}
            isCurrentMonth={false}
            isToday={day.dateKey === today}
            events={events[day.dateKey] || []}
            onClick={() => onDayClick(day)}
          />
        ))}
      </div>
    </div>
  );
}
