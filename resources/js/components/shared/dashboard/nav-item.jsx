import { Link } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const NavItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(item.active || false);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    const Icon = item.icon;

    if (hasSubItems) {
        return (
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="space-y-1"
            >
                <CollapsibleTrigger asChild>
                    <button
                        className={cn(
                            "w-full flex items-center justify-between px-4 py-3 rounded-lg",
                            "transition-all duration-200",
                            "hover:bg-white/10",
                            isOpen
                                ? "bg-white/15 text-white shadow-md"
                                : "text-white/80"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <Icon size={20} className="shrink-0" />
                            <span className="font-medium">{item.name}</span>
                        </div>
                        {isOpen ? (
                            <ChevronDown size={18} className="shrink-0" />
                        ) : (
                            <ChevronRight size={18} className="shrink-0" />
                        )}
                    </button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <div className="ml-4 space-y-1 pt-1">
                        {item.subItems.map((subItem, index) => {
                            const SubIcon = subItem.icon;
                            return (
                                <Link
                                    key={index}
                                    href={subItem.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-lg",
                                        "transition-all duration-200",
                                        "hover:bg-white/10",
                                        subItem.active
                                            ? "bg-white/15 text-white shadow-sm border-white"
                                            : "text-white/70 hover:text-white"
                                    )}
                                >
                                    <SubIcon size={18} className="shrink-0" />
                                    <span className="text-sm font-medium">{subItem.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        );
    }

    return (
        <Link
            href={item.href}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg",
                "transition-all duration-200",
                "hover:bg-white/10",
                item.active
                    ? "bg-white/15 text-white shadow-md"
                    : "text-white/80 hover:text-white"
            )}
        >
            <Icon size={20} className="shrink-0" />
            <span className="font-medium">{item.name}</span>
        </Link>
    );
};