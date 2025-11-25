import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { ClientInfoCard, OrderDetailHeader, SampleSelector, AnalysisMethodCard, AnalystTeamCard, EquipmentCard, NotesCard, ReagentCard, SampleInfoCard, OrderValidation, OrderSummary } from "@/components/shared/order/detail";
import Loading from "@/components/ui/loading";
import { usePage } from "@inertiajs/react";
import ParameterMethodCard from "@/components/shared/order/detail/parameter-method-card";
import { useOrder } from "@/hooks/useAdmin";

export default function AdminDetailOrder({ canValidate }) {
    const { props } = usePage()
    const { id } = props

    const { data: order, isLoading, error } = useOrder(id);

    const [selectedSampleId, setSelectedSampleId] = useState(null);

    useEffect(() => {
        if (order && order.samples && order.samples.length > 0 && selectedSampleId === null) {
            setSelectedSampleId(order.samples[0].id.toString());
        }
    }, [order, selectedSampleId]);

    const handleValidation = () => {
        console.log("Validasi Order");
    };

    if (isLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    const selectedSample = order.samples.find(
        (sample) => sample.id.toString() === selectedSampleId
    );

    if (error) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {errorOrder.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Detail Order" header="Detail Order">
            <div className="max-w-7xl mx-auto space-y-6">
                <OrderDetailHeader order={order} />

                <ClientInfoCard client={order.clients} />

                <SampleSelector
                    samples={order.samples}
                    selectedSampleId={selectedSampleId}
                    onSampleChange={setSelectedSampleId}
                />

                {selectedSample && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SampleInfoCard sample={selectedSample} />
                            <div className="space-y-6">
                                <ParameterMethodCard data={selectedSample.n_parameter_methods} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <EquipmentCard equipments={selectedSample.n_parameter_methods.equipments} />
                            <ReagentCard reagents={selectedSample.n_parameter_methods.reagents} />
                        </div>
                    </>
                )}

                <AnalysisMethodCard
                    methods={order.analyses_methods}
                    reportIssuedAt={order.report_issued_at}
                    reportFilePath={order.report_file_path}
                    resultValue={order.result_value}
                />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                        <AnalystTeamCard analysts={order.analysts} />
                    </div>
                    <NotesCard notes={order.notes} resultValue={order.result_value} />
                </div>

                {canValidate && (
                    <OrderValidation handleValidation={handleValidation} />
                )}

                <OrderSummary order={order} selectedSample={selectedSample} />
            </div>
        </DashboardLayout>
    );
}