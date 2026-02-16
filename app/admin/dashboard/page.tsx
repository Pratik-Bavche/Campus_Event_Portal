"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatCard from '@/components/StatCard/StatCard';
import {
    Users,
    Hourglass,
    UserCheck
} from 'lucide-react';
import '../admin.css';
import './dashboard.css';

const AdminDashboard = () => {
    const router = useRouter();
    const [totalRequests, setTotalRequests] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [registeredMembers, setRegisteredMembers] = useState(0);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    useEffect(() => {
        // Load count from localStorage
        try {
            let storedRequests = JSON.parse(localStorage.getItem('club_requests') || '[]');
            const storedMembers = JSON.parse(localStorage.getItem('members') || 'null');

            if (!Array.isArray(storedRequests) || storedRequests.length === 0) {
                // Seed default data if empty to ensure dashboard looks good
                const defaultRequests = [
                    {
                        id: 101,
                        name: "Google Developer Student Club",
                        category: "Technical",
                        president: "Aarav Patel",
                        email: "aarav.patel@example.com",
                        status: "Pending",
                        date: new Date().toLocaleDateString(),
                        description: "A community for students to learn and build with Google technologies."
                    },
                    {
                        id: 102,
                        name: "Canvas Art Society",
                        category: "Arts & Culture",
                        president: "Priya Sharma",
                        email: "priya.sharma@example.com",
                        status: "Pending",
                        date: new Date(Date.now() - 86400000).toLocaleDateString(), // Yesterday
                        description: "Bringing colors to campus through workshops and exhibitions."
                    },
                    {
                        id: 103,
                        name: "Eco-Warriors Alliance",
                        category: "Social",
                        president: "Rohan Gupta",
                        email: "rohan.gupta@example.com",
                        status: "Pending",
                        date: new Date(Date.now() - 172800000).toLocaleDateString(), // 2 days ago
                        description: "Dedicated to promoting sustainability and green initiatives on campus."
                    }
                ];
                storedRequests = defaultRequests;
                localStorage.setItem('club_requests', JSON.stringify(defaultRequests));
            }

            const normalize = (s: any) => (typeof s === 'string' ? s.toLowerCase() : '');
            const approved = storedRequests.filter((r: any) => normalize(r.status) === 'approved').length;
            const rejected = storedRequests.filter((r: any) => normalize(r.status) === 'rejected').length;
            const total = storedRequests.length;

            // "Total Registered" now represents Processed (Approved + Rejected) per user request
            const processedCount = approved + rejected;

            setTotalRequests(total);
            setApprovedCount(approved);
            setRegisteredMembers(processedCount);

            // Get recent activity (last 5 requests)
            // Sort by date (Newest First) and get top 5
            const recent = [...storedRequests]
                .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5);
            setRecentActivity(recent);

        } catch (e) {
            console.error(e);
            setTotalRequests(0);
            setApprovedCount(0);
            setRegisteredMembers(0);
        }
    }, []);

    const stats = [
        {
            label: 'Total Requests',
            value: totalRequests,
            icon: Hourglass,
            color: '#2563eb', // Blue
        },
        {
            label: 'Total Approved',
            value: approvedCount,
            icon: UserCheck,
            color: '#10b981', // Green
            onClick: () => router.push('/admin/clubs/manage?tab=Approved')
        },
        {
            label: 'Total Decisions', // Renaming for clarity as it is Approved + Rejected
            value: registeredMembers,
            icon: Users, // Using Users icon but maybe CheckCircle is better? Keeping Users as per reused code
            color: '#8b5cf6', // Purple
            onClick: () => router.push('/admin/clubs/manage')
        }
    ];

    const getStatusBadge = (status: string) => {
        const s = status.toLowerCase();
        if (s === 'approved') return 'badge-approved';
        if (s === 'rejected') return 'badge-rejected';
        return 'badge-pending';
    };

    return (
        <div className="dashboard-content">
            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            <div className="mt-6">
                <div className="section-header">
                    <h3>Platform Overview</h3>
                    <button onClick={() => router.push('/admin/clubs/requests')} className="btn-text">
                        View All Requests
                    </button>
                </div>

                <div className="card table-container">
                    <table className="mini-table">
                        <thead>
                            <tr>
                                <th>Club Name</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center text-muted p-4">No recent activity</td>
                                </tr>
                            ) : (
                                recentActivity.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="font-semibold">{item.name || 'Untitled Club'}</td>
                                        <td>{item.category || 'General'}</td>
                                        <td>{item.date || new Date().toLocaleDateString()}</td>
                                        <td>
                                            <span className={`badge ${getStatusBadge(item.status || 'pending')}`}>
                                                {item.status || 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
