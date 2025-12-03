import { Spinner } from "./spinner";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[640px] relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-hijauTua to-primary-hijauMuda opacity-20 blur-xl animate-pulse" />

                    <div className="absolute inset-0 rounded-full border-4 border-primary-hijauMuda/20 animate-spin-slow" />

                    <Spinner className="w-12 h-12 text-primary-hijauTua relative z-10 drop-shadow-lg" />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
                            Memuat
                        </h3>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                    </div>

                    <div className="flex gap-1.5">
                        <span className="size-2 bg-primary-hijauTua rounded-full animate-bounce delay-0" />
                        <span className="size-2 bg-primary-hijauTua rounded-full animate-bounce delay-150" />
                        <span className="size-2 bg-primary-hijauTua rounded-full animate-bounce delay-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}