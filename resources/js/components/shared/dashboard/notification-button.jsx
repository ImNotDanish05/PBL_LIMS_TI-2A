import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NotificationButton = ({ count = 0 }) => (
    <Button
        variant="ghost"
        size="icon"
        className="
            relative w-14 h-14 
            bg-white/10 hover:bg-white/20 hover:text-gray-300
            text-white rounded-xl 
            transition-all duration-300
        "
    >
        <Bell className="!w-4 !h-4" />
        {count > 0 && (
            <span className="
                absolute -top-1 -right-1 
                w-5 h-5 bg-red-500 
                rounded-full text-xs 
                flex items-center justify-center 
                font-bold shadow-lg
                animate-pulse
            ">
                {count}
            </span>
        )}
    </Button>
);