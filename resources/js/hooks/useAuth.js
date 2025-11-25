import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { router, usePage } from "@inertiajs/react";
import { authService } from "@/services/authService";
import {
    DEFAULT_REDIRECT_PATH,
    ERROR_MESSAGES,
    ROLE_REDIRECT_MAP,
} from "@/utils/constant/auth";

const resolveBaseUrl = () => {
    // 1) Explicit env (should include subfolder/public)
    if (import.meta.env.VITE_APP_URL) {
        return import.meta.env.VITE_APP_URL.replace(/\/$/, "");
    }

    // 2) Detect `/public` segment from current URL (e.g., /PBL_LIMS_TI-2A/public/auth/login)
    const { origin, pathname } = window.location;
    const publicIndex = pathname.indexOf("/public");
    if (publicIndex !== -1) {
        return `${origin}${pathname.substring(0, publicIndex + "/public".length)}`.replace(/\/$/, "");
    }

    // 3) Fallback to meta tag if provided
    const metaAppUrl = document.querySelector('meta[name="app-url"]')?.content;
    if (metaAppUrl) return metaAppUrl.replace(/\/$/, "");

    // 4) Default origin
    return origin;
};

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const { url } = usePage();

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await authService.getUser();
                const fetchedUser = response?.user;

                if (!fetchedUser) throw new Error("User data missing");

                if (isMounted) {
                    setUser(fetchedUser);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                if (isMounted) {
                    setUser(null);
                    setIsAuthenticated(false);
                }

                if (url !== "/auth/login") {
                    toast.error(ERROR_MESSAGES.SESSION_EXPIRED);
                    router.visit("/auth/login");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        initializeAuth();

        return () => { isMounted = false; };
    }, []);

    const login = useCallback(async (credentials) => {
        setLoading(true);

        try {
            const response = await authService.login(credentials);
            const userData = response?.user;

            setUser(userData);
            setIsAuthenticated(true);
            toast.success(ERROR_MESSAGES.SUCCESSFUL_LOGIN);

            const basePath = resolveBaseUrl();
            const redirectPath =
                ROLE_REDIRECT_MAP[userData.role] || DEFAULT_REDIRECT_PATH;
            const target = `${basePath}${redirectPath}`;

            router.visit(target);

            return response;
        } catch (error) {
            toast.error(error.message || ERROR_MESSAGES.LOGIN_FAILED);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setLoading(true);

        try {
            await authService.logout();

            setUser(null);
            setIsAuthenticated(false);
            toast.success(ERROR_MESSAGES.SUCCESSFUL_LOGOUT);

            router.visit("/auth/login");
        } catch (error) {
            toast.error(error.message || ERROR_MESSAGES.LOGOUT_FAILED);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
    };
};
