import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import {
    ChevronRight,
    ChevronLeft,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchFilter from "./searchfilter";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";

export function DataTableCard({ className, ...props }) {
    return (
        <Card
            className={cn("w-full rounded-2xl shadow-lg border-none", className)}
            {...props}
        />
    );
}

export function DataTableHeader({
    showSearch,
    showFilter,
    filterOptions,
    searchTerm,
    onSearchChange,
    filterValue,
    onFilterChange,
    showCreate,
    onCreate,
}) {
    return (
        <CardHeader className="pb-0">
            <SearchFilter
                showSearch={showSearch}
                showFilter={showFilter}
                filterOptions={filterOptions}
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                filterValue={filterValue}
                onFilterChange={onFilterChange}
                onCreate={onCreate}
                showCreate={showCreate}
            />
        </CardHeader>
    );
}

export function DataTableContent({
    columns,
    data,
    startIndex = 0,
    onEdit,
    onDelete,
    meta = {},
    sorting,
    setSorting,
}) {
    const tableColumns = columns.map((col) => ({
        accessorKey: col.accessorKey,
        header: col.header,
        enableSorting: !["no", "select"].includes(col.accessorKey),
        cell: (info) => {
            const row = info.row.original;
            if (col.accessorKey === "no") return startIndex + info.row.index + 1;
            if (col.cell)
                return col.cell({
                    row,
                    onEdit: onEdit ? () => onEdit(row) : undefined,
                    onDelete: onDelete ? () => onDelete(row) : undefined,
                    ...meta,
                });
            return row[col.accessorKey];
        },
    }));

    const table = useReactTable({
        data,
        columns: tableColumns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
    });

    return (
        <CardContent className="pt-0">
            <Table className="border-separate border-spacing-y-3">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="bg-primary-hijauTua hover:bg-primary-hijauTua"
                        >
                            {headerGroup.headers.map((header, index) => {
                                const isSorted = sorting.length > 0 && sorting[0].id === header.column.id ? (sorting[0].desc ? 'desc' : 'asc') : false;
                                const canSort = header.column.getCanSort();
                                const handleToggleSorting = () => {
                                    if (!canSort) return;

                                    const currentId = header.column.id;
                                    const isCurrentlySorted = sorting.length > 0 && sorting[0].id === currentId;
                                    const isDesc = isCurrentlySorted ? sorting[0].desc : false;

                                    let newSorting = [];
                                    if (isCurrentlySorted && isDesc) {
                                    } else if (isCurrentlySorted) {
                                        newSorting = [{ id: currentId, desc: true }];
                                    } else {
                                        newSorting = [{ id: currentId, desc: false }];
                                    }
                                    setSorting(newSorting);
                                };

                                return (
                                    <TableHead
                                        key={header.id}
                                        onClick={handleToggleSorting}
                                        className={cn(
                                            "text-white font-bold select-none",
                                            canSort && "cursor-pointer",
                                            header.column.id === "no" && "text-center",
                                            index === 0 ? "rounded-l-lg" : "",
                                            index === headerGroup.headers.length - 1 ? "rounded-r-lg" : ""
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {canSort &&
                                                (isSorted === "asc" ? (
                                                    <ArrowUp className="w-3 h-3 opacity-80" />
                                                ) : isSorted === "desc" ? (
                                                    <ArrowDown className="w-3 h-3 opacity-80" />
                                                ) : (
                                                    <ArrowUpDown className="w-3 h-3 opacity-50" />
                                                ))}
                                        </div>
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className={cn(
                                    "font-medium text-primary-hijauTua transition-colors duration-150 ease-in-out",
                                    "hover:bg-gray-100 hover:text-primary-hijauTua"
                                )}
                            >
                                {row.getVisibleCells().map((cell, index) => (
                                    <TableCell
                                        key={cell.id}
                                        className={cn(
                                            "py-4 font-medium",
                                            cell.column.id === "no" && "text-center",
                                            index === 0 ? "rounded-l-lg" : "",
                                            index === row.getVisibleCells().length - 1
                                                ? "rounded-r-lg"
                                                : ""
                                        )}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center rounded-lg"
                            >
                                Tidak ada data yang cocok.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
    );
}

export function DataTablePagination({ currentPage, totalPages, goToPage }) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];

        const add = (p) => pages.push(p);

        if (currentPage > 3) {
            add(1);
            if (currentPage !== 4) add("...");
        }

        for (let p = currentPage - 1; p <= currentPage + 1; p++) {
            if (p > 0 && p <= totalPages) add(p);
        }

        if (currentPage < totalPages - 2) {
            if (currentPage !== totalPages - 3) add("...");
            add(totalPages);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <CardFooter className="flex justify-between items-center p-6 pt-4">
            <p className="text-sm text-gray-500">
                Halaman {currentPage} dari {totalPages}
            </p>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={16} />
                </Button>
                {pages.map((page, idx) =>
                    page === "..." ? (
                        <span
                            key={idx}
                            className="px-2 text-gray-400 select-none"
                        >
                            ...
                        </span>
                    ) : (
                        <Button
                            key={page}
                            size="sm"
                            variant={
                                currentPage === page ? "default" : "ghost"
                            }
                            onClick={() => goToPage(page)}
                            className={cn(
                                currentPage === page &&
                                "bg-primary-hijauTua hover:bg-primary-hijauTua/90"
                            )}
                        >
                            {page}
                        </Button>
                    )
                )}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight size={16} />
                </Button>
            </div>
        </CardFooter>
    );
}
