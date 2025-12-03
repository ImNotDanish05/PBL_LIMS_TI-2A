import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function NotesCard({ notes, resultValue }) {
    return (
        <Card className="shadow-2xl bg-primary-hijauTua text-white">
            <CardHeader className="border-b border-white border-opacity-20">
                <CardTitle className="flex items-center gap-3">
                    <FileText className="w-6 h-6" />
                    Catatan & Hasil
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div>
                    <p className="text-sm text-primary-hijauTerang mb-2">Hasil Nilai Akhir</p>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
                        <p className="text-2xl font-bold">{resultValue}</p>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-primary-hijauTerang mb-2">Catatan</p>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-30">
                        <p className="text-sm leading-relaxed">{notes}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}