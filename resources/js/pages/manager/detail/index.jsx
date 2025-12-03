import { useState } from "react";
import { detailOrder } from "@/data/manager/detail";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { ClientInfoCard, OrderDetailHeader, SampleSelector, AnalysisMethodCard, AnalystTeamCard, EquipmentCard, MethodInfoCard, NotesCard, ParameterInfoCard, ReagentCard, SampleInfoCard } from "@/components/shared/order/detail";

export default function DetailOrder({ auth, canValidate }) {
    const [loading, setLoading] = useState(false);
    const [selectedSampleId, setSelectedSampleId] = useState(
        detailOrder.parameter_methods[0].id.toString()
    );

    const selectedSample = detailOrder.parameter_methods.find(
        (sample) => sample.id.toString() === selectedSampleId
    );

    const handleValidate = () => {
        alert("Order berhasil divalidasi!");
        // setLoading(true);
        // router.post(`/manager/report-validation/${order.id}/validate`, {}, {
        //     onFinish: () => setLoading(false),
        //     onSuccess: () => alert("Order berhasil divalidasi!"),
        // });
    };

    const handleInvalidate = () => {
        alert("Order berhasil diinvalidasi!");
        // setLoading(true);
        // router.post(`/manager/report-validation/${order.id}/invalidate`, {}, {
        //     onFinish: () => setLoading(false),
        //     onSuccess: () => alert("Order berhasil diinvalidasi!"),
        // });
    };

    return (
        <DashboardLayout title="Detail Order"  header="Detail Order">
            <div className="max-w-7xl mx-auto space-y-6">
                <OrderDetailHeader
                    order={detailOrder}
                    canValidate={canValidate}
                    onValidate={handleValidate}
                    onInvalidate={handleInvalidate}
                />

                <ClientInfoCard client={detailOrder.client} />

                <SampleSelector
                    samples={detailOrder.parameter_methods}
                    selectedSampleId={selectedSampleId}
                    onSampleChange={setSelectedSampleId}
                />

                {selectedSample && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SampleInfoCard sample={selectedSample} />
                            <div className="space-y-6">
                                <ParameterInfoCard parameter={selectedSample.parameter} />
                                <MethodInfoCard method={selectedSample.method} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <EquipmentCard equipments={selectedSample.equipements} />
                            <ReagentCard reagents={selectedSample.reagents} />
                        </div>
                    </>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <AnalystTeamCard analysts={detailOrder.analysts} />
                    <AnalysisMethodCard
                        methods={detailOrder.analysis_methods}
                        reportIssuedAt={detailOrder.report_issued_at}
                        reportFilePath={detailOrder.report_file_path}
                        resultValue={detailOrder.result_value}
                    />
                    <NotesCard notes={detailOrder.notes} />
                </div>
            </div>
        </DashboardLayout>
    );
}