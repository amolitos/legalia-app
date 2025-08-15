"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange: (date?: string) => void;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Elige una fecha",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date" // Considerar que el id sea dinámico para varios pickers
          variant="outline"
          className="w-full justify-between font-normal"
        >
          {value ? (
            format(value, "PPP", { locale: es })
          ) : (
            <span className="text-neutral-400">{placeholder}</span>
          )}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          onSelect={(date) => {
            onChange(date ? format(date, "yyyy-MM-dd") : undefined);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
