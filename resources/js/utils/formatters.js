export const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export const formatCurrency = (number) => {
    return `Rp ${parseInt(number, 10).toLocaleString("id-ID")}`;
};
