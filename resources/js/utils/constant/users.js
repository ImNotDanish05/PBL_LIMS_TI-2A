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
};
