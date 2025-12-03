import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import ManagedDataTable from "../tabel/managed-data-table";
import { getSampleColumnsOrder } from "./sample-order-colums";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { editSampleFields } from "@/utils/fields/staff";
import { useSamples } from "@/hooks/useStaff";
import EntitySelectorDialog from "../dialog/entity-selector-dialog";

export default function OrdersForm2({
    categories,
    createSample,
    data,
    setData,
}) {
    const [selectedSamples, setSelectedSamples] = useState([]);
    const [isSampleDialogOpen, setIsSampleDialogOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleCreate = async (formData) => createSample.mutateAsync(formData);

    const handleTipeOrderSelect = (value) => {
        setData((prev) => ({
            ...prev,
            tipeOrder: value,
        }));
        setIsDropdownOpen(false);
    };

    const handleSampleSelect = (sample) => {
        if (!sample) return console.log(`sample ${sample} tidak terkirim"`); // 🚧 Tambahkan guard agar tidak undefined

        setSelectedSamples((prev) => {
            const exists = prev.find((s) => s.id === sample.id);
            return exists
                ? prev.filter((s) => s.id !== sample.id)
                : [...prev, { ...sample, value: sample.value ?? "" }];
        });
    };

    // saat menambahkan dari dialog, pastikan setiap sample punya field value
    const handleTambahSamples = () => {
        const normalized = selectedSamples.map((s) =>
            s.hasOwnProperty("value") ? s : { ...s, value: "" }
        );
        setData((prev) => ({
            ...prev,
            samples: normalized,
        }));
        setSelectedSamples(normalized);
        setIsSampleDialogOpen(false);
    };

    const handleOpenDialog = () => {
        // clone supaya tidak referensi langsung
        setSelectedSamples((data.samples || []).map((s) => ({ ...s })));
        setIsSampleDialogOpen(true);
    };

    const handleDialogChange = (open) => {
        if (!open) {
            setSelectedSamples((data.samples || []).map((s) => ({ ...s })));
        }
        setIsSampleDialogOpen(open);
    };

    const handleRemoveSample = (sampleId) => {
        const updatedSamples = data.samples.filter((s) => s.id !== sampleId);
        setData((prev) => ({
            ...prev,
            samples: updatedSamples,
        }));
        setSelectedSamples(updatedSamples.map((s) => ({ ...s })));
    };

    // update value/volume untuk sample yang dipilih
    const handleSampleValueChange = (sampleId, sample_volume) => {
        setData((prev) => {
            const updated = (prev.samples || []).map((s) =>
                s.id === sampleId ? { ...s, sample_volume } : s
            );
            return { ...prev, samples: updated };
        });
        setSelectedSamples((prev) =>
            prev.map((s) => (s.id === sampleId ? { ...s, sample_volume } : s))
        );
    };

    const orderTypes = [
        { value: "internal", label: "INTERNAL", bgColor: "bg-gray-500" },
        { value: "external", label: "EXTERNAL", bgColor: "bg-teal-600" },
        { value: "regular", label: "REGULAR", bgColor: "bg-blue-500" },
        { value: "urgent", label: "URGENT", bgColor: "bg-red-500" },
    ];

    const getSelectedLabel = () => {
        const selected = orderTypes.find(
            (type) => type.value === data.tipeOrder
        );
        return selected ? selected.label : "Pilih Tipe Order";
    };

    return (
        <div className="p-6">
            {/* Grid Layout: 2 kolom */}
            <div className="grid grid-cols-2 gap-6">
                {/* KOLOM KIRI: Form */}
                <div className="space-y-6">
                    {/* Tipe Order */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Tipe Order
                        </label>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-left flex items-center justify-between"
                            >
                                <span
                                    className={
                                        data.tipeOrder
                                            ? "text-gray-700"
                                            : "text-gray-400"
                                    }
                                >
                                    {getSelectedLabel()}
                                </span>
                                <ChevronDown
                                    size={20}
                                    className={`text-gray-400 transition-transform ${
                                        isDropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                    <div className="p-3 grid grid-cols-2 gap-2">
                                        {orderTypes.map((type) => (
                                            <div
                                                key={type.value}
                                                onClick={() =>
                                                    handleTipeOrderSelect(
                                                        type.value
                                                    )
                                                }
                                                className={`
                                                    border rounded-lg p-3 cursor-pointer transition-all duration-200 text-center
                                                    ${type.bgColor} text-white
                                                    ${
                                                        data.tipeOrder ===
                                                        type.value
                                                            ? "ring-2 ring-offset-2 ring-gray-400"
                                                            : "hover:brightness-110"
                                                    }
                                                `}
                                            >
                                                <span className="font-bold text-sm">
                                                    {type.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tanggal Order - Menggunakan DatePicker */}
                    <DatePicker
                        label="Tanggal Order"
                        value={data.tanggalOrder}
                        onChange={(date) =>
                            setData((prev) => ({
                                ...prev,
                                tanggalOrder: date
                                    ? date.toISOString().split("T")[0]
                                    : "",
                            }))
                        }
                    />

                    {/* Estimasi Order Selesai - Menggunakan DatePicker */}
                    <DatePicker
                        label="Estimasi Order Selesai"
                        value={data.estimasiSelesai}
                        onChange={(date) =>
                            setData((prev) => ({
                                ...prev,
                                estimasiSelesai: date
                                    ? date.toISOString().split("T")[0]
                                    : "",
                            }))
                        }
                    />

                    {/* Catatan */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Catatan
                        </label>
                        <textarea
                            name="catatan"
                            value={data.catatan}
                            onChange={handleChange}
                            placeholder="Catatan orderan"
                            rows="4"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 resize-none"
                        />
                    </div>
                </div>

                {/* KOLOM KANAN: Sample */}
                <div className="space-y-4">
                    {/* Header dengan button */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold">Sampel</label>
                        <button
                            type="button"
                            onClick={handleOpenDialog}
                            className="px-4 py-2 bg-primary-hijauMuda hover:bg-primary-hijauTua text-white font-semibold rounded-md transition-colors text-sm"
                        >
                            Pilih Sampel
                        </button>
                    </div>

                    {/* Box: Sample yang dipilih */}
                    <div className="border border-gray-300 rounded-lg p-4 bg-white min-h-[400px]">
                        <h3 className="text-sm font-semibold mb-3 text-gray-700">
                            Sampel yang dipilih:
                        </h3>

                        {data.samples.length > 0 ? (
                            <div className="space-y-2">
                                {data.samples.map((sample, index) => (
                                    <div
                                        key={sample.id}
                                        className="flex items-center gap-3 p-3 bg-gray-100 rounded-md border border-gray-200"
                                    >
                                        <div className="flex-none w-2/5 text-sm text-gray-700">
                                            {index + 1}. {sample.name}
                                        </div>

                                        <div className="flex-1 px-2">
                                            <input
                                                type="text"
                                                value={
                                                    sample.sample_volume ?? ""
                                                }
                                                onChange={(e) =>
                                                    handleSampleValueChange(
                                                        sample.id,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Masukkan volume / nilai"
                                                className="w-full text-center px-3 py-2 border border-gray-300 rounded-md bg-white"
                                            />
                                        </div>

                                        <div className="flex-none">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveSample(
                                                        sample.id
                                                    )
                                                }
                                                className="text-red-500 hover:text-red-700 text-xs font-medium"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400 text-center mt-8">
                                Belum ada sample dipilih
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <EntitySelectorDialog
                type={"samples"}
                hook={useSamples}
                isOpen={isSampleDialogOpen}
                onOpenChange={handleDialogChange}
                selectedItems={selectedSamples}
                onSelect={handleSampleSelect}
                onConfirm={handleTambahSamples}
                getColumns={getSampleColumnsOrder}
                editFields={editSampleFields(categories)}
            />

            {/* Dialog Pilih Sampel */}
            {/* <Dialog open={isSampleDialogOpen} onOpenChange={handleDialogChange}>
                <DialogContent className="max-w-4xl flex flex-col max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Pilih Sampel</DialogTitle>
                        <DialogDescription className="sr-only">
                            Dialog untuk memilih sampel yang akan ditambahkan ke
                            order
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-grow overflow-y-auto">
                        <ManagedDataTable
                            data={samples}
                            columns={getSampleColumnsOrder({
                                selectedSamples,
                                onSelectSample: handleSampleSelect,
                            })}
                            editFields={editSampleFields(categories)}
                            showFilter={false}
                            showSearch={true}
                            onCreate={handleCreate}
                        />
                    </div>

                    <DialogFooter className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setIsSampleDialogOpen(false)}
                        >
                            Tutup
                        </Button>
                        <Button
                            onClick={handleTambahSamples}
                            disabled={selectedSamples.length === 0}
                            className="!bg-primary-hijauMuda hover:!bg-primary-hijauTua"
                        >
                            Tambahkan ({selectedSamples.length})
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}
        </div>
    );
}
