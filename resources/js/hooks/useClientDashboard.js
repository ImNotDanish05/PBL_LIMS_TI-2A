import { useQuery } from "@tanstack/react-query";
import { clientService } from "@/services/clientService";

export const useClientDashboard = () => {
    const {
        data: response,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["client"],
        queryFn: async () => {
            try {
                const res = await clientService.dashboard.getAll();
                return res;
            } catch (err) {
                // lempar error agar react-query bisa menangkapnya
                throw new Error(
                    err?.response?.data?.message || "Gagal mengambil data dashboard client."
                );
            }
        },
    });

    const { stats, orders, pagination, user } = response?.data || {};

    // siapkan pesan error yang bisa dipakai di komponen
    const errorMessage = isError
        ? error?.message || "Terjadi kesalahan saat memuat data."
        : null;

    return {
        stats,
        orders,
        pagination,
        user,
        isLoading,
        isError,
        errorMessage,
        refetch,
    };
};
