"use client";

import { useCallback, useState } from "react";
import { CalendarHeader } from "@/components/calendar-header";
import { CalendarGrid } from "@/components/calendar-grid";
import { EventDialog } from "@/components/event-dialog";
import { useEvents } from "@/hooks/use-events";
import type { DayInfo } from "@/lib/lunar";

export default function Home() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const { events, add, update, remove, getForDate } = useEvents();

  const goToPrevMonth = useCallback(() => {
    setMonth((m) => {
      if (m === 1) {
        setYear((y) => y - 1);
        return 12;
      }
      return m - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setMonth((m) => {
      if (m === 12) {
        setYear((y) => y + 1);
        return 1;
      }
      return m + 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    const d = new Date();
    setMonth(d.getMonth() + 1);
    setYear(d.getFullYear());
  }, []);

  return (
    <div className="flex min-h-svh items-start justify-center bg-background pt-6 pb-12 sm:pt-12">
      <main className="w-full max-w-md mx-auto px-4 flex flex-col gap-4">
        <CalendarHeader
          month={month}
          year={year}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
        />
        <CalendarGrid
          month={month}
          year={year}
          events={events}
          onDayClick={setSelectedDay}
        />
        <EventDialog
          day={selectedDay}
          events={selectedDay ? getForDate(selectedDay.dateKey) : []}
          open={selectedDay !== null}
          onClose={() => setSelectedDay(null)}
          onAdd={add}
          onUpdate={update}
          onDelete={remove}
        />
      </main>
    </div>
  );
}
