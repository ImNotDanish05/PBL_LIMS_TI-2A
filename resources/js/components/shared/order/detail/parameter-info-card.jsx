import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Link2,
    TestTube,
    Beaker,
    Gauge,
    Droplet,
} from "lucide-react";

export default function ParameterInfoCard({ parameter }) {
    return (
        <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="bg-primary-hijauTua text-white rounded-t-2xl">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                        <Gauge className="w-5 h-5" />
                    </div>
                    Parameter Uji
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <TestTube className="w-4 h-4" />
                            <span>Nama Parameter</span>
                        </div>
                        <p className="font-bold text-primary-hijauTua text-lg">
                            {parameter.name}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <FileText className="w-4 h-4" />
                            <span>Kategori</span>
                        </div>
                        <Badge variant="success" className="capitalize">
                            {parameter.category}
                        </Badge>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Beaker className="w-4 h-4" />
                            <span>Detection Limit</span>
                        </div>
                        <p className="font-bold text-primary-hijauTua">
                            {parameter.detection_limit}
                        </p>
                    </div>

                    <div className="space-y-2 col-span-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Gauge className="w-4 h-4" />
                            <span>Standar Kualitas</span>
                        </div>
                        <p className="font-bold text-primary-hijauTua">
                            {parameter.quality_standard}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Link2 className="w-4 h-4" />
                            <span>Referensi</span>
                        </div>
                        <p className="font-bold text-primary-hijauTua">
                            {parameter.reference_standards.name}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Droplet className="w-4 h-4" />
                            <span>Satuan</span>
                        </div>
                        <Badge variant="info">
                            {parameter.unit_values.value}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}