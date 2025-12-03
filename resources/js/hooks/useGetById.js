import { useQuery } from "@tanstack/react-query";

export const useGetById = (service, key, id) => {
    return useQuery({
        queryKey: [key, id],
        enabled: !!id,
        queryFn: () => service.getById(id),
    });
};
