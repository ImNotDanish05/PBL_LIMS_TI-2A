import { methods } from "@/data/staff/methods";

export const FILTER_OPTIONS = [
    { value: "all", label: "All Role" },
    { value: "client", label: "Client" },
    { value: "staff", label: "Staff" },
    { value: "analyst", label: "Analyst" },
    { value: "supervisor", label: "Supervisor" },
    { value: "manager", label: "Manager" },
];

export const ENTITY_CONFIG = {
    training: {
        title: "Pilih Pelatihan",
        description:
            "Pilih satu atau beberapa pelatihan yang akan ditambahkan untuk pengguna ini",
        createTitle: "Tambah Pelatihan Baru",
        emptyMessage: "Tidak ada pelatihan tersedia",
    },
    certificate: {
        title: "Pilih Sertifikat",
        description: "Pilih satu atau lebih sertifikat untuk pengguna ini",
        createTitle: "Tambah Sertifikat Baru",
        emptyMessage: "Tidak ada sertifikat tersedia",
    },
    methods: {
        title: "Pilih Metode Analisis",
        description:
            "Pilih salah satu atau beberapa metode analisis untuk order ini",
        createTitle: "Tambah Metode Analisis Baru",
        emptyMessage: "Tidak ada metode tersedia",
    },
    samples: {
        title: "Pilih Sampel",
        description: "Pilih salah satu atau beberapa sampel untuk order ini",
        createTitle: "Tambah Sampel Baru",
        emptyMessage: "Tidak ada sampel tersedia",
    },
};
