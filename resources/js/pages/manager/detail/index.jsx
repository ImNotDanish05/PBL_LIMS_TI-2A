import { useMemo, useState } from "react";
import { detailOrder as fallbackDetail } from "@/data/manager/detail";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { ClientInfoCard, OrderDetailHeader, SampleSelector, AnalysisMethodCard, AnalystTeamCard, EquipmentCard, MethodInfoCard, NotesCard, ParameterInfoCard, ReagentCard, SampleInfoCard } from "@/components/shared/order/detail";

export default function DetailOrder({ auth, canValidate, detailData }) {
    const order = useMemo(() => detailData || fallbackDetail, [detailData]);

    const [selectedSampleId, setSelectedSampleId] = useState(
        order.parameter_methods?.[0]?.id?.toString?.() ?? null
    );

    const selectedSample = order.parameter_methods?.find(
        (sample) => sample.id?.toString?.() === selectedSampleId
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
                    order={order}
                    canValidate={canValidate}
                    onValidate={handleValidate}
                    onInvalidate={handleInvalidate}
                />

                <ClientInfoCard client={order.client} />

                <SampleSelector
                    samples={order.parameter_methods || []}
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
                            <EquipmentCard equipments={selectedSample.equipements || selectedSample.equipments || []} />
                            <ReagentCard reagents={selectedSample.reagents || []} />
                        </div>
                    </>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <AnalystTeamCard analysts={order.analysts || []} />
                    <AnalysisMethodCard
                        methods={order.analysis_methods || []}
                        reportIssuedAt={order.report_issued_at}
                        reportFilePath={order.report_file_path}
                        resultValue={order.result_value}
                    />
                    <NotesCard notes={order.notes} />
                </div>
            </div>
        </DashboardLayout>
    );
}
