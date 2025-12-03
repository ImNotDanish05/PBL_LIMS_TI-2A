import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TestTube2 } from "lucide-react";

export default function SampleSelector({ samples, selectedSampleId, onSampleChange }) {
    return (
        <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="text-2xl font-bold text-primary-hijauTua flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                        <TestTube2 className="w-5 h-5 text-white" />
                    </div>
                    Pilih Sample
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Select
                    value={selectedSampleId}
                    onValueChange={onSampleChange}
                >
                    <SelectTrigger className="w-full h-12 text-base border-2 border-slate-200 hover:border-teal-500 transition-colors">
                        <SelectValue placeholder="Pilih sample..." />
                    </SelectTrigger>
                    <SelectContent>
                        {samples.map((sample, index) => (
                            <SelectItem
                                key={sample.id}
                                value={sample.id.toString()}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-hijauTua flex items-center justify-center text-white font-semibold text-sm">
                                        {index + 1}
                                    </div>
                                    <span className="font-medium">
                                        {sample.name}
                                    </span>
                                    <Badge variant="success">
                                        {sample.sample_categories.name}
                                    </Badge>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
}