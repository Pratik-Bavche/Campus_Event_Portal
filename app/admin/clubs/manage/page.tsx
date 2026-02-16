"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, MoreVertical, Edit, UserMinus, Trash2, ExternalLink, CheckCircle, XCircle, Save, X } from 'lucide-react';
import ApprovalModal from '@/components/ApprovalModal/ApprovalModal';

const ClubsManagement = () => {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<'Approved' | 'Rejected'>('Approved');
    const [clubs, setClubs] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedClub, setSelectedClub] = useState<any>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Edit Form State
    const [editForm, setEditForm] = useState({ name: '', president: '', contact: '' });

    useEffect(() => {
        if (selectedClub) {
            setEditForm({
                name: selectedClub.name || '',
                president: selectedClub.president || '',
                contact: selectedClub.contact || '' // Use contact from request
            });
        }
    }, [selectedClub]);

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab === 'Approved' || tab === 'Rejected') {
            setActiveTab(tab);
        }

        const search = searchParams.get('search');
        if (search) {
            setSearchTerm(decodeURIComponent(search));
        }
    }, [searchParams]);

    useEffect(() => {
        // Load real data from localStorage
        const storedRequests = JSON.parse(localStorage.getItem('club_requests') || '[]');
        setClubs(storedRequests);
    }, []);

    const deleteClub = (id: number) => {
        if (confirm('Are you sure you want to permanently delete this club record? This action cannot be undone.')) {
            const updatedClubs = clubs.filter(c => c.id !== id);
            setClubs(updatedClubs);
            localStorage.setItem('club_requests', JSON.stringify(updatedClubs));
        }
    };

    // Filter clubs based on the active tab
    const filteredClubs = clubs
        .filter(club => club.status === activeTab)
        .filter(club => {
            if (!searchTerm) return true;
            const q = searchTerm.toLowerCase();
            return (
                (club.name || '').toString().toLowerCase().includes(q) ||
                (club.president || '').toString().toLowerCase().includes(q) ||
                (club.category || '').toString().toLowerCase().includes(q) ||
                (`#CLB-${club.id}`.toLowerCase().includes(q))
            );
        });

    return (
        <div className="page-container">


            <div className="table-header-actions card">
                <div className="search-wrapper">
                    <Search size={18} className="text-muted" />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab.toLowerCase()} clubs...`}
                        className="table-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-actions">
                    <select
                        className="input-field"
                        style={{ width: 'auto', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', cursor: 'pointer' }}
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value as 'Approved' | 'Rejected')}
                    >
                        <option value="Approved">Approved Clubs</option>
                        <option value="Rejected">Rejected Clubs</option>
                    </select>
                </div>
            </div>

            <div className="table-container card">
                {filteredClubs.length === 0 ? (
                    <div className="p-12 text-center text-muted">
                        {activeTab === 'Approved'
                            ? 'No approved clubs found yet.'
                            : 'No rejected clubs found.'}
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Club Name</th>
                                <th>Category</th>
                                <th>President</th>
                                <th>{activeTab === 'Approved' ? 'Members' : 'Rejection Date'}</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClubs.map((club) => (
                                <tr key={club.id}>
                                    <td>
                                        <div className="club-cell">
                                            <div className="club-avatar" style={{
                                                background: activeTab === 'Approved' ? '#eff6ff' : '#fef2f2',
                                                color: activeTab === 'Approved' ? '#2563eb' : '#dc2626'
                                            }}>
                                                {club.name ? club.name.charAt(0) : '?'}
                                            </div>
                                            <div>
                                                <strong>{club.name}</strong>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: #CLB-{club.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-info">{club.category}</span></td>
                                    <td><strong>{club.president}</strong></td>
                                    <td>
                                        {activeTab === 'Approved' ? (
                                            '0' // Default to 0 since we don't have member count in registration
                                        ) : (
                                            club.date // Use request date as proxy for now
                                        )}
                                    </td>
                                    <td>
                                        <span className={`badge ${club.status === 'Approved' ? 'badge-success' : 'badge-danger'
                                            }`}>
                                            {club.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-cells">
                                            <button className="btn-icon-box" title="View" onClick={() => {
                                                setSelectedClub(club);
                                                setIsViewModalOpen(true);
                                            }}>
                                                <ExternalLink size={18} />
                                            </button>

                                            {activeTab === 'Approved' ? (
                                                <>
                                                    <button className="btn-icon-box" title="Edit" onClick={() => {
                                                        setSelectedClub(club);
                                                        setIsEditModalOpen(true);
                                                    }}>
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        className="btn-icon-box text-danger"
                                                        title="Delete"
                                                        onClick={() => deleteClub(club.id)}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="btn-icon-box text-danger"
                                                    title="Delete Permanent Record"
                                                    onClick={() => deleteClub(club.id)}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {/* View Modal */}
            <ApprovalModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                request={selectedClub}
            />

            {/* Edit Modal */}
            {isEditModalOpen && selectedClub && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="bg-card p-6 rounded-lg w-full max-w-md" style={{
                        backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)',
                        width: '90%', maxWidth: '500px', border: '1px solid var(--border)'
                    }}>
                        <div className="flex justify-between items-center mb-4" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 className="text-xl font-bold" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Edit Club Details</h3>
                            <button onClick={() => setIsEditModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}><X size={20} /></button>
                        </div>

                        <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Club Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>President Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={editForm.president}
                                    onChange={e => setEditForm({ ...editForm, president: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Mobile Number</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={editForm.contact}
                                    onChange={e => setEditForm({ ...editForm, contact: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-2" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button
                                className="px-4 py-2 rounded border"
                                onClick={() => setIsEditModalOpen(false)}
                                style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)' }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-primary text-white flex items-center gap-2"
                                onClick={() => {
                                    const updatedClubs = clubs.map(c => c.id === selectedClub.id ? { ...c, ...editForm } : c);
                                    setClubs(updatedClubs);
                                    localStorage.setItem('club_requests', JSON.stringify(updatedClubs));
                                    setIsEditModalOpen(false);
                                }}
                                style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClubsManagement;
