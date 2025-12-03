import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Link2,
    TestTube,
    Microscope,
    Clock,
    Calendar,
} from "lucide-react";

export default function MethodInfoCard({ method }) {
    return (
        <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="bg-primary-hijauTua text-white rounded-t-2xl">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                        <Microscope className="w-5 h-5" />
                    </div>
                    Metode Uji
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <FileText className="w-4 h-4" />
                        <span>Nama Metode</span>
                    </div>
                    <p className="font-bold text-primary-hijauTua text-lg">
                        {method.name}
                    </p>
                </div>

                <div className="space-y-2 col-span-2">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Link2 className="w-4 h-4" />
                        <span>Referensi</span>
                    </div>
                    <p className="font-bold text-primary-hijauTua">
                        {method.reference_standards.name}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Durasi</span>
                    </div>
                    <Badge variant="info">
                        {method.duration}
                    </Badge>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Masa Berlaku</span>
                    </div>
                    <Badge variant="success">
                        {method.validity_period}
                    </Badge>
                </div>

                <div className="space-y-2 col-span-2">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <TestTube className="w-4 h-4" />
                        <span>Parameter Terkait</span>
                    </div>
                    <p className="font-bold text-primary-hijauTua">
                        {method.applicable_parameter}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}