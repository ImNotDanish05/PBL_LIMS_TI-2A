import { FlaskConical } from "lucide-react";

export default function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F0FFFC]">
            <div className="w-full md:w-2/5 lg:w-1/2 bg-[#024D60] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute w-96 h-96 rounded-full opacity-10 -bottom-48 -left-48 bg-[#2CACAD]" />
                    <div className="absolute w-64 h-64 rounded-full opacity-10 top-1/4 -right-32 bg-[#2CACAD]" />
                </div>
                <div className="relative z-10 flex flex-col items-center p-8">
                    <div className="w-40 h-40 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm mb-4">
                        <FlaskConical className="w-20 h-20 text-white" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-white text-2xl font-semibold text-center mt-4">{title}</h2>
                    <p className="text-white/80 text-center mt-2 max-w-xs">{subtitle}</p>
                </div>
            </div>
            <div className="w-full md:w-3/5 lg:w-1/2 flex items-center justify-center p-8 md:p-12">
                {children}
            </div>
        </div>
    );
}