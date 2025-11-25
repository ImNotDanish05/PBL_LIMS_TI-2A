import { useState, useCallback } from "react";

export function useEntitySelection() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [temp, setTemp] = useState([]);
    const [confirmed, setConfirmed] = useState([]);

    const initialize = useCallback((items) => {
        setConfirmed(items);
    }, []);

    const openDialog = useCallback(() => {
        setTemp([...confirmed]);
        setIsDialogOpen(true);
    }, [confirmed]);

    const setDialogOpen = useCallback((open) => {
        if (!open) {
            setTemp([]);
        }
        setIsDialogOpen(open);
    }, []);

    const toggleTemp = useCallback((item) => {
        if (!item) return;

        setTemp((prev) => {
            const exists = prev.find((i) => i.id === item.id);
            return exists
                ? prev.filter((i) => i.id !== item.id)
                : [...prev, item];
        });
    }, []);

    const confirm = useCallback(() => {
        setConfirmed([...temp]);
        setIsDialogOpen(false);
    }, [temp]);

    const remove = useCallback((fieldName, itemId) => {
        setConfirmed((prev) => prev.filter((i) => i.id !== itemId));
    }, []);

    return {
        isDialogOpen,
        temp,
        confirmed,
        initialize,
        openDialog,
        setDialogOpen,
        toggleTemp,
        confirm,
        remove,
    };
}
