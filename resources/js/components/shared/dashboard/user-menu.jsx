import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@inertiajs/react';

export const UserMenu = ({ user, onLogout }) => {
    const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

    const getProfileUrl = (role) => {
        const normalized = role?.toLowerCase();
        switch (normalized) {
            case 'manager':
                return '/manager/profile';
            case 'staff':
                return '/staff/profile';
            case 'supervisor':
                return '/supervisor/profile';
            case 'analyst':
                return '/analyst/profile';
            case 'client':
                return '/client/profile';
            default:
                return '/profile';
        }
    };

    const profileUrl = getProfileUrl(user?.role);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="
                        flex items-center gap-3 
                        bg-white/10 hover:bg-white/20 
                        text-white rounded-xl 
                        px-4 h-14 group
                        transition-all duration-300
                    "
                >
                    <Avatar className="w-9 h-9 ring-2 ring-white/30 ring-offset-2 ring-offset-transparent">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.role)}`} alt={user?.name} />
                        <AvatarFallback className="bg-white/20 text-white font-semibold">
                            {userInitial}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                        <p className="font-semibold text-sm leading-none text-white group-hover:text-gray-300">
                            {user.name}
                        </p>
                        <p className="text-xs text-white/70 mt-1.5">
                            {user.role}
                        </p>
                    </div>
                    <ChevronDown size={16} className="opacity-70 group-hover:text-gray-300" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="
                    w-56 mr-4 
                    bg-primary-hijauTua 
                    text-white border-white/10
                    shadow-2xl
                "
                align="end"
            >
                <DropdownMenuLabel className="font-normal py-3">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name}
                        </p>
                        <p className="text-xs leading-none text-white/70">
                            {user.email || 'admin@example.com'}
                        </p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem className="hover:!bg-primary-hijauTerang cursor-pointer py-2.5">
                    <User className="mr-2 h-4 w-4" />
                    <Link href={profileUrl} className="w-full block">
                        Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:!bg-primary-hijauTerang cursor-pointer py-2.5">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem
                    onClick={onLogout}
                    className="text-red-400 hover:!text-white hover:!bg-red-400 cursor-pointer py-2.5"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
