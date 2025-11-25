export const editEquipmentFields = (data) => {
    return [
        {
            name: "name",
            label: "Nama Alat",
            placeholder: "Masukkan nama alat",
        },
        {
            name: "brand_type",
            label: "Brand / Tipe",
            type: "select",
            placeholder: "Masukkan brand / tipe alat",
            initialValuePath: "brand_types.id",
            options: data
                ? data.map((item) => ({ value: item.id, label: item.name }))
                : [],
            savePath: "brand_type_id",
        },
        {
            name: "serial_number",
            label: "Nomor Seri",
            placeholder: "Masukkan nomor seri alat",
        },
        {
            name: "purchase_year",
            label: "Tahun Pembelian",
            type: "date",
            placeholder: "Masukkan tahun pembelian alat",
        },
        {
            name: "calibration_schedule",
            label: "Jadwal Kalibrasi",
            type: "select",
            placeholder: "Masukkan jadwal kalibrasi alat",
            options: [
                { value: "internal", label: "Internal" },
                { value: "eksternal", label: "Eksternal" },
            ],
        },
        {
            name: "status",
            label: "Status",
            type: "select",
            placeholder: "Pilih status alat",
            options: [
                { value: "active", label: "Aktif" },
                { value: "maintenance", label: "Perbaikan" },
                { value: "broken", label: "Rusak" },
            ],
        },
        {
            name: "location",
            label: "Lokasi",
            placeholder: "Masukkan lokasi alat",
        },
    ];
};

export const editBrandFields = [
    {
        name: "name",
        label: "Nama Brand",
        placeholder: "Masukkan nama brand",
    },
];

export const editReagentFields = (dataSupplier, dataGrade) => {
    return [
        {
            name: "name",
            label: "Nama Reagen",
            placeholder: "Masukkan nama reagen",
        },
        {
            name: "supplier",
            label: "Pemasok",
            placeholder: "Masukkan pemasok reagen",
            type: "select",
            initialValuePath: "suppliers.id",
            options: dataSupplier
                ? dataSupplier.map((item) => ({
                      value: item.id,
                      label: item.name,
                  }))
                : [],
            savePath: "supplier_id",
        },
        {
            name: "grade",
            label: "Tingkatan",
            placeholder: "Masukkan tingkatan reagen",
            type: "select",
            initialValuePath: "grades.id",
            options: dataGrade
                ? dataGrade.map((item) => ({
                      value: item.id,
                      label: item.name,
                  }))
                : [],
            savePath: "grade_id",
        },
        {
            name: "formula",
            label: "Formula",
            placeholder: "Masukkan formula reagen",
        },
        {
            name: "batch_number",
            label: "Nomor Batch",
            placeholder: "Masukkan nomor batch reagen",
        },
        {
            name: "storage_location",
            label: "Lokasi Penyimpanan",
            placeholder: "Masukkan lokasi penyimpanan reagen",
        },
    ];
};

export const editGradeFields = [
    {
        name: "name",
        label: "Nama Grade",
        placeholder: "Masukkan nama grade",
    },
];

export const editSupplierFields = [
    {
        name: "name",
        label: "Nama Pemasok",
        placeholder: "Masukkan nama pemasok",
    },
    {
        name: "phone_number",
        label: "Nomor Telepon",
        placeholder: "Masukkan nomor telepon pemasok",
    },
    {
        name: "address",
        label: "Alamat",
        placeholder: "Masukkan alamat pemasok",
    },
];

export const editSampleFields = [
    {
        name: "name",
        label: "Nama Sampel",
        placeholder: "Masukkan nama sampel",
    },
    {
        name: "sample_category",
        label: "Kategori Sampel",
        placeholder: "Masukkan kategori sampel",
    },
    {
        name: "form",
        label: "Bentuk",
        placeholder: "Masukkan bentuk sampel",
        type: "select",
        options: [
            { value: "liquid", label: "Liquid" },
            { value: "solid", label: "Solid" },
            { value: "gas", label: "Gas" },
        ],
    },
    {
        name: "preservation_method",
        label: "Metode Pengawetan",
        placeholder: "Masukkan metode pengawetan sampel",
    },
    {
        name: "sample_volume",
        label: "Volume Sampel",
        placeholder: "Masukkan volume sampel",
    },
    {
        name: "condition",
        label: "Kondisi",
        placeholder: "Masukkan kondisi sampel",
        type: "select",
        options: [
            { value: "good", label: "Baik" },
            { value: "damaged", label: "Rusak" },
            { value: "expired", label: "Kadaluarsa" },
        ],
    },
    {
        name: "temperature",
        label: "Suhu",
        placeholder: "Masukkan suhu sampel",
        type: "select",
        options: [
            { value: "temperature", label: "Suhu" },
            { value: "time", label: "Waktu" },
        ],
    },
];

export const editCategorySampleFields = [
    {
        name: "name",
        label: "Nama Kategori Sampel",
        placeholder: "Masukkan nama kategori sampel",
    },
];

export const editParameterFields = (unitData, referenceData) => {
    return [
        {
            name: "name",
            label: "Nama Parameter",
            placeholder: "Masukkan nama parameter",
        },
        {
            name: "unit_value",
            label: "Nilai Satuan",
            type: "select",
            initialValuePath: "unit_values.id",
            placeholder: "Masukkan satuan parameter",
            options: unitData
                ? unitData.map((item) => ({
                      value: item.id,
                      label: item.value,
                  }))
                : [],
            savePath: "unit_value_id",
        },
        {
            name: "reference",
            label: "Standar Referensi",
            type: "select",
            initialValuePath: "reference_standards.id",
            placeholder: "Masukkan standar parameter",
            options: referenceData
                ? referenceData.map((item) => ({
                      value: item.id,
                      label: item.name,
                  }))
                : [],
            savePath: "reference_id",
        },
        {
            name: "category",
            label: "Kategori",
            placeholder: "Masukkan kategori parameter",
            type: "select",
            options: [
                { value: "fisika", label: "Fisika" },
                { value: "mikrobiologi", label: "Mikrobiologi" },
                { value: "kimia", label: "Kimia" },
                { value: "klinik", label: "Klinik" },
            ],
        },
        {
            name: "detection_limit",
            label: "Detection Limit",
            placeholder: "Masukkan detection limit parameter",
            type: "select",
            options: [
                { value: "LOD", label: "LOD" },
                { value: "LOQ", label: "LOQ" },
            ],
        },
        {
            name: "quality_standard",
            label: "Standar Kualitas",
            placeholder: "Masukkan standar kualitas parameter",
        },
    ];
};

export const editMethodFields = (referenceData) => {
    return [
        {
            name: "name",
            label: "Nama Metode",
            placeholder: "Masukkan nama metode",
        },
        {
            name: "reference",
            label: "Standar Referensi",
            type: "select",
            initialValuePath: "reference_standards.id",
            placeholder: "Masukkan standar parameter",
            options: referenceData
                ? referenceData.map((item) => ({
                      value: item.id,
                      label: item.name,
                  }))
                : [],
            savePath: "reference_id",
        },
        {
            name: "applicable_parameter",
            label: "Parameter Berlaku",
            placeholder: "Masukkan parameter berlaku metode",
        },
        {
            name: "duration",
            label: "Durasi",
            placeholder: "Masukkan durasi metode",
        },
        {
            name: "validity_period",
            label: "Masa Berlaku",
            placeholder: "Masukkan masa berlaku metode",
        },
    ];
};

export const editUnitFields = [
    {
        name: "value",
        label: "Nilai Satuan",
        placeholder: "Masukkan nilai satuan",
    },
];

export const editStandardFields = [
    {
        name: "name",
        label: "Nama Standar",
        placeholder: "Masukkan nama standar",
    },
];

export const editSertificateFields = (analyst) => [
    {
        name: "name",
        label: "Nama Sertifikat",
        placeholder: "Masukkan nama sertifikat",
    },
    {
        name: "analyst",
        label: "Analis",
        type: "select",
        initialValuePath: "analyst.id",
        placeholder: "Pilih analis",
        options: analyst
            ? analyst.map((item) => ({
                value: item.id,
                label: item.name,
            }))
            : [],
        savePath: "analyst_id",
    },
    {
        name: "issued_date",
        label: "Tanggal Terbit",
        placeholder: "Masukkan tanggal terbit sertifikat",
    },
    {
        name: "expired_date",
        label: "Tanggal Kadaluarsa",
        placeholder: "Masukkan tanggal kadaluarsa sertifikat",
    },
    {
        name: "file_path",
        type: "file",
        label: "Upload Sertifikat",
        placeholder: "Upload file sertifikat",
        accept: ".pdf",
        maxSize: 5 * 1024 * 1024, // 5MB
    },
];
export const editTrainingFields = [
    {
        name: "name",
        label: "Nama Sertifikat",
        placeholder: "Masukkan nama sertifikat",
    },
    {
        name: "provider",
        label: "Provider",
        placeholder: "Masukkan provider",
    },
    {
        name: "date",
        label: "Tanggal",
        placeholder: "Masukkan tanggal",
    },
    {
        name: "result",
        label: "Hasil",
        placeholder: "Masukkan hasil",
    },
];

export const editUsersFields = (
    currentTrainings = [],
    handleTrainingClick,
    handleRemoveTraining,
) => {
    return [
        {
            name: "name",
            label: "Nama Pengguna",
            placeholder: "Masukkan nama pengguna",
        },
        {
            name: "email",
            label: "Email Pengguna",
            placeholder: "Masukkan email pengguna",
        },
        {
            name: "role",
            label: "Role Pengguna",
            type: "select",
            placeholder: "Pilih role pengguna",
            options: [
                { value: "admin", label: "Admin" },
                { value: "analyst", label: "Analyst" },
                { value: "client", label: "Client" },
                { value: "manager", label: "Manager" },
                { value: "staff", label: "Staff" },
                { value: "supervisor", label: "Supervisor" },
            ],
        },
        {
            name: "specialist",
            label: "Spesialisasi Pengguna",
            initialValuePath: "analyst.specialist",
            savePath: "analyst.specialist",
            placeholder: "Masukkan spesialisasi pengguna",
            showIf: { field: "role", value: "analyst" },
        },
        {
            name: "trainings",
            title: "Pelatihan",
            label: "Pilih Pelatihan",
            type: "button",
            data: currentTrainings,
            onClick: handleTrainingClick,
            onRemove: handleRemoveTraining,
            showIf: { field: "role", value: "analyst" },
        },
    ];
};
