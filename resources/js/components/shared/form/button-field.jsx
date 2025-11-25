import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils"; // assuming you have a cn utility (class-variance-authority or clsx + tailwind-merge)

export default function ButtonField({
    id,
    title,
    label = "Tambah",
    data = [],
    onClick,
    onRemove,
}) {
    return (
        <div className="space-y-6">
            <div key={id} className="flex flex-col gap-2">
                <Label htmlFor={id} className="text-sm font-medium text-primary-hijauTua">
                    {title}
                </Label>
                <Button
                    className="bg-primary-hijauTua text-white font-semibold hover:bg-primary-hijauTua/80 transition-all ease-in duration-300 w-fit"
                    onClick={onClick}
                >
                    {label}
                </Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-900/5 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 tracking-wide">
                        Daftar {title} yang dipilih ({data.length})
                    </h3>
                </div>

                <div className="p-6 min-h-56 bg-gradient-to-b from-white to-gray-50/30">
                    {data && data.length > 0 ? (
                        <div className="space-y-3 overflow-y-auto max-h-56">
                            {data.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "group flex items-center justify-between p-4 rounded-xl",
                                        "bg-white border border-gray-200/80 hover:border-emerald-300",
                                        "shadow-sm hover:shadow-md transition-all duration-300",
                                        "hover:-translate-y-0.5"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                                            {index + 1}
                                        </span>
                                        <span className="font-medium text-gray-800">{item.name}</span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => onRemove(item.id)}
                                        className={cn(
                                            "flex items-center gap-2 text-red-600 hover:text-red-700",
                                            "opacity-0 group-hover:opacity-100 transition-all duration-300",
                                            "text-sm font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg"
                                        )}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-80 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                                <Plus className="w-10 h-10 text-gray-300" />
                            </div>
                            <p className="text-gray-500 font-medium">Belum ada {title.toLowerCase()} dipilih</p>
                            <p className="text-sm text-gray-400 mt-2">
                                Klik tombol di atas untuk menambahkan
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}