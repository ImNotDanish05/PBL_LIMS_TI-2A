import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";
import { getSampleStatusVariant, getStatusParameterLabel } from "@/utils/statusUtils";

const ParameterMethodCard = ({ data }) => (
    <Card className="border border-slate-200 shadow-xl bg-white">
        <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                    <Gauge className="w-5 h-5 text-white" />
                </div>
                Parameter & Metode Uji
            </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
            <div>
                <h4 className="font-bold text-slate-900 mb-4 text-lg">Parameter Uji</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-slate-500 mb-1">Nama Parameter</p>
                        <p className="font-bold text-slate-900">{data.test_parameters.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 mb-1">Kategori</p>
                        <Badge variant="info" className="capitalize">{data.test_parameters.category}</Badge>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 mb-1">Detection Limit</p>
                        <p className="font-semibold text-slate-900">{data.test_parameters.detection_limit}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 mb-1">Satuan</p>
                        <Badge variant="info">{data.test_parameters.unit_values.value}</Badge>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-slate-500 mb-1">Standar Kualitas</p>
                        <p className="font-semibold text-slate-900">{data.test_parameters.quality_standard}</p>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4 text-lg">Metode Uji</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <p className="text-sm text-slate-500 mb-1">Nama Metode</p>
                        <p className="font-bold text-slate-900">{data.test_methods.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 mb-1">Durasi</p>
                        <Badge variant="info">{data.test_methods.duration} menit</Badge>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 mb-1">Masa Berlaku</p>
                        <Badge variant="info">{data.test_methods.validity_period}</Badge>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-slate-500 mb-1">Parameter Terkait</p>
                        <p className="font-semibold text-slate-900">{data.test_methods.applicable_parameter}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-slate-500 mb-1">Referensi Standar</p>
                        <p className="font-semibold text-slate-900">{data.test_methods.reference_standards.name}</p>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Hasil Pengujian</span>
                    <span className="font-bold text-blue-700 text-xl">{data.result}</span>
                </div>
                <div className="mt-2">
                    <Badge variant={getSampleStatusVariant(data.status)}>{getStatusParameterLabel(data.status)}</Badge>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default ParameterMethodCard;
