import {
    Home,
    Wrench,
    FlaskConical,
    Beaker,
    Microscope,
    Gauge,
    Scale,
    FileCheck2,
    TrendingUp,
    Users,
    ShoppingCart,
    Factory,
    Building2,
    Ruler,
    FileText,
    ClipboardList,
    TestTube2,
    ChartArea,
    ListCheck,
    ScrollText,
    GraduationCap,
    Award,
    BarChart3,
} from "lucide-react";

const isActive = (currentUrl, href, subItems = []) => {
    if (currentUrl === href) return true;
    if (
        currentUrl.startsWith(href) &&
        href !== "/admin" &&
        href !== "/manager" &&
        href !== "/analyst" &&
        href !== "/staff" &&
        href !== "/supervisor" &&
        href !== "/client"
    )
        return true;
    if (subItems.length > 0) {
        return subItems.some((sub) => currentUrl.startsWith(sub.href));
    }
    return false;
};

const getRoleFromUrl = (url) => {
    if (url.startsWith("/analyst")) return "analyst";
    if (url.startsWith("/admin")) return "admin";
    if (url.startsWith("/manager")) return "manager";
    if (url.startsWith("/staff")) return "staff";
    if (url.startsWith("/client")) return "client";
    if (url.startsWith("/supervisor")) return "supervisor";
    return null;
};

const MENU_CONFIG = {
    analyst: [
        {
            name: "Beranda",
            icon: Home,
            href: "/analyst/dashboard",
        },
        {
            name: "Daftar Pesanan",
            icon: ScrollText,
            href: "/analyst/order",
        },
    ],

    admin: [
        {
            name: "Beranda",
            icon: Home,
            href: "/admin",
        },
        {
            name: "Alat & Bahan",
            icon: Wrench,
            subItems: [
                {
                    name: "Peralatan",
                    icon: Microscope,
                    href: "/admin/resources/equipments",
                },
                {
                    name: "Jenis Brand",
                    icon: Factory,
                    href: "/admin/resources/brands",
                },
                {
                    name: "Reagen",
                    icon: Beaker,
                    href: "/admin/resources/reagents",
                },
                {
                    name: "Tingkat Reagen",
                    icon: Scale,
                    href: "/admin/resources/grades",
                },
                {
                    name: "Pemasok",
                    icon: Building2,
                    href: "/admin/resources/suppliers",
                },
            ],
        },
        {
            name: "Pengujian",
            icon: ClipboardList,
            subItems: [
                {
                    name: "Parameter",
                    icon: Gauge,
                    href: "/admin/tests/parameters",
                },
                {
                    name: "Metode Uji",
                    icon: Microscope,
                    href: "/admin/tests/methods",
                },
                {
                    name: "Nilai Satuan",
                    icon: Ruler,
                    href: "/admin/tests/units",
                },
                {
                    name: "Standard Referensi",
                    icon: FileText,
                    href: "/admin/tests/references",
                },
                {
                    name: "Kategori Sampel",
                    icon: TestTube2,
                    href: "/admin/tests/categories",
                },
            ],
        },
        {
            name: "Analis",
            icon: BarChart3,
            subItems: [
                {
                    name: "Pelatihan",
                    icon: GraduationCap,
                    href: "/admin/analyst/trainings",
                },
                {
                    name: "Sertifikat",
                    icon: Award,
                    href: "/admin/analyst/certificates",
                },
            ],
        },
        {
            name: "Order",
            icon: ShoppingCart,
            href: "/admin/orders",
        },
        {
            name: "Pengguna",
            icon: Users,
            href: "/admin/users",
        },
        {
            name: "Laporan",
            icon: TrendingUp,
            href: "/admin/reports",
        },
    ],

    manager: [
        {
            name: "Beranda",
            icon: Home,
            href: "/manager",
        },
        {
            name: "Validasi Laporan",
            icon: FileCheck2,
            href: "/manager/report-validation",
        },
        {
            name: "Pengujian",
            icon: ClipboardList,
            subItems: [
                {
                    name: "Parameter",
                    icon: Gauge,
                    href: "/manager/tests/parameters",
                },
                {
                    name: "Metode Uji",
                    icon: Microscope,
                    href: "/manager/tests/methods",
                },
                {
                    name: "Nilai Satuan",
                    icon: Ruler,
                    href: "/manager/tests/units",
                },
                {
                    name: "Standard Referensi",
                    icon: FileText,
                    href: "/manager/tests/references",
                },
                {
                    name: "Kategori Sampel",
                    icon: TestTube2,
                    href: "/manager/tests/categories",
                },
            ],
        },
        {
            name: "Order",
            icon: ShoppingCart,
            href: "/manager/orders",
        },
        {
            name: "Laporan",
            icon: ChartArea,
            href: "/manager/reports",

        },
        {
            name: "Karyawan",
            icon: Users,
            href: "/manager/users",
        }
    ],

    staff: [
        {
            name: "Orders",
            icon: ChartArea,
            href: "/staff/orders",
        },
        {
            name: "Manajemen Klien",
            icon: ListCheck,
            href: "/staff/manage-clients",
        },
    ],

    client: [
        {
            name: "Beranda",
            icon: Home,
            href: "/client",
        },
        {
            name: "Riwayat",
            icon: ChartArea,
            href: "/client/history",
        },
    ],

    supervisor: [{ name: "Beranda", icon: Home, href: "/supervisor" }],
};

export function menuItems(url) {
    const role = getRoleFromUrl(url);

    if (!role || !MENU_CONFIG[role]) {
        return [];
    }

    return MENU_CONFIG[role].map((item) => ({
        ...item,
        active: isActive(url, item.href, item.subItems),
        subItems: item.subItems?.map((sub) => ({
            ...sub,
            active: isActive(url, sub.href),
        })),
    }));
}

export { MENU_CONFIG, getRoleFromUrl, isActive };
