import api from "@/lib/api";

class ServiceError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = "ServiceError";
        this.status = status;
        this.data = data;
    }
}

const handleServiceError = (
    error,
    defaultMessage = "Service error occurred"
) => {
    console.error("Service error:", error);

    const message =
        error.response?.data?.message || error.message || defaultMessage;

    const status = error.response?.status;
    const data = error.response?.data;

    throw new ServiceError(message, status, data);
};


const createFormData = (data) => {
    const formData = new FormData();

    const appendToFormData = (obj, parentKey = "") => {
        Object.entries(obj).forEach(([key, value]) => {
            if (value === undefined) return;
            const fullKey = parentKey ? `${parentKey}[${key}]` : key;

            if (value instanceof File) {
                formData.append(fullKey, value, value.name);
            } else if (value instanceof Blob) {
                formData.append(fullKey, value);
            } else if (value instanceof Date) {
                formData.append(fullKey, value.toISOString());
            } else if (typeof value === "object" && value !== null) {
                appendToFormData(value, fullKey);
            } else {
                formData.append(fullKey, value);
            }
        });
    };

    appendToFormData(data);
    return formData;
};


export const serviceMethods = (
    baseUrl,
    { useFormData = false, axiosConfig = {} } = {}
) => {
    const handleRequest = async (method, url, data, config, defaultMessage) => {
        try {
            let requestData = data;
            const finalConfig = { ...axiosConfig, ...config };

            if (
                useFormData &&
                data &&
                ["post", "put", "patch"].includes(method)
            ) {
                requestData = createFormData(data);
            }

            const response = await api.request({
                url,
                method,
                data: requestData,
                ...finalConfig,
            });

            return response.data;
        } catch (error) {
            handleServiceError(error, defaultMessage);
        }
    };

    return {
        getAll: (params = {}, config = {}) =>
            handleRequest(
                "get",
                baseUrl,
                null,
                { params, ...config },
                "Failed to fetch resources"
            ),

        getById: (id, config = {}) =>
            handleRequest(
                "get",
                `${baseUrl}/${id}`,
                null,
                config,
                "Failed to fetch resource"
            ),

        create: (data, config = {}) =>
            handleRequest(
                "post",
                baseUrl,
                data,
                config,
                "Failed to create resource"
            ),

        update: (id, data, config = {}) =>
            handleRequest(
                "put",
                `${baseUrl}/${id}`,
                data,
                config,
                "Failed to update resource"
            ),

        patch: (id, data, config = {}) =>
            handleRequest(
                "patch",
                `${baseUrl}/${id}`,
                data,
                config,
                "Failed to patch resource"
            ),

        delete: (id, config = {}) =>
            handleRequest(
                "delete",
                `${baseUrl}/${id}`,
                null,
                config,
                "Failed to delete resource"
            ),

        upload: (file, additionalData = {}, config = {}) => {
            const formData = new FormData();
            formData.append("file", file);
            Object.entries(additionalData).forEach(
                ([k, v]) => v != null && formData.append(k, v)
            );

            return handleRequest(
                "post",
                `${baseUrl}/upload`,
                formData,
                config,
                "File upload failed"
            );
        },

        uploadMultiple: (files, additionalData = {}, config = {}) => {
            const formData = new FormData();
            files.forEach((f, i) => formData.append(`files[${i}]`, f));
            Object.entries(additionalData).forEach(
                ([k, v]) => v != null && formData.append(k, v)
            );

            return handleRequest(
                "post",
                `${baseUrl}/upload-multiple`,
                formData,
                config,
                "Multiple file upload failed"
            );
        },
    };
};

