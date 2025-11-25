export const editClientFields = [
    {
        name: "name",
        label: "Nama Client",
        placeholder: "Masukkan nama client",
    },
    {
        name: "email",
        label: "Email Client",
        placeholder: "Masukkan email client",
    },
    {
        name: "password",
        label: "Password Client",
        placeholder: "Masukkan password client",
    },
    {
        name: "address",
        label: "Alamat Client",
        placeholder: "Masukkan alamat client",
    },
    {
        name: "phone_number",
        label: "Nomor Telepon Client",
        placeholder: "Masukkan Nomor Telepon client",
    },
    {
        name: "npwp_number",
        label: "NPWP Client",
        placeholder: "Masukkan NPWP client",
    },
];

export const editSampleFields = (categories = []) => {
    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));
    return [
        {
            name: "name",
            label: "Nama Sampel",
            placeholder: "Masukkan nama sampel",
        },
        {
            name: "sample_category_id",
            label: "Kategori Sampel",
            type: "select",
            placeholder: "Pilih kategori sampel",
            options: categoryOptions,
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
            name: "storage_condition",
            label: "Kondisi Penyimpanan",
            placeholder: "Masukkan kondisi penyimpanan",
        },
    ];
};
