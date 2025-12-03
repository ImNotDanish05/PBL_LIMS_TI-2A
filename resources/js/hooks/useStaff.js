import { staffService } from "@/services/staffService";
import { useCrud } from "./useCrud";

export const useClients = () =>
    useCrud(staffService.clients, "clients", "klien");

export const useOrders = () =>
    useCrud(staffService.orders, "orders", "pesanan");

export const useSamples = () =>
    useCrud(staffService.samples, "samples", "sampel");
