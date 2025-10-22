import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased">
            {children}
        </div>
    );
}
