"use client";

import React from 'react';
import { Search, Calendar, Star, EyeOff, Trash2, MapPin, Users } from 'lucide-react';


const EventsManagement = () => {
    const events = [
        {
            id: 1,
            title: 'Hackathon 2025',
            club: 'Coding Club',
            date: 'Jan 20, 2025',
            registered: 240,
            status: 'Upcoming',
            isFeatured: true
        },
        {
            id: 2,
            title: 'Nataraj Dance Fest',
            club: 'Pulse Dance Club',
            date: 'Jan 25, 2025',
            registered: 156,
            status: 'Upcoming',
            isFeatured: false
        },
        {
            id: 3,
            title: 'Annual Tech Summit',
            club: 'AI Research Club',
            date: 'Dec 15, 2024',
            registered: 500,
            status: 'Completed',
            isFeatured: true
        },
        {
            id: 4,
            title: 'Photography Workshop',
            club: 'Creative Eyes',
            date: 'Feb 02, 2025',
            registered: 45,
            status: 'Ongoing',
            isFeatured: false
        },
    ];

    return (
        <div className="page-container">
            <div className="table-header-actions card">
                <div className="search-wrapper">
                    <Search size={18} className="text-muted" />
                    <input type="text" placeholder="Search events..." className="table-search" />
                </div>
                <div className="filter-actions">
                    <select className="input-field">
                        <option>All Status</option>
                        <option>Upcoming</option>
                        <option>Ongoing</option>
                        <option>Completed</option>
                        <option>Disabled</option>
                    </select>
                </div>
            </div>

            <div className="table-container card">
                <table>
                    <thead>
                        <tr>
                            <th>Event Title</th>
                            <th>Organizer (Club)</th>
                            <th>Date</th>
                            <th>Registrations</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>
                                    <div className="club-cell">
                                        <div className="club-avatar" style={{ background: event.isFeatured ? 'var(--warning-soft)' : 'var(--bg-main)', color: event.isFeatured ? 'var(--warning)' : 'var(--secondary)' }}>
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <strong>{event.title}</strong>
                                            {event.isFeatured && <span style={{ marginLeft: '8px', fontSize: '0.6rem', background: 'var(--warning-soft)', color: 'var(--warning)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>FEATURED</span>}
                                        </div>
                                    </div>
                                </td>
                                <td>{event.club}</td>
                                <td>{event.date}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Users size={14} className="text-muted" />
                                        <strong>{event.registered}</strong>
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${event.status === 'Upcoming' ? 'badge-info' :
                                        event.status === 'Ongoing' ? 'badge-approved' :
                                            event.status === 'Completed' ? 'badge-secondary' : 'badge-rejected'
                                        }`}>
                                        {event.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-cells">
                                        <button className="btn-icon-box" title={event.isFeatured ? "Unfeature" : "Feature"} style={{ color: event.isFeatured ? 'var(--warning)' : 'inherit' }}>
                                            <Star size={18} fill={event.isFeatured ? 'var(--warning)' : 'none'} />
                                        </button>
                                        <button className="btn-icon-box" title="Disable"><EyeOff size={18} /></button>
                                        <button className="btn-icon-box text-danger" title="Remove"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventsManagement;
