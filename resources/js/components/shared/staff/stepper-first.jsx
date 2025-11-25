import React from "react";
import { Check, Edit, FileCheck } from "lucide-react";

const steps = [
    { number: 1, name: "Klien & Order", icon: Edit },
    { number: 2, name: "Uji & Metode", icon: FileCheck },
    { number: 3, name: "Konfirmasi", icon: Check },
];

export default function Stepper({ currentStep = 1 }) {
    return (
        <div className="px-4 py-8 md:px-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-700 mb-2">
                Registrasi Order Baru
            </h2>
            <p className="text-sm text-gray-600 mb-10">
                Langkah {currentStep} dari {steps.length}:{" "}
                <span className="font-semibold text-teal-700">
                    {steps.find((s) => s.number === currentStep)?.name || ""}
                </span>
            </p>

            <nav aria-label="Progress">
                <ol className="flex justify-between items-center relative">
                    {steps.map((step, index) => {
                        const isCompleted = currentStep > step.number;
                        const isActive = currentStep === step.number;
                        const Icon = step.icon;

                        return (
                            <li key={step.name} className="flex-1 relative">
                                <div className="flex flex-col items-center">
                                    {/* Garis penghubung */}
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`absolute top-6 left-1/2 w-full h-[2px] z-0
                      ${isCompleted ? "bg-teal-500" : "bg-gray-300"}`}
                                        ></div>
                                    )}

                                    {/* Lingkaran Icon */}
                                    <div
                                        className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full
                    transition-all duration-300 shadow-md border
                    ${
                        isCompleted
                            ? "bg-teal-500 border-teal-500 text-white"
                            : isActive
                            ? "bg-teal-600 border-teal-600 text-white scale-110 shadow-lg"
                            : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                                    >
                                        {isCompleted ? (
                                            <Check className="w-6 h-6" />
                                        ) : (
                                            <Icon className="w-6 h-6" />
                                        )}
                                    </div>

                                    {/* Label */}
                                    <span
                                        className={`mt-3 text-center text-sm font-medium
                    ${
                        isActive
                            ? "text-teal-700 font-semibold"
                            : isCompleted
                            ? "text-gray-600"
                            : "text-gray-500"
                    }`}
                                    >
                                        {step.name}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
}
