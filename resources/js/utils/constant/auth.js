export const ROLE_REDIRECT_MAP = {
    admin: "/admin",
    analyst: "/analyst",
    manager: "/manager",
    staff: "/staff/manage-clients",
    supervisor: "/supervisor",
    client: "/client",
};

export const DEFAULT_REDIRECT_PATH = "/";

export const ERROR_MESSAGES = {
    SESSION_EXPIRED: "Session telah berakhir. Silahkan login kembali.",
    LOGIN_FAILED: "Login gagal",
    LOGOUT_FAILED: "Logout gagal",
    SUCCESSFUL_LOGIN: "Berhasil login!",
    SUCCESSFUL_LOGOUT: "Berhasil logout!",
};