"use client";

import { useCallback, useEffect, useState } from "react";
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
  Plus,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { EventList } from "@/components/event-list";
import { cn } from "@/lib/utils";
import { type DayInfo } from "@/lib/lunar";
import { getHolidayForLunarDate } from "@/lib/holidays";
import { EVENT_COLORS, type CalendarEvent, type EventColor } from "@/lib/events";

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

interface EventDialogProps {
  day: DayInfo | null;
  events: CalendarEvent[];
  open: boolean;
  onClose: () => void;
  onAdd: (event: Omit<CalendarEvent, "id">) => void;
  onUpdate: (event: CalendarEvent) => void;
  onDelete: (dateKey: string, eventId: string) => void;
}

export function EventDialog({
  day,
  events,
  open,
  onClose,
  onAdd,
  onUpdate,
  onDelete,
}: EventDialogProps) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CalendarEvent | null>(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [color, setColor] = useState<EventColor>("blue");

  const resetForm = useCallback(() => {
    setTitle("");
    setNote("");
    setColor("blue");
    setEditing(null);
    setShowForm(false);
  }, []);

  useEffect(() => {
    if (!open) resetForm();
  }, [open, resetForm]);

  if (!day) return null;

  const holiday = getHolidayForLunarDate(
    day.lunarMonth,
    day.lunarDay,
    day.lunarLeap
  );
  const HolidayIcon = holiday ? HOLIDAY_ICONS[holiday.icon] : null;

  const handleSubmit = () => {
    if (!title.trim()) return;
    if (editing) {
      onUpdate({ ...editing, title: title.trim(), note: note.trim(), color });
    } else {
      onAdd({
        title: title.trim(),
        date: day.dateKey,
        note: note.trim(),
        color,
      });
    }
    resetForm();
  };

  const handleEdit = (event: CalendarEvent) => {
    setEditing(event);
    setTitle(event.title);
    setNote(event.note);
    setColor(event.color as EventColor);
    setShowForm(true);
  };

  const handleDelete = (eventId: string) => {
    onDelete(day.dateKey, eventId);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[380px] gap-3">
        <DialogHeader className="pb-0">
          <DialogTitle className="text-base font-semibold">
            {day.solarDay}/{day.solarMonth}/{day.solarYear}
          </DialogTitle>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
            <span>
              Âm lịch: {day.lunarDay}/{day.lunarMonth}
              {day.lunarLeap ? " (nhuận)" : ""}
            </span>
            <span>{day.dayCanChi}</span>
          </div>
          {holiday && HolidayIcon && (
            <div className="flex items-center gap-1 text-xs font-medium text-holiday mt-0.5">
              <HolidayIcon className="h-3.5 w-3.5" />
              {holiday.name}
            </div>
          )}
        </DialogHeader>

        <Separator />

        <EventList
          events={events}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {showForm ? (
          <div className="flex flex-col gap-3 pt-1">
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {editing ? "Sửa sự kiện" : "Thêm sự kiện"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={resetForm}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <Label htmlFor="event-title" className="text-xs mb-1">
                  Tiêu đề
                </Label>
                <Input
                  id="event-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Nhập tiêu đề..."
                  className="h-8 text-sm"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
              <div>
                <Label htmlFor="event-note" className="text-xs mb-1">
                  Ghi chú
                </Label>
                <Textarea
                  id="event-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ghi chú..."
                  className="text-sm min-h-[60px] resize-none"
                />
              </div>
              <div>
                <Label className="text-xs mb-1">Màu</Label>
                <div className="flex gap-1.5 mt-1">
                  {EVENT_COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={cn(
                        "h-5 w-5 rounded-full transition-all",
                        c.class,
                        color === c.value
                          ? "ring-2 ring-offset-2 ring-ring"
                          : "opacity-60 hover:opacity-100"
                      )}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!title.trim()}
                className="mt-1"
              >
                {editing ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowForm(true)}
            className="w-full"
          >
            <Plus className="h-3 w-3 mr-1" />
            Thêm sự kiện
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
