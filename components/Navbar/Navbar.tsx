"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, HelpCircle, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
    title: string;
}

const Navbar = ({ title }: NavbarProps) => {
    const router = useRouter();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query) {
            setSearchResults([]);
            return;
        }

        try {
            const storedClubs = JSON.parse(localStorage.getItem('club_requests') || '[]');
            const filtered = storedClubs.filter((c: any) =>
                (c.name || '').toLowerCase().includes(query.toLowerCase()) ||
                (c.category || '').toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filtered);
        } catch (error) {
            console.error(error);
            setSearchResults([]);
        }
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const notifications = [
        { id: 1, type: 'success', message: 'Robotics Club registration successfully approved.', time: '2 mins ago' },
        { id: 2, type: 'warning', message: 'New club request: "AI Research" pending review.', time: '1 hour ago' },
        { id: 3, type: 'success', message: 'Drama Club event "Play 2025" approved.', time: '3 hours ago' },
        { id: 4, type: 'info', message: 'System maintenance scheduled for tonight.', time: '5 hours ago' }
    ];

    return (
        <nav className="navbar">
            <div className="nav-left">
                <h1 className="page-title">{title}</h1>
            </div>

            <div className="nav-right">
                <div className="search-bar relative">
                    <Search size={18} className="text-muted" />
                    <input
                        type="text"
                        placeholder="Search clubs..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => setIsSearchOpen(true)}
                        onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                    />
                    {isSearchOpen && searchQuery && (
                        <div className="search-results-dropdown">
                            {searchResults.length > 0 ? (
                                searchResults.map(club => (
                                    <div
                                        key={club.id}
                                        className="search-result-item"
                                        onMouseDown={(e) => {
                                            e.preventDefault(); // Prevent focus loss immediately if needed, though onMouseDown is enough to beat onBlur
                                            if (club.status === 'Pending') {
                                                router.push(`/admin/clubs/requests?requestId=${club.id}`);
                                            } else {
                                                router.push(`/admin/clubs/manage?tab=${club.status}&search=${encodeURIComponent(club.name)}`);
                                            }
                                            setSearchQuery('');
                                            setIsSearchOpen(false);
                                        }}
                                    >
                                        <div className="result-avatar">
                                            {club.name.charAt(0)}
                                        </div>
                                        <div className="result-info">
                                            <span className="result-name">{club.name}</span>
                                            <span className="result-status">{club.status}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-results">No clubs found</div>
                            )}
                        </div>
                    )}
                </div>

                <button className="nav-icon-btn">
                    <HelpCircle size={20} />
                </button>

                <div className="relative" ref={notifRef}>
                    <button
                        className="nav-icon-btn"
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                    >
                        <Bell size={20} />
                        <span className="notification-badge"></span>
                    </button>

                    {isNotifOpen && (
                        <div className="notification-popover">
                            <div className="popover-header">
                                <h4>Notifications</h4>
                                <span className="mark-read">Mark all as read</span>
                            </div>
                            <div className="notification-list">
                                {notifications.map(notif => (
                                    <div key={notif.id} className="notif-item">
                                        <div className="notif-icon" style={{
                                            background: notif.type === 'success' ? 'var(--success-soft)' :
                                                notif.type === 'warning' ? 'var(--warning-soft)' : 'var(--info-soft)',
                                            color: notif.type === 'success' ? 'var(--success)' :
                                                notif.type === 'warning' ? 'var(--warning)' : 'var(--info)'
                                        }}>
                                            {notif.type === 'success' ? <CheckCircle2 size={18} /> :
                                                notif.type === 'warning' ? <AlertCircle size={18} /> : <Clock size={18} />}
                                        </div>
                                        <div className="notif-content">
                                            <p className="notif-message">{notif.message}</p>
                                            <span className="notif-time">{notif.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
