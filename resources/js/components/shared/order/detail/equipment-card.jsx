import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import {
    getEquipmentStatusVariant,
    getEquipmentStatusLabel,
} from "@/utils/statusUtils";
import { formatDate } from "@/utils/formatters";

export default function EquipmentCard({ equipments }) {
    return (
        <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                        <Settings className="w-5 h-5 text-white" />
                    </div>
                    Peralatan
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                {equipments.map((equipment, index) => (
                    <div
                        key={index}
                        className="bg-primary-hijauTerang rounded-xl p-4 border border-slate-200"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Nama Alat</p>
                                <p className="font-bold text-primary-hijauTua">{equipment.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Serial Number</p>
                                <p className="font-semibold text-primary-hijauTua">{equipment.serial_number}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Tipe</p>
                                <Badge variant="received">
                                    {equipment.brand_types.name}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Status</p>
                                <Badge variant={getEquipmentStatusVariant(equipment.status)} className="capitalize">
                                    {getEquipmentStatusLabel(equipment.status)}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Tahun Beli</p>
                                <p className="font-semibold text-primary-hijauTua">{equipment.purchase_year}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Lokasi</p>
                                <p className="font-semibold text-primary-hijauTua">{equipment.location}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs text-slate-500 mb-1">Jadwal Kalibrasi</p>
                                <p className="font-semibold text-primary-hijauTua">
                                    {formatDate(equipment.calibration_schedule)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}