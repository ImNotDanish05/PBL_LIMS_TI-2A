import { Head, usePage } from '@inertiajs/react';
import { useCallback, useMemo } from 'react';

import { menuItems } from '@/utils/menu';
import { Sidebar } from './sidebar';
import { HeaderCard } from '../shared/dashboard/header-card';

import { useAuth } from '@/hooks/useAuth';
import Loading from '../ui/loading';

export default function DashboardLayout({
    children,
    title,
    header = "Hello World!",
    notificationCount = 3,
}) {
    const { url } = usePage();
    const { user, loading, logout } = useAuth();

    const currentUser = useMemo(() => user ?? { name: "Guest", role: "guest" }, [user]);

    const sidebarMenu = useMemo(() => menuItems(url), [url]);

    const handleLogout = useCallback(() => logout(), [logout]);

    return (
        <div className="p-4 flex gap-4 h-screen bg-primary-hijauTerang">
            <Head title={title} />

            <Sidebar menuItems={sidebarMenu} onLogout={handleLogout} />

            <div className="flex-1 flex flex-col overflow-hidden">

                <header className="mb-6">
                    <HeaderCard
                        title={header}
                        user={currentUser}
                        notificationCount={notificationCount}
                        onLogout={handleLogout}
                    />
                </header>

                <main className="flex-1 overflow-auto">
                    <div className="max-w-[1600px] mx-auto px-1">
                        {loading ? <Loading /> : children}
                    </div>
                </main>
            </div>
        </div>
    );
}
