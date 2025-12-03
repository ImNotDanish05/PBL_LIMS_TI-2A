import { adminService } from "@/services/adminService";
import { useCrud } from "./useCrud";
import { useGetById } from "./useGetById";

export const useBrands = () => useCrud(adminService.brands, "brands", "Merek");

export const useCategories = () =>
    useCrud(adminService.categories, "categories", "Kategori");

export const useDashboard = () =>
    useCrud(adminService.dashboard, "dashboard", "Dashboard", {
        only: ["getAll"],
    });

export const useEquipments = () =>
    useCrud(adminService.equipments, "equipments", "Alat");

export const useGrades = () =>
    useCrud(adminService.grades, "grades", "Tingkat");

export const useMethods = () =>
    useCrud(adminService.methods, "methods", "Metode");

export const useOrders = () =>
    useCrud(adminService.orders, "orders", "Pesanan", {
        only: ["getAll"],
    });

export const useParameters = () =>
    useCrud(adminService.parameters, "parameters", "Parameter");

export const useReagents = () =>
    useCrud(adminService.reagents, "reagents", "Reagen");

export const useReferences = () =>
    useCrud(adminService.references, "references", "Referensi");

export const useSertif = () =>
    useCrud(adminService.sertif, "sertif", "Sertifikat");

export const useSuppliers = () =>
    useCrud(adminService.suppliers, "suppliers", "Supplier");

export const useTrainings = () =>
    useCrud(adminService.trainings, "trainings", "Pelatihan");

export const useUnits = () => useCrud(adminService.units, "units", "Satuan");

export const useUsers = () => useCrud(adminService.users, "users", "Pengguna");

export const useAnalysts = () => useCrud(adminService.analysts, "analysts", "Analyst", {
    only: ["getAll"],
});

export const useOrder = (id) => useGetById(adminService.orders, "orders", id);
