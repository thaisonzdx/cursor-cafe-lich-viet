"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { LunarCalendar } from "@dqcai/vn-lunar";

const MONTH_NAMES = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
  "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
  "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

interface CalendarHeaderProps {
  month: number;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export function CalendarHeader({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  const cal = LunarCalendar.fromSolar(15, month, year);

  return (
    <header className="flex flex-col gap-3 px-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="text-lg font-semibold tracking-tight">Lịch Việt</h1>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onToday} className="text-xs h-7 px-2">
            Hôm nay
          </Button>
          <AnimatedThemeToggler />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onPrevMonth} className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <div className="text-base font-medium">
            {MONTH_NAMES[month - 1]} {year}
          </div>
          <div className="text-xs text-muted-foreground">
            Năm {cal.yearCanChi}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onNextMonth} className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
