export interface LunarHoliday {
  lunarMonth: number;
  lunarDay: number;
  name: string;
  icon: string;
}

export const LUNAR_HOLIDAYS: LunarHoliday[] = [
  { lunarMonth: 1, lunarDay: 1, name: "Tết Nguyên Đán", icon: "Sparkles" },
  { lunarMonth: 1, lunarDay: 2, name: "Mùng 2 Tết", icon: "Gift" },
  { lunarMonth: 1, lunarDay: 3, name: "Mùng 3 Tết", icon: "Gift" },
  { lunarMonth: 1, lunarDay: 15, name: "Tết Nguyên Tiêu", icon: "Lamp" },
  { lunarMonth: 3, lunarDay: 3, name: "Tết Hàn Thực", icon: "Cookie" },
  { lunarMonth: 3, lunarDay: 10, name: "Giỗ Tổ Hùng Vương", icon: "Landmark" },
  { lunarMonth: 4, lunarDay: 15, name: "Lễ Phật Đản", icon: "Flower2" },
  { lunarMonth: 5, lunarDay: 5, name: "Tết Đoan Ngọ", icon: "Wheat" },
  { lunarMonth: 7, lunarDay: 15, name: "Vu Lan", icon: "Heart" },
  { lunarMonth: 8, lunarDay: 15, name: "Tết Trung Thu", icon: "Moon" },
  { lunarMonth: 12, lunarDay: 23, name: "Ông Táo", icon: "Fish" },
  { lunarMonth: 12, lunarDay: 30, name: "Giao Thừa", icon: "PartyPopper" },
];

export function getHolidayForLunarDate(
  lunarMonth: number,
  lunarDay: number,
  lunarLeap: boolean
): LunarHoliday | undefined {
  if (lunarLeap) return undefined;
  return LUNAR_HOLIDAYS.find(
    (h) => h.lunarMonth === lunarMonth && h.lunarDay === lunarDay
  );
}
