import { useState, useMemo, useEffect } from "react";

export function useTable({
    data,
    defaultPageSize = 10,
    filterColumn = "status",
    showFilter = false,
    showSearch = false,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterValue, setFilterValue] = useState("all");
    const [sorting, setSorting] = useState([]);

    const filteredData = useMemo(() => {
        let result = data;
        if (showFilter && filterValue !== "all") {
            result = result.filter(
                (item) => item[filterColumn] === filterValue
            );
        }
        if (showSearch && searchTerm) {
            result = result.filter((item) => {
                const lowerSearch = searchTerm.toLowerCase();
                return Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(lowerSearch)
                );
            });
        }
        return result;
    }, [data, filterValue, searchTerm, showFilter, showSearch, filterColumn]);

    const sortedData = useMemo(() => {
        if (sorting.length === 0) return filteredData;
        const { id, desc } = sorting[0];
        return [...filteredData].sort((a, b) => {
            const valA = a[id];
            const valB = b[id];
            if (valA === null || valA === undefined) return 1;
            if (valB === null || valB === undefined) return -1;
            if (valA < valB) return desc ? 1 : -1;
            if (valA > valB) return desc ? -1 : 1;
            return 0;
        });
    }, [filteredData, sorting]);

    const totalPages = Math.ceil(sortedData.length / defaultPageSize) || 1;

    const startIndex = (currentPage - 1) * defaultPageSize;
    const currentData = useMemo(() => {
        const endIndex = startIndex + defaultPageSize;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, startIndex, defaultPageSize]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filterValue, searchTerm]);

    return {
        currentPage,
        totalPages,
        goToPage,
        searchTerm,
        setSearchTerm,
        filterValue,
        setFilterValue,
        currentData,
        startIndex,
        sorting,
        setSorting,
    };
}
