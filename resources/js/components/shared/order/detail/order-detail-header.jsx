import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    Clock,
    ShoppingCart,
    FileText,
    DollarSign,
    Download,
} from "lucide-react";
import {
    getOrderTypeVariant,
} from "@/utils/statusUtils";
import { formatDate, formatCurrency } from "@/utils/formatters";

export default function OrderDetailHeader({ order }) {
    const totalPrice = order.analyses_methods.reduce((sum, method) => sum + method.pivot.price, 0);
    return (
        <div className="bg-primary-hijauTua rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                            <ShoppingCart className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{order.title}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-teal-100 text-sm">Order #{order.order_number}</p>
                                <Badge
                                    variant={getOrderTypeVariant(order.order_type) || "outline"}
                                    className="capitalize"
                                >
                                    {order.order_type}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <Button className="bg-primary-hijauTerang text-primary-hijauTua hover:bg-primary-hijauTerang/80 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Laporan
                </Button>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm text-teal-100">Tanggal Order</span>
                    </div>
                    <p className="font-bold text-lg">{formatDate(order.order_date)}</p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm text-teal-100">Estimasi Selesai</span>
                    </div>
                    <p className="font-bold text-lg">{formatDate(order.estimate_date)}</p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm text-teal-100">Laporan Terbit</span>
                    </div>
                    <p className="font-bold text-lg">{formatDate(order.report_issued_at)}</p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm text-teal-100">Total Biaya</span>
                    </div>
                    <p className="font-bold text-lg">{formatCurrency(totalPrice)}</p>
                </div>
            </div>
        </div>
    );
}
