import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Check, Award, GraduationCap } from "lucide-react";

export default function AnalystTeamCard({ analysts }) {
    return (
        <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    Tim Analis
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-4">
                    {analysts.map((analyst, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 p-5 border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-500"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg">
                                            <User className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-primary-hijauTua mb-1">
                                            {analyst.users.name}
                                        </h4>
                                        <p className="text-sm text-slate-600 font-medium">
                                            {analyst.name}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {analyst.users.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-3 border-t border-slate-200">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Spesialisasi</p>
                                        <Badge variant="received">
                                            {analyst.specialist}
                                        </Badge>
                                    </div>
                                </div>

                                {analyst.certificates.length > 0 && (
                                    <div className="pt-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Award className="w-4 h-4 text-teal-600" />
                                            <p className="text-xs text-slate-500 font-semibold">Sertifikasi</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {analyst.certificates.map((cert, idx) => (
                                                <Badge key={idx} variant="success">
                                                    {cert.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {analyst.trainings.length > 0 && (
                                    <div className="pt-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <GraduationCap className="w-4 h-4 text-teal-600" />
                                            <p className="text-xs text-slate-500 font-semibold">Pelatihan</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {analyst.trainings.map((training, idx) => (
                                                <Badge key={idx} variant="info">
                                                    {training.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}