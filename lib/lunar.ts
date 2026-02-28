import { LunarCalendar } from "@dqcai/vn-lunar";

export interface DayInfo {
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  lunarLeap: boolean;
  yearCanChi: string;
  monthCanChi: string;
  dayCanChi: string;
  dayOfWeek: string;
  dateKey: string;
}

export function getDayInfo(
  day: number,
  month: number,
  year: number
): DayInfo {
  const cal = LunarCalendar.fromSolar(day, month, year);
  const lunar = cal.lunarDate;

  return {
    solarDay: day,
    solarMonth: month,
    solarYear: year,
    lunarDay: lunar.day,
    lunarMonth: lunar.month,
    lunarYear: lunar.year,
    lunarLeap: lunar.leap,
    yearCanChi: cal.yearCanChi,
    monthCanChi: cal.monthCanChi,
    dayCanChi: cal.dayCanChi,
    dayOfWeek: cal.dayOfWeek,
    dateKey: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
  };
}

export function getMonthDays(month: number, year: number): DayInfo[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  const days: DayInfo[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(getDayInfo(d, month, year));
  }
  return days;
}

export function getFirstDayOfWeek(month: number, year: number): number {
  return new Date(year, month - 1, 1).getDay();
}

export function getPrevMonthTrailingDays(
  month: number,
  year: number
): DayInfo[] {
  const firstDay = getFirstDayOfWeek(month, year);
  const startDay = firstDay === 0 ? 6 : firstDay - 1; // Monday-based
  if (startDay === 0) return [];

  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();

  const days: DayInfo[] = [];
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(getDayInfo(daysInPrevMonth - i, prevMonth, prevYear));
  }
  return days;
}

export function getNextMonthLeadingDays(
  month: number,
  year: number,
  totalCellsSoFar: number
): DayInfo[] {
  const totalCells = totalCellsSoFar <= 35 ? 35 : 42;
  const remaining = totalCells - totalCellsSoFar;
  if (remaining <= 0) return [];

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const days: DayInfo[] = [];
  for (let d = 1; d <= remaining; d++) {
    days.push(getDayInfo(d, nextMonth, nextYear));
  }
  return days;
}

export function formatLunarDate(day: DayInfo): string {
  if (day.lunarDay === 1) {
    return `${day.lunarDay}/${day.lunarMonth}`;
  }
  return String(day.lunarDay);
}
