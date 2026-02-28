"use client";

import {
  Sparkles,
  Gift,
  Lamp,
  Cookie,
  Landmark,
  Flower2,
  Wheat,
  Heart,
  Moon,
  Fish,
  PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatLunarDate, type DayInfo } from "@/lib/lunar";
import { getHolidayForLunarDate } from "@/lib/holidays";
import type { CalendarEvent } from "@/lib/events";

interface DayCellProps {
  day: DayInfo;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
  onClick: () => void;
}

const DOT_COLORS: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
};

const HOLIDAY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Gift,
  Lamp,
  Cookie,
  Landmark,
  Flower2,
  Wheat,
  Heart,
  Moon,
  Fish,
  PartyPopper,
};

export function DayCell({
  day,
  isCurrentMonth,
  isToday,
  events,
  onClick,
}: DayCellProps) {
  const holiday = getHolidayForLunarDate(
    day.lunarMonth,
    day.lunarDay,
    day.lunarLeap
  );
  const lunarText = formatLunarDate(day);
  const isFirstLunarDay = day.lunarDay === 1;
  const HolidayIcon = holiday ? HOLIDAY_ICONS[holiday.icon] : null;

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center gap-0.5 rounded-lg p-1 transition-colors min-h-14 sm:min-h-16",
        "hover:bg-accent/60",
        !isCurrentMonth && "opacity-30",
        isToday && "bg-today text-today-foreground hover:bg-today/90"
      )}
    >
      <span
        className={cn(
          "text-sm font-medium leading-none",
          isToday && "font-bold"
        )}
      >
        {day.solarDay}
      </span>

      {HolidayIcon ? (
        <HolidayIcon
          className={cn(
            "h-3 w-3",
            isToday ? "text-today-foreground/80" : "text-holiday"
          )}
        />
      ) : (
        <span
          className={cn(
            "text-[10px] leading-none",
            isToday
              ? "text-today-foreground/80"
              : isFirstLunarDay
                ? "text-primary font-medium"
                : "text-lunar"
          )}
        >
          {lunarText}
        </span>
      )}

      {events.length > 0 && (
        <div className="flex gap-0.5 absolute bottom-0.5">
          {events.slice(0, 3).map((e) => (
            <span
              key={e.id}
              className={cn(
                "h-1 w-1 rounded-full",
                DOT_COLORS[e.color] || "bg-primary"
              )}
            />
          ))}
        </div>
      )}
    </button>
  );
}
