import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

export default function UploadField({
    id,
    name,
    label,
    icon: Icon = Upload,
    onChange,
    error,
    placeholder = "Choose a file or drag it here",
    accept,
    multiple = false,
    maxSize,
    value,
    onClear,
}) {
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            if (maxSize) {
                const oversizedFiles = Array.from(files).filter(
                    (file) => file.size > maxSize
                );
                if (oversizedFiles.length > 0) {
                    if (onChange) {
                        onChange(null, `File size must be less than ${maxSize / 1024 / 1024}MB`);
                    }
                    return;
                }
            }
            if (onChange) {
                onChange(multiple ? files : files[0]);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const input = document.getElementById(id);
            input.files = files;
            handleFileChange({ target: { files } });
        }
    };

    const getFileName = () => {
        if (!value) return null;

        if (value instanceof FileList) {
            return Array.from(value).map((f) => f.name).join(", ");
        }
        if (value instanceof File) {
            return value.name;
        }

        if (typeof value === 'string') {
            const parts = value.split('/');
            return parts[parts.length - 1] || value;
        }

        if (typeof value === 'object' && value.name) {
            return value.name;
        }

        return null;
    };

    const fileName = getFileName();

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-sm font-medium text-primary-hijauTua">
                {label}
            </Label>
            <div className="relative">
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`relative flex items-center h-12 border rounded-md transition-colors ${error
                            ? "border-red-500 bg-red-50"
                            : "border-primary-hijauMuda bg-white hover:bg-gray-50"
                        }`}
                >
                    <input
                        id={id}
                        name={name}
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center w-full px-3">
                        <Icon className="text-gray-400 w-5 h-5 flex-shrink-0" />
                        <span
                            className={`ml-3 font-semibold text-sm flex-1 truncate ${fileName ? "text-[#024D60]" : "text-gray-500"
                                }`}
                        >
                            {fileName || placeholder}
                        </span>
                        {fileName && onClear && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const input = document.getElementById(id);
                                    input.value = "";
                                    onClear();
                                }}
                                className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {error && (
                <p className="text-sm font-semibold text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}