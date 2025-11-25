import { useQuery } from "@tanstack/react-query";

export const useOrder = (id, service) => {
    const {
        data: order,
        isLoading: isLoadingOrder,
        error: errorOrder,
        refetch: refetchOrder,
    } = useQuery({
        queryKey: ["order", id],
        enabled: !!id,
        queryFn: () => service.orders.getById(id),
    });

    return {
        order,
        isLoadingOrder,
        errorOrder,
        refetchOrder,
    };
};
