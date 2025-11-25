import { serviceMethods } from "./baseService";

export const staffService = {
    clients: serviceMethods("/staff/manage-clients", { useFormData: true }),
    orders: serviceMethods("/staff/orders", { useFormData: false }),
    samples: serviceMethods("staff/orders/samples", { useFormData: false }),
};
