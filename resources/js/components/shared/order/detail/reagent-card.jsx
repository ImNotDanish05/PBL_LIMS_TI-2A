import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical } from "lucide-react";

export default function ReagentCard({ reagents }) {
    return (
        <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                        <FlaskConical className="w-5 h-5 text-white" />
                    </div>
                    Reagen
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                {reagents.map((reagent, index) => (
                    <div
                        key={index}
                        className="bg-primary-hijauTerang rounded-xl p-4 border border-slate-200"
                    >
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Nama Reagen</p>
                                    <p className="font-bold text-primary-hijauTua">{reagent.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Formula</p>
                                    <p className="font-semibold text-primary-hijauTua">{reagent.formula}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Grade</p>
                                    <Badge className="bg-amber-100/70 border border-amber-500 text-amber-800 hover:bg-amber-100">
                                        Grade {reagent.grades.name}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Batch Number</p>
                                    <p className="font-semibold text-primary-hijauTua">{reagent.batch_number}</p>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-slate-200">
                                <p className="text-xs text-slate-500 mb-1">Lokasi Penyimpanan</p>
                                <p className="font-semibold text-primary-hijauTua">{reagent.storage_location}</p>
                            </div>
                            <div className="pt-2 border-t border-slate-200">
                                <p className="text-xs text-slate-500 mb-2">Supplier</p>
                                <div className="bg-white rounded-lg p-3 space-y-2">
                                    <p className="font-bold text-primary-hijauTua">{reagent.suppliers.name}</p>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <p className="text-xs text-slate-500">Kontak</p>
                                            <p className="font-semibold text-primary-hijauTua">
                                                {reagent.suppliers.contact_person}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Telepon</p>
                                            <p className="font-semibold text-primary-hijauTua">
                                                {reagent.suppliers.phone_number}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Alamat</p>
                                        <p className="text-sm text-slate-600">
                                            {reagent.suppliers.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}