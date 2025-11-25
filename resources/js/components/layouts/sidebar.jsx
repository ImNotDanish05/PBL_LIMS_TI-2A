import { LogOut } from 'lucide-react';
import { NavItem } from '../shared/dashboard/nav-item';
import { Button } from '../ui/button';

export const Sidebar = ({ menuItems, onLogout }) => {
    if (!menuItems || menuItems.length === 0) {
        return null;
    }

    return (
        <aside className="w-60 bg-primary-hijauTua text-white flex flex-col shadow-2xl rounded-2xl overflow-hidden">
            <div className="p-8 border-b border-white/10 bg-white/5">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                    Dashboard
                </h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                {menuItems.map((item, index) => (
                    <NavItem
                        key={index}
                        item={item}
                    />
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <Button
                onClick={onLogout}
                    className="w-full flex justify-center items-center gap-2 px-5 py-3 rounded-lg bg-red-500/80 hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                    <LogOut size={20} />
                    Keluar
                </Button>
            </div>
        </aside>
    );
};