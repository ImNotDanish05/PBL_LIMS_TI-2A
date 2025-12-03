import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCrud = (service, key, label, options = {}) => {
    const { only, except } = options;

    const allow = (method) => {
        if (only) return only.includes(method);
        if (except) return !except.includes(method);
        return true;
    };

    const getAllQuery = allow("getAll")
        ? useQuery({
              queryKey: [key, options.query],
              queryFn: () => service.getAll(options.query || {}),
          })
        : null;

    const createMutation = allow("create")
        ? useMutation({
              mutationFn: service.create,
              onSuccess: () => {
                  toast.success(`${label} berhasil ditambahkan`);
                  getAllQuery?.refetch?.();
              },
          })
        : null;

    const updateMutation = allow("update")
        ? useMutation({
              mutationFn: ({ id, data }) => service.update(id, data),
              onSuccess: () => {
                  toast.success(`${label} berhasil diperbarui`);
                  getAllQuery?.refetch?.();
              },
          })
        : null;

    const deleteMutation = allow("delete")
        ? useMutation({
              mutationFn: (id) => service.delete(id),
              onSuccess: () => {
                  toast.success(`${label} berhasil dihapus`);
                  getAllQuery?.refetch?.();
              },
          })
        : null;

    return {
        data: getAllQuery?.data,
        isLoading: getAllQuery?.isLoading,
        error: getAllQuery?.error,

        create: createMutation
            ? {
                  ...createMutation,
                  mutate: createMutation.mutate,
                  mutateAsync: createMutation.mutateAsync,
              }
            : null,

        update: updateMutation
            ? {
                  ...updateMutation,
                  mutate: updateMutation.mutate,
                  mutateAsync: updateMutation.mutateAsync,
              }
            : null,

        delete: deleteMutation
            ? {
                  ...deleteMutation,
                  mutate: deleteMutation.mutate,
                  mutateAsync: deleteMutation.mutateAsync,
              }
            : null,
    };
};
