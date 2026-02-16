"use client";

import React, { useEffect, useState } from 'react';
import { Search, Filter, Mail, ShieldAlert, UserCheck } from 'lucide-react';

const MembersOverview = () => {
    const [members, setMembers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        try {
            const storedClubs = JSON.parse(localStorage.getItem('club_requests') || '[]');

            // Derive members from approved clubs (use president as member)
            const derived = (storedClubs || [])
                .filter((c: any) => (c.status || '').toLowerCase() === 'approved')
                .map((c: any) => ({
                    id: c.id,
                    name: c.president || 'Unknown President',
                    contact: c.contact || '--',
                    email: c.email || (c.president ? `${c.president.replace(/\s+/g, '.').toLowerCase()}@college.edu` : ''),
                    club: c.name,
                    joined: c.date || new Date().toLocaleDateString(),
                    status: 'Active'
                }));

            setMembers(derived);
        } catch (e) {
            setMembers([]);
        }
    }, []);

    const filteredMembers = members.filter(m => {
        if (!searchTerm) return true;
        const q = searchTerm.toLowerCase();
        return (
            (m.name || '').toString().toLowerCase().includes(q) ||
            (m.email || '').toString().toLowerCase().includes(q) ||
            (m.club || '').toString().toLowerCase().includes(q) ||
            (m.contact || '').toString().toLowerCase().includes(q)
        );
    });

    return (
        <div className="page-container">
            <div className="table-header-actions card">
                <div className="search-wrapper">
                    <Search size={18} className="text-muted" />
                    <input
                        type="text"
                        placeholder="Search presidents..."
                        className="table-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-container card">
                <table>
                    <thead>
                        <tr>
                            <th>President Name</th>
                            <th>Club Name</th>
                            <th>Mobile Number</th>
                            <th>Email Address</th>
                            <th>Approved Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '24px 0', color: '#6b7280' }}>
                                    No approved clubs found.
                                </td>
                            </tr>
                        ) : (
                            filteredMembers.map((member) => (
                                <tr key={member.id}>
                                    <td>
                                        <div className="club-cell">
                                            <div className="user-avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                {member.name.split(' ').map((n: string) => n[0]).join('')}
                                            </div>
                                            <strong>{member.name}</strong>
                                        </div>
                                    </td>
                                    <td>{member.club}</td>
                                    <td>{member.contact}</td>
                                    <td>{member.email}</td>
                                    <td>{member.joined}</td>
                                    <td>
                                        <div className="action-cells">
                                            <button className="btn-icon-box" title="Email"><Mail size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MembersOverview;
