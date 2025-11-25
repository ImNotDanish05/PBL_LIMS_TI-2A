import { serviceMethods } from "./baseService";

// useFormData ditambahin buat kalo mau ada prosesa

export const managerService = {
    dashboard: serviceMethods("/manager", ),

    equipments: serviceMethods("/manager/tools/equipments", ),

    brands: serviceMethods("/manager/tools/brands", ),

    parameters: serviceMethods("/manager/tests/parameters", ),

    methods: serviceMethods("/manager/tests/methods", ),

    units: serviceMethods("/manager/tests/units", ),

    references: serviceMethods("/manager/tests/references", ),

    categories: serviceMethods("/manager/tests/categories", ),

    grades: serviceMethods("/manager/materials/grades", ),

    suppliers: serviceMethods("/manager/materials/suppliers", ),

    reagents: serviceMethods("/manager/materials/reagents", ),

    users: serviceMethods("/manager/users", ),

    analysts: serviceMethods("/manager/analysts", ),

    orders: serviceMethods("/manager/orders", ),
};
