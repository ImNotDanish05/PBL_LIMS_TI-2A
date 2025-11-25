import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function DetailSheet({
    open,
    onOpenChange,
    title,
    description,
    fields = [],
    className = "sm:max-w-lg",
}) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className={`p-0 ${className} bg-gradient-to-b from-white to-primary-hijauTerang`}>
                <div className="relative px-6 py-6 bg-primary-hijauTua text-white">
                    <SheetHeader className="relative">
                        <SheetTitle className="text-2xl font-bold tracking-tight text-white">
                            {title}
                        </SheetTitle>
                        {description && (
                            <SheetDescription className="mt-2 text-[#DDFFF9] font-medium text-base">
                                {description}
                            </SheetDescription>
                        )}
                    </SheetHeader>
                </div>

                <div className="px-6 py-6 space-y-3 max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary-hijauMuda scrollbar-track-primto-primary-hijauTerang">
                    {fields.map((field, index) => (
                        <div
                            key={index}
                            className="group relative flex items-start gap-5 p-4 rounded-xl bg-white border border-[#DDFFF9] hover:border-primary-hijauMuda hover:shadow-lg hover:shadow-primary-hijauMuda/10 transition-all duration-300 ease-out"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primto-primary-hijauTerang to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>

                            <div className="relative flex-shrink-0 w-36">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-6 bg-primary-hijauTua rounded-full"></div>
                                    <span className="text-xs font-bold text-primary-hijauTua uppercase tracking-wider w-32">
                                        {field.label}
                                    </span>
                                </div>
                            </div>

                            <div className="relative flex-1 min-w-0 pt-0.5">
                                {field.badge ? (
                                    <Badge
                                        variant={field.variant || "default"}
                                        className="capitalize"
                                    >
                                        {field.value}
                                    </Badge>
                                ) : (
                                    <span
                                        className={`text-sm leading-relaxed ${field.bold
                                            ? "font-bold text-primary-hijauTua text-base"
                                            : "text-gray-700 font-medium"
                                            } break-words`}
                                    >
                                        {field.value || (
                                            <span className="text-gray-400 italic flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                </svg>
                                                No data
                                            </span>
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-hijauTua via-primary-hijauMuda to-primary-hijauTua"></div>
            </SheetContent>
        </Sheet>
    );
}