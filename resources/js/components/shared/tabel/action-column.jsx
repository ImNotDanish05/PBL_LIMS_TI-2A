import { Button } from "@/components/ui/button";
import { List, SquarePen, Trash } from "lucide-react";

export default function ActionColumn({
    onDetail = null,
    onEdit,
    onDelete,
    row,
}) {
    return (
        <div className="flex gap-2">
            {onDetail && (
                <Button
                    className="group relative w-fit p-0 overflow-hidden transition-all duration-300 hover:scale-110"
                    variant="ghost"
                    onClick={() => onDetail?.(row)}
                >
                    <div className="bg-teal-50 group-hover:from-red-100 group-hover:to-teal-100 p-2 rounded-lg transition-all duration-300">
                        <List className="w-4 h-4 text-teal-800 group-hover:text-teal-900 transition-colors duration-300 group-hover:scale-110" />
                    </div>
                </Button>
            )}

            <Button
                className="group relative w-fit p-0 overflow-hidden transition-all duration-300 hover:rotate-12"
                variant="ghost"
                onClick={() => onEdit?.(row)}
            >
                <div className="bg-blue-50 group-hover:from-blue-100 group-hover:to-blue-100 p-2 rounded-lg transition-all duration-300">
                    <SquarePen className="w-4 h-4 text-blue-600 group-hover:text-blue-600 transition-colors duration-300 group-hover:scale-110" />
                </div>
            </Button>
            <Button
                className="group relative w-fit p-0 overflow-hidden transition-all duration-300 hover:scale-110"
                variant="ghost"
                onClick={() => onDelete?.(row)}
            >
                <div className="bg-red-50 group-hover:from-red-100 group-hover:to-rose-100 p-2 rounded-lg transition-all duration-300">
                    <Trash className="w-4 h-4 text-red-600 group-hover:text-rose-600 transition-colors duration-300 group-hover:scale-110" />
                </div>
            </Button>
        </div>
    );
}
