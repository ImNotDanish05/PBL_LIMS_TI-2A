import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Package,
    Check,
    TestTube,
    Beaker,
    AlertCircle,
} from "lucide-react";
import { getConditionTypeLabel, getConditionTypeVariant, getOrderStatusLabel, getOrderStatusVariant, getSampleStatusVariant, getStatusParameterLabel } from "@/utils/statusUtils";

export default function SampleInfoCard({ sample }) {
    return (
        <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                        <TestTube className="w-5 h-5 text-white" />
                    </div>
                    Informasi Sample
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                            <Package className="w-4 h-4" />
                            Nama Sample
                        </div>
                        <p className="font-bold text-slate-900 text-lg">{sample.name}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                            <FileText className="w-4 h-4" />
                            Kategori
                        </div>
                        <Badge variant="info">{sample.sample_categories.name}</Badge>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                            <Beaker className="w-4 h-4" />
                            Bentuk
                        </div>
                        <p className="font-semibold text-slate-900 capitalize">{sample.form}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                            <Check className="w-4 h-4" />
                            Kondisi
                        </div>
                        <Badge variant={getConditionTypeVariant(sample.condition)}>{getConditionTypeLabel(sample.condition)}</Badge>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                            <TestTube className="w-4 h-4" />
                            Volume
                        </div>
                        <p className="font-semibold text-slate-900">{sample.pivot.sample_volume}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                            <AlertCircle className="w-4 h-4" />
                            Status
                        </div>
                        <Badge variant={getOrderStatusVariant(sample.status)}>{getOrderStatusLabel(sample.status)}</Badge>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                    <div>
                        <p className="text-sm text-slate-500 mb-2">Metode Pengawetan</p>
                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                            <p className="text-slate-900 font-medium">{sample.preservation_method}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500 mb-2">Kondisi Penyimpanan</p>
                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                            <p className="text-slate-900 font-medium">{sample.storage_condition}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
