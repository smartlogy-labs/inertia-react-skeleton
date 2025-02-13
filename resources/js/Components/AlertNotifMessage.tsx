import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/hooks/use-toast';
import { ToastProvider, ToastViewport } from '@/Components/ui/toast';

interface FlashProps {
    message: string | null;
    type: 'success' | 'error' | 'warning' | 'info';
}

const variantMap: Record<FlashProps['type'], 'default' | 'destructive'> = {
    success: 'default',
    info: 'default',
    warning: 'default',
    error: 'destructive',
};

const Alert: React.FC = () => {
    const { props } = usePage();
    const flash = props.flash as FlashProps;
    const { toast } = useToast();

    useEffect(() => {
        if (flash.message) {
            toast({
                title: flash.type.charAt(0).toUpperCase() + flash.type.slice(1),
                description: flash.message,
                variant: variantMap[flash.type],
                duration: 3000,
            });
        }
    }, [flash.message, flash.type, toast]);

    return (
        <ToastProvider>
            <ToastViewport className="fixed top-4 right-4 z-50" />
        </ToastProvider>
    );
};

export default Alert;
