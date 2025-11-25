import { managerService } from "@/services/managerService";
import { useCrud } from "./useCrud";
import { useGetById } from "./useGetById";

export const useBrands = () =>
    useCrud(managerService.brands, "brands", "Merek", {
        only: ["getAll"],
    });

export const useCategories = () =>
    useCrud(managerService.categories, "categories", "Kategori", {
        only: ["getAll"],
    });

export const useDashboard = () =>
    useCrud(managerService.dashboard, "dashboard", "Dashboard", {
        only: ["getAll"],
    });

export const useEquipments = () =>
    useCrud(managerService.equipments, "equipments", "Alat", {
        only: ["getAll"],
    });

export const useGrades = () =>
    useCrud(managerService.grades, "grades", "Tingkat", {
        only: ["getAll"],
    });

export const useMethods = () =>
    useCrud(managerService.methods, "methods", "Metode", {
        only: ["getAll"],
    });

export const useOrders = () =>
    useCrud(managerService.orders, "orders", "Pesanan", {
        only: ["getAll"],
    });

export const useParameters = () =>
    useCrud(managerService.parameters, "parameters", "Parameter", {
        only: ["getAll"],
    });

export const useReagents = () =>
    useCrud(managerService.reagents, "reagents", "Reagen", {
        only: ["getAll"],
    });

export const useReferences = () =>
    useCrud(managerService.references, "references", "Referensi", {
        only: ["getAll"],
    });


export const useSuppliers = () =>
    useCrud(managerService.suppliers, "suppliers", "Supplier", {
        only: ["getAll"],
    });


export const useUnits = () =>
    useCrud(managerService.units, "units", "Satuan", {
        only: ["getAll"],
    });

export const useUsers = () =>
    useCrud(managerService.users, "users", "Pengguna", {
        only: ["getAll"],
    });

export const useAnalysts = () =>
    useCrud(managerService.analysts, "analysts", "Analyst", {
        only: ["getAll"],
    });

export const useOrder = (id) => useGetById(managerService.orders, "orders", id);