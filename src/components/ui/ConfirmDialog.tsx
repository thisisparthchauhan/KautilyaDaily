import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isDestructive?: boolean;
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    isDestructive = false,
}: ConfirmDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                ref={dialogRef}
                className="w-full max-w-md bg-kau-surface border border-white/10 rounded-xl shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
            >
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <h2 id="dialog-title" className="text-lg font-semibold text-kau-text">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-kau-text-secondary hover:text-kau-text transition-colors rounded-lg hover:bg-white/5"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-kau-text-secondary">{message}</p>
                </div>

                <div className="flex items-center justify-end gap-3 p-4 border-t border-white/5 bg-black/20 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-kau-text-secondary hover:text-kau-text transition-colors rounded-lg hover:bg-white/5"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={cn(
                            "px-4 py-2 text-sm font-medium text-kau-bg rounded-lg transition-colors",
                            isDestructive
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-kau-accent hover:bg-kau-accent/90"
                        )}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
