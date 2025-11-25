import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function DetailDialog({
    isOpen,
    onOpenChange,
    title,
    description,
    fields = [],
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
                <div className="bg-primary-hijauTua/20 px-6 py-5 border-b">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold bg-primary-hijauTua bg-clip-text text-transparent">
                            {title}
                        </DialogTitle>
                        {description && (
                            <DialogDescription className="mt-2 text-gray-600 font-medium">
                                {description}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                </div>

                <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
                    {fields.map((field, index) => (
                        <div
                            key={index}
                            className="group flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
                        >
                            <div className="flex-shrink-0 w-32">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    {field.label}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                {field.badge ? (
                                    <Badge
                                        variant={field.variant || "default"}
                                        className="shadow-sm"
                                    >
                                        {field.value}
                                    </Badge>
                                ) : (
                                    <span
                                        className={`text-sm ${field.bold
                                                ? "font-extrabold text-gray-900"
                                                : "text-gray-700 font-medium"
                                            } break-words`}
                                    >
                                        {field.value || (
                                            <span className="text-gray-400 italic">
                                                No data
                                            </span>
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}