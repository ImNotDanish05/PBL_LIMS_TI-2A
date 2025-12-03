// resources/js/hooks/useClientHistory.js
import { useQuery } from "@tanstack/react-query";
import { clientService } from "@/services/clientService";

export const useClientHistory = (orderId) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["client", "order", "history", orderId],
    queryFn: async () => {
      if (!orderId) throw new Error("ID order tidak ditemukan.");

      try {
        const res = await clientService.history.getById(orderId);
        return res.data ?? res; // ambil bagian penting dari response
      } catch (err) {
        throw new Error(
          err?.response?.data?.message || "Gagal mengambil riwayat order client."
        );
      }
    },
    enabled: !!orderId, // hanya dijalankan kalau ID ada
  });

  return {
    order: data?.order ?? null,
    statuses: data?.statuses ?? [],
    isLoading,
    isError,
    errorMessage:
      isError && (error?.message || "Terjadi kesalahan saat memuat data riwayat."),
    refetch,
  };
};
