"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/lib/events";

const DOT_COLORS: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
};

interface EventListProps {
  events: CalendarEvent[];
  onDelete: (eventId: string) => void;
  onEdit: (event: CalendarEvent) => void;
}

export function EventList({ events, onDelete, onEdit }: EventListProps) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        Chưa có sự kiện
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex items-start gap-2 rounded-md border px-3 py-2 group cursor-pointer hover:bg-accent/40 transition-colors"
          onClick={() => onEdit(event)}
        >
          <span
            className={cn(
              "mt-1.5 h-2 w-2 shrink-0 rounded-full",
              DOT_COLORS[event.color] || "bg-primary"
            )}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-tight truncate">
              {event.title}
            </p>
            {event.note && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {event.note}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}
