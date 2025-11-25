import { Bell, ChevronDown, FlaskConical, Users, Database, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeaderCard = ({ children, className = "" }) => (
    <div className={`
        flex items-center gap-4 px-6 py-5 
        bg-primary-hijauTua
        rounded-2xl shadow-xl backdrop-blur-sm
        border border-white/5
        ${className}
    `}>
        {children}
    </div>
);

export default function DashboardHeader({ header, user }) {
    return (
        <header className="mb-6">
            <HeaderCard className="w-full justify-between">
                <div className="flex items-center gap-4">
                    <FlaskConical size={48} className="text-white/90" />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold tracking-tight text-white">
                            {header}
                        </h2>
                        <Badge
                            variant="secondary"
                            className="mt-1.5 text-sm bg-white/20 text-white hover:bg-white/30 border-white/20"
                        >
                            Beranda
                        </Badge>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="
                                relative w-14 h-14 
                                bg-white/10 hover:bg-white/20 
                                text-white rounded-xl 
                                transition-all duration-300
                            "
                    >
                        <Bell className="!w-4 !h-4" />
                        <span className="
                                absolute -top-1 -right-1 
                                w-5 h-5 bg-red-500 
                                rounded-full text-xs 
                                flex items-center justify-center 
                                font-bold shadow-lg
                                animate-pulse
                            ">
                            3
                        </span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="
                                        flex items-center gap-3 
                                        bg-white/10 hover:bg-white/20 
                                        text-white rounded-xl 
                                        px-4 h-14 
                                        transition-all duration-300
                                    "
                            >
                                <Avatar className="w-9 h-9 ring-2 ring-white/30 ring-offset-2 ring-offset-transparent">
                                    <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                                    <AvatarFallback className="bg-primary-hijauMuda text-white font-semibold">
                                        {userInitial}p
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-left">
                                    <p className="font-semibold text-sm leading-none">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-white/70 mt-1.5">
                                        {user.role}
                                    </p>
                                </div>
                                <ChevronDown size={16} className="opacity-70" />
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
                                        admin@example.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="hover:bg-white/10 cursor-pointer py-2.5">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-white/10 cursor-pointer py-2.5">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer py-2.5">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </HeaderCard>
        </header>
    );
}
