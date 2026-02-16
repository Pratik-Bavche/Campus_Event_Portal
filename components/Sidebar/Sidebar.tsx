"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    UserPlus,
    Users,
    Calendar,
    UserCheck,
    CreditCard,
    BarChart3,
    FileText,
    ShieldCheck,
    Bell,
    Settings,
    GraduationCap
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Club Approval Requests', href: '/admin/clubs/requests', icon: UserPlus },
    { label: 'Clubs Management', href: '/admin/clubs/manage', icon: Users },
    { label: 'Members Overview', href: '/admin/members', icon: UserCheck },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <div className="logo-container">
                <div className="logo-icon">
                    <GraduationCap size={20} />
                </div>
                <span className="logo-text">CampusAdmin</span>
            </div>

            <nav className="nav-section">
                <div className="nav-label">Main Menu</div>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-link ${isActive ? 'active' : ''}`}
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <Link href="/admin/profile" className="user-snippet">
                    <div className="user-avatar">DA</div>
                    <div className="user-info">
                        <span className="user-name">DYPCOE Admin</span>
                        <span className="user-role">Super Admin</span>
                    </div>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
