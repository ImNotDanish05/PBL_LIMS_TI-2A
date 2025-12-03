import React from "react";
import { Search, ListFilter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SearchFilter({
    showSearch,
    showFilter,
    showCreate,
    onCreate,
    filterOptions = [],
    searchTerm,
    onSearchChange,
    filterValue,
    onFilterChange,
}) {
    return (
        <div className="flex items-center justify-between mb-4">
            {showSearch && (
                <div className="relative w-full max-w-sm">
                    <div className="relative flex items-center">
                        <Input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className={cn(
                                "w-full bg-white/10 backdrop-blur-md border border-primary-hijauTua/30 rounded-lg py-2.5 pl-12 pr-4 text-sm font-semibold text-primary-hijauTua placeholder:text-primary-hijauTua/60",
                                "focus:outline-none focus:ring focus:ring-primary-hijauTua/50 focus:border-primary-hijauTua/10",
                                "hover:border-primary-hijauTua/50 transition-all duration-300",
                                "shadow-sm hover:shadow-md"
                            )}
                            placeholder="Search..."
                            aria-label="Search input"
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            className={cn(
                                "absolute left-2 top-1/2 -translate-y-1/2 rounded-full",
                                "bg-transparent hover:bg-transparent text-primary-hijauTua hover:text-primary-hijauTua border-none",
                                "transition-all duration-75 ease-in",
                            )}
                            aria-label="Search"
                        >
                            <Search size={18} className="animate-pulse" />
                        </Button>
                    </div>
                </div>
            )}
            <div className="flex justify-between gap-4 items-center">
                {showFilter && (
                    <Select value={filterValue} onValueChange={onFilterChange}>
                        <SelectTrigger
                            className={cn(
                                "flex items-center gap-2 border-primary-hijauTua text-primary-hijauTua",
                                "hover:text-primary-hijauTua/60 hover:bg-primary-hijauTua/10",
                                "focus:ring-2 focus:ring-primary-hijauTua/50 w-[180px]"
                            )}
                        >
                            <ListFilter size={16} />
                            <SelectValue placeholder="Select filter" />
                        </SelectTrigger>
                        <SelectContent className="text-primary-hijauTua font-medium shadow-lg">
                            {filterOptions.map((option, index) => (
                                <SelectItem
                                    key={index}
                                    value={option.value}
                                    className="focus:bg-primary-hijauMuda focus:text-white cursor-pointer"
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>

                    </Select>
                )}
                {showCreate && (
                    <Button
                        onClick={onCreate}
                        className="bg-primary-hijauTua hover:bg-primary-hijauTua/90"
                    >
                        <PlusCircle size={18} className="mr-2" />
                        Tambah Data
                    </Button>
                )}
            </div>
        </div>
    );
}
