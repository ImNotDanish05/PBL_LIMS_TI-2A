import { serviceMethods } from "./baseService";

// useFormData ditambahin buat kalo mau ada proses create, edit, delete aja

export const adminService = {
    dashboard: serviceMethods("/admin", {
        useFormData: false,
    }),

    equipments: serviceMethods("/admin/tools/equipments", {
        useFormData: true,
    }),

    brands: serviceMethods("/admin/tools/brands", {
        useFormData: true,
    }),

    parameters: serviceMethods("/admin/tests/parameters", {
        useFormData: true,
    }),

    methods: serviceMethods("/admin/tests/methods", {
        useFormData: true,
    }),

    units: serviceMethods("/admin/tests/units", {
        useFormData: true,
    }),

    references: serviceMethods("/admin/tests/references", {
        useFormData: true,
    }),

    categories: serviceMethods("/admin/tests/categories", {
        useFormData: true,
    }),

    sertif: serviceMethods("/admin/analyst/certificates", {
        useFormData: true,
    }),

    trainings: serviceMethods("/admin/analyst/trainings", {
        useFormData: true,
    }),

    grades: serviceMethods("/admin/materials/grades", {
        useFormData: true,
    }),

    suppliers: serviceMethods("/admin/materials/suppliers", {
        useFormData: true,
    }),

    reagents: serviceMethods("/admin/materials/reagents", {
        useFormData: true,
    }),

    users: serviceMethods("/admin/users", {
        useFormData: true,
    }),

    analysts: serviceMethods("/admin/analysts", {
        useFormData: false,
    }),

    orders: serviceMethods("/admin/orders", {
        useFormData: false,
    }),
};
