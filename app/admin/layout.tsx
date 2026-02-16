"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Navbar from '@/components/Navbar/Navbar';
import { usePathname } from 'next/navigation';
import './admin.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const getTitle = (path: string) => {
        const parts = path.split('/').filter(Boolean);
        // If it's just /admin or root, return Dashboard
        if (parts.length === 1 && parts[0] === 'admin') return 'Dashboard';
        if (parts.length === 0) return 'Dashboard';

        const lastPart = parts[parts.length - 1];
        return lastPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const title = getTitle(pathname);

    // If we are on the login page, render full screen without sidebar/navbar
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="admin-shell">
            <Sidebar />
            <div className="admin-content-wrapper">
                <Navbar title={title} />
                <div className="admin-main-container">
                    {children}
                </div>
            </div>
        </div>
    );
}
