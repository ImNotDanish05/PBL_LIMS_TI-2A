"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ label = "Pilih Tanggal", value, onChange }) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date) => {
    onChange?.(date);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="px-1">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between font-normal text-left"
            onClick={() => setOpen(!open)}
          >
            {value ? new Date(value).toLocaleDateString() : "Pilih tanggal"}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}