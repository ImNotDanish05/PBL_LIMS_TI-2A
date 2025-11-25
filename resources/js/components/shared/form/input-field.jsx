import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputField({
    id,
    name,
    type = "text",
    label,
    icon: Icon,
    value,
    onChange,
    onKeyPress,
    error,
    placeholder,
    rightIcon,
    onRightIconClick,
    showRightIconButton = false,
    readOnly = false,
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-sm font-medium text-primary-hijauTua">
                {label}
            </Label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                )}
                <Input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    readOnly={readOnly}
                    className={`pl-10 ${
                        showRightIconButton ? "pr-10" : ""
                    } h-12 font-semibold text-[#024D60] focus:outline-none !border-primary-hijauMuda ${
                        error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-2"
                    }`}
                    style={{
                        "--tw-ring-color": error ? "#ef4444" : "#2CACAD",
                    }}
                />
                {showRightIconButton && (
                    <button
                        type="button"
                        onClick={onRightIconClick}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {rightIcon}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-sm font-semibold text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}
