import { serviceMethods } from "./baseService";

export const clientService = {
    dashboard: serviceMethods("/client", {
        useFormData: false,
    }),
    order: serviceMethods("/client/orders", { 
        useFormData: false,
    }),
    history: serviceMethods("/client/orders/status", { 
        useFormData: false,
    }),

};
