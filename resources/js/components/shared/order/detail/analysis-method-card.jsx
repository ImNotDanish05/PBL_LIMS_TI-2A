import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Microscope } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

export default function AnalysisMethodCard({ methods }) {
    return (
        <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                        <Microscope className="w-5 h-5 text-white" />
                    </div>
                    Metode Analisis
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                {methods.map((method, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 mb-1">Metode {idx + 1}</p>
                                <p className="font-bold text-slate-900 text-lg">{method.analyses_method}</p>
                                <p className="text-sm text-slate-600 mt-2">{method.pivot.description}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 mb-1">Harga</p>
                                <p className="font-bold text-teal-700 text-xl">{formatCurrency(method.pivot.price)}</p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="bg-primary-hijauTerang rounded-xl p-4 border-2 border-primary-hijauMuda">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">Total Biaya Analisis</span>
                        <span className="font-bold text-teal-700 text-2xl">
                            {formatCurrency(methods.reduce((sum, m) => sum + m.pivot.price, 0))}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}