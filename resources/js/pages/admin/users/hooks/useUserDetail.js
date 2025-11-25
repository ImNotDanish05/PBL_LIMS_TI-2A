import { useState, useCallback } from "react";

export function useUserDetail() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleShowDetail = useCallback((user) => {
        setSelectedUser(user);
        setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setSelectedUser(null);
    }, []);

    return {
        selectedUser,
        isOpen,
        handleShowDetail,
        handleClose,
    };
}
