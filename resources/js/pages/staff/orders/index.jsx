import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import StepperFirst from "@/components/shared/staff/stepper-first";
import OrdersForm from "@/components/shared/staff/orders-form1";
import OrdersForm2 from "@/components/shared/staff/orders-form2";
import OrderForms3 from "@/components/shared/staff/orders-form3";
import { CheckSquare } from "lucide-react";
import Loading from "@/components/ui/loading";
import { useOrders, useSamples } from "@/hooks/useStaff";

export default function OrdersPage() {
    const [step, setStep] = useState(1);
    const [isSaved, setIsSaved] = useState(false);
    const { data: orders, isLoading, error, create: createOrder } = useOrders();
    // console.log("order", orders);
    const { create: createSample } = useSamples();

    const { clients, methods, categories, orderNumber } = orders || {};

    const [data, setData] = useState({
        // Step 1 data
        selectedKlien: null,
        judulOrder: "",
        metodeAnalisis: [],
        nomorOrder: "",

        // Step 2 data
        tipeOrder: "",
        samples: [],
        tanggalOrder: new Date()
            .toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" })
            .split("T")[0],
        estimasiSelesai: null,
        catatan: "",
        totalHarga: null,
    });

    const formTopRef = useRef(null);
    useEffect(() => {
        if (formTopRef.current) {
            formTopRef.current.scrollIntoView({
                block: "start",
            });
        }
    }, [step]);

    useEffect(() => {
        if (isSaved && formTopRef.current) {
            formTopRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [isSaved]);

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handlePrev = () => {
        setStep((prev) => prev - 1);
    };

    const handleSave = () => {
        if (step === 3) {
            createOrder.mutate(data, {
                onSuccess: () => {
                    setIsSaved(true);
                },
                onError: () => {
                    if (
                        errors.selectedKlien ||
                        errors.judulOrder ||
                        errors.metodeAnalisis
                    ) {
                        setStep(1);
                    } else if (errors.samples || errors.tipeOrder) {
                        setStep(2);
                    }
                },
            });
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout title="Orders" header="Registrasi Order Baru">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Orders" header="Registrasi Order Baru">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Orders" header="Registrasi Order Baru">
            <div ref={formTopRef} className="px-4 py-2 rounded-md shadow-sm">
                <StepperFirst currentStep={step} />
            </div>

            <div className="px-4 py-2 rounded-md shadow-sm">
                {isSaved ? (
                    <>
                        {/* ✅ Header sukses seperti di gambar */}
                        <div ref={formTopRef} className="p-6">
                            <h2 className="text-2xl font-extrabold text-teal-800 flex items-center gap-2">
                                REGISTRASI ORDER BERHASIL!{" "}
                                <CheckSquare className="text-teal-600 w-7 h-7" />
                            </h2>
                            <p className="text-gray-700 text-sm mt-1">
                                Order <strong>{data.nomorOrder}</strong> siap
                                untuk diproses. Tim Supervisor akan segera
                                mereview dan menyetujuinya.
                            </p>
                        </div>

                        {/* ✅ Komponen order summary (OrderForms3) */}
                        <OrderForms3 data={data} />

                        {/* Tombol kembali ke form */}
                        <div className="flex justify-end mt-8">
                            <button
                                onClick={() => {
                                    setIsSaved(false);
                                    window.location.href = "/staff/orders";
                                }}
                                className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                Kembali
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Tahapan form */}
                        {step === 1 && (
                            <OrdersForm
                                clients={clients}
                                methods={methods}
                                orderNumber={orderNumber}
                                data={data}
                                setData={setData}
                            />
                        )}
                        {step === 2 && (
                            <OrdersForm2
                                categories={categories}
                                createSample={createSample}
                                data={data}
                                setData={setData}
                            />
                        )}
                        {step === 3 && <OrderForms3 data={data} />}

                        {/* Tombol navigasi */}
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={handlePrev}
                                disabled={step === 1}
                                className="px-8 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
                            >
                                Kembali
                            </button>

                            {step < 3 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Lanjutkan
                                </button>
                            ) : (
                                <button
                                    onClick={handleSave}
                                    disabled={
                                        createOrder.isPending ||
                                        !data.selectedKlien ||
                                        !data.judulOrder.trim() ||
                                        data.metodeAnalisis.length === 0 ||
                                        !data.tipeOrder ||
                                        data.samples.length === 0 ||
                                        data.metodeAnalisis.some(
                                            (m) => !m.description?.trim()
                                        ) ||
                                        data.samples.some(
                                            (s) => !s.sample_volume?.trim()
                                        )
                                    }
                                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    {createOrder.isPending
                                        ? "Menyimpan..."
                                        : "Simpan"}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
