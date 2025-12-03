import { useQuery } from "@tanstack/react-query";
import { clientService } from "@/services/clientService";

export const useClientOrder = (orderId) => {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["client", "order", orderId],
    queryFn: async () => {
      if (!orderId) throw new Error("ID order tidak ditemukan.");

      try {
        const res = await clientService.order.getById(orderId);
        return res;
      } catch (err) {
        throw new Error(
          err?.response?.data?.message ||
            "Gagal mengambil detail order client."
        );
      }
    },
    enabled: !!orderId,
  });

  // Ambil data sesuai struktur backend
  const { order_details, table_data_sample } = response?.data || {};

  const errorMessage = isError
    ? error?.message || "Terjadi kesalahan saat memuat data."
    : null;

  return {
    order_details,
    table_data_sample,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
};
