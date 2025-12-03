import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { staffService } from "@/services/staffService";

export const useOrders = (service, role) => {
    const isEnabled = !!service && !!role;
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["orders", role],
        queryFn: service.orders.getAll,
        enabled: isEnabled,
    });

    const { orders, clients, methods, samples, categories, orderNumber } =
        data || {};

    const createOrder = useMutation({
        mutationFn: staffService.orders.create,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            toast.success("Order berhasil dibuat");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah Order"),
    });

    const createSample = useMutation({
        mutationFn: staffService.samples.create,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            toast.success("Sampel berhasil dibuat");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah Sampel"),
    });

    return {
        orders,
        clients,
        methods,
        samples,
        categories,
        orderNumber,
        isLoading,
        error,
        refetch,
        createOrder,
        createSample,
    };
};
