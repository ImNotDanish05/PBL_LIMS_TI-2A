import { useState, useMemo } from "react";
import {
    Search,
    Filter,
    Download,
    Eye,
    Calendar,
    User,
    FileText,
    AlertCircle,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/layouts/dashboard-layout";

const initialReports = [
    {
        id: "RPT-001",
        title: "Sample Tracking Report – Batch A-102",
        type: "Sample Tracking",
        status: "completed",
        author: "Dr. Anisa Putri",
        date: "2025-11-10",
        size: "2.4 MB",
        content: "All samples from Batch A-102 have been logged, processed, and archived. No discrepancies found.",
    },
    {
        id: "RPT-002",
        title: "Test Results – River Water Analysis (Nov)",
        type: "Test Results",
        status: "pending",
        author: "Ir. Satria Nugraha",
        date: "2025-11-12",
        size: "1.8 MB",
        content: "Heavy metal analysis is in progress. pH and TSS parameters have been validated.",
    },
    {
        id: "RPT-003",
        title: "Quality Control Summary – Product F-221",
        type: "Quality Control",
        status: "completed",
        author: "Dr. Bima Pratama",
        date: "2025-11-08",
        size: "3.2 MB",
        content: "QC checks confirm product stability over 6 months. All specifications within acceptable limits.",
    },
    {
        id: "RPT-004",
        title: "Instrument Usage Log – HPLC System",
        type: "Instrument Usage",
        status: "review",
        author: "Dewi Lestari, M.Sc",
        date: "2025-11-13",
        size: "1.5 MB",
        content: "HPLC system operated for 120 hours this month. Maintenance due in 2 weeks.",
    },
    {
        id: "RPT-005",
        title: "Audit Trail – Sample ID X12",
        type: "Audit Trail",
        status: "completed",
        author: "Rudi Hermawan",
        date: "2025-11-14",
        size: "2.1 MB",
        content: "All user actions and data modifications for Sample X12 have been logged and verified.",
    },
    {
        id: "RPT-006",
        title: "Inventory Report – Reagents & Consumables (Q4)",
        type: "Inventory",
        status: "pending",
        author: "Nina Septiani",
        date: "2025-11-11",
        size: "4.5 MB",
        content: "Stock levels for critical reagents are below threshold. Reorder recommendations included.",
    }
];

export default function AdminReportsPage() {
    const [reports, setReports] = useState(initialReports);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");

    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    const reportTypes = useMemo(() => [...new Set(reports.map((r) => r.type))], [reports]);

    const filteredReports = useMemo(() => {
        return reports.filter((r) => {
            const q = searchQuery.toLowerCase();
            const matchSearch = r.title.toLowerCase().includes(q) || r.author.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
            const matchType = filterType === "all" || r.type === filterType;
            const matchStatus = filterStatus === "all" || r.status === filterStatus;
            return matchSearch && matchType && matchStatus;
        });
    }, [reports, searchQuery, filterType, filterStatus]);

    const handleViewReport = (report) => {
        setSelectedReport(report);
        setIsViewDialogOpen(true);
    };

    const handleDownloadReport = (report) => {
        setSelectedReport(report);
        setIsDownloadDialogOpen(true);
    };

    const confirmDownload = () => {
        console.log(`Downloading report: ${selectedReport.id}`);
        setIsDownloadDialogOpen(false);
    };

    return (
        <DashboardLayout title="Manajemen Laporan" header="Manajemen Laporan">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-[#024D60]">Daftar Laporan</CardTitle>
                        <CardDescription>Kelola dan pantau semua laporan yang tersedia</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari laporan, penulis, atau ID..." className="pl-10" />
                            </div>
                            <Select value={filterType} onValueChange={setFilterType}>
                                <SelectTrigger className="w-full md:w-48">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Tipe Laporan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Tipe</SelectItem>
                                    {reportTypes.map((type) => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            {filteredReports.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                                    <p className="text-lg font-medium">Tidak ada laporan ditemukan</p>
                                    <p className="text-sm">Coba ubah filter atau kata kunci pencarian</p>
                                </div>
                            ) : (
                                filteredReports.map((report) => (
                                    <Card key={report.id} className="hover:shadow-md transition-all hover:border-[#2CACAD]/50">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-4 flex-1">
                                                    <div className="p-3 bg-[#F0FFFC] rounded-lg">
                                                        <FileText className="h-6 w-6 text-[#024D60]" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="mb-2">
                                                            <h3 className="font-semibold text-[#024D60] text-lg mb-1">{report.title}</h3>
                                                            <p className="text-sm text-gray-500 mb-2">{report.id}</p>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                                            <div className="flex items-center gap-1.5">
                                                                <User className="h-4 w-4 text-gray-400" />
                                                                <span>{report.author}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                                <span>{new Date(report.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                                                            </div>
                                                            <Badge variant="success">{report.type}</Badge>
                                                            <span className="text-gray-500">{report.size}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-[#024D60] hover:bg-[#F0FFFC]" onClick={() => handleViewReport(report)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-[#2CACAD] hover:bg-[#F0FFFC]" onClick={() => handleDownloadReport(report)}>
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* View Report Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="sm:max-w-[425px] md:max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-[#024D60]" />
                            {selectedReport?.title}
                        </DialogTitle>
                        <DialogDescription>
                            Detail dan ringkasan laporan {selectedReport?.id}.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <div className="grid gap-4 py-4 text-sm">
                        <div className="grid grid-cols-4 items-center">
                            <span className="text-gray-500 font-medium">ID Laporan</span>
                            <span className="col-span-3 font-semibold text-[#024D60]">{selectedReport?.id}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <span className="text-gray-500 font-medium">Penulis</span>
                            <span className="col-span-3">{selectedReport?.author}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <span className="text-gray-500 font-medium">Tipe</span>
                            <span className="col-span-3"><Badge variant="success">{selectedReport?.type}</Badge></span>
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <span className="text-gray-500 font-medium">Tanggal</span>
                            <span className="col-span-3">{selectedReport?.date && new Date(selectedReport.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                        </div>
                        <div className="grid grid-cols-4 items-start pt-2">
                            <span className="text-gray-500 font-medium">Ringkasan</span>
                            <p className="col-span-3 italic text-gray-700">{selectedReport?.content}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsViewDialogOpen(false)}>Tutup</Button>
                        <Button className="bg-[#2CACAD] hover:bg-[#2CACAD]/90 text-white" onClick={() => { setIsViewDialogOpen(false); handleDownloadReport(selectedReport); }}>
                            <Download className="h-4 w-4 mr-2" />
                            Unduh Laporan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Download Report Confirmation Dialog */}
            <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Download className="h-5 w-5 text-[#2CACAD]" />
                            Konfirmasi Unduh
                        </DialogTitle>
                        <DialogDescription>
                            Anda yakin ingin mengunduh laporan <b>{selectedReport?.title}</b>?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-between text-sm py-2">
                        <div className="flex items-center gap-2 text-gray-600">
                            <FileText className="h-4 w-4" />
                            <span>{selectedReport?.id} ({selectedReport?.size})</span>
                        </div>
                        <Badge variant="success">{selectedReport?.type}</Badge>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsDownloadDialogOpen(false)}>Batal</Button>
                        <Button className="bg-[#2CACAD] hover:bg-[#2CACAD]/90 text-white" onClick={confirmDownload}>
                            Ya, Unduh
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}