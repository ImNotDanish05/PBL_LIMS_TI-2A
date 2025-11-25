import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { useState } from "react";

export default function SelectField({
    id,
    label,
    icon: Icon,
    value,
    onChange,
    options = [],
    placeholder = "Pilih opsi...",
    error
}) {
    const [open, setOpen] = useState(false);

    const selectedLabel = options.find((opt) => opt.value === value)?.label;

    return (
        <div className="space-y-2">
            {label && (
                <Label htmlFor={id} className="text-sm font-medium text-primary-hijauTua">
                    {label}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="relative">
                        {Icon && (
                            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                        )}
                        <Button
                            id={id}
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                                "w-full justify-between h-12 font-semibold text-[#024D60] focus:outline-none !border-primary-hijauMuda",
                                Icon ? "pl-10" : "pl-3",
                                "pr-10",
                                error
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-2",
                                "hover:bg-transparent"
                            )}
                            style={{
                                "--tw-ring-color": error ? "#ef4444" : "#2CACAD",
                            }}
                        >
                            <span className={cn(!selectedLabel && "text-gray-500")}>
                                {selectedLabel || placeholder}
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-[620px] p-0" align="start">
                    <Command>
                        <div className="flex items-center px-2 pt-2 border-b bg-primary-hijauMuda/5">
                            <CommandInput placeholder="Cari..." />
                        </div>
                        <CommandEmpty>Tidak ada hasil.</CommandEmpty>
                        <CommandGroup className="max-h-56 overflow-y-auto w-full">
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => {
                                        onChange(option.value);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            {error && (
                <p className="text-sm font-semibold text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}