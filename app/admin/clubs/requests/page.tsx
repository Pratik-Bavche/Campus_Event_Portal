"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Eye, CheckCircle, XCircle } from 'lucide-react';
import ApprovalModal from '@/components/ApprovalModal/ApprovalModal';

const ClubApprovalRequests = () => {
    const searchParams = useSearchParams();
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requests, setRequests] = useState<any[]>([]);
    const [filterStatus, setFilterStatus] = useState('Pending');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        // Load requests from localStorage
        const storedRequests = JSON.parse(localStorage.getItem('club_requests') || '[]');

        // Seed default data if empty (logic omitted for brevity but preserved in principle if we were writing whole file, here just updating)
        // ... well, actually I need to keep the seeding logic or the tool will overwrite it. 
        // Let's rewrite the useEffect fully to be safe.

        let loadedRequests = storedRequests;
        if (storedRequests.length === 0) {
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
                    date: new Date(Date.now() - 86400000).toLocaleDateString(),
                    description: "Bringing colors to campus through workshops and exhibitions."
                },
                {
                    id: 103,
                    name: "Eco-Warriors Alliance",
                    category: "Social",
                    president: "Rohan Gupta",
                    email: "rohan.gupta@example.com",
                    status: "Pending",
                    date: new Date(Date.now() - 172800000).toLocaleDateString(),
                    description: "Dedicated to promoting sustainability and green initiatives on campus."
                }
            ];
            loadedRequests = defaultRequests;
            localStorage.setItem('club_requests', JSON.stringify(defaultRequests));
        }
        setRequests(loadedRequests);
    }, []);

    // Effect to handle opening modal via query param
    useEffect(() => {
        const requestId = searchParams.get('requestId');
        if (requestId && requests.length > 0) {
            const req = requests.find(r => r.id.toString() === requestId);
            if (req) {
                setSelectedRequest(req);
                setIsModalOpen(true);
            }
        }
    }, [searchParams, requests]);

    const updateRequestStatus = (id: number, newStatus: string) => {
        const updatedRequests = requests.map(req =>
            req.id === id ? { ...req, status: newStatus } : req
        );
        setRequests(updatedRequests);
        localStorage.setItem('club_requests', JSON.stringify(updatedRequests));

        if (selectedRequest && selectedRequest.id === id) {
            setIsModalOpen(false);
            setSelectedRequest(null);
        }
    };

    const handleReview = (request: any) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(filteredRequests.map(r => r.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectRow = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleBulkApprove = () => {
        if (selectedIds.length === 0) return;

        const updatedRequests = requests.map(req =>
            selectedIds.includes(req.id) ? { ...req, status: 'Approved' } : req
        );
        setRequests(updatedRequests);
        localStorage.setItem('club_requests', JSON.stringify(updatedRequests));
        setSelectedIds([]);
    };

    const handleBulkReject = () => {
        if (selectedIds.length === 0) return;

        const updatedRequests = requests.map(req =>
            selectedIds.includes(req.id) ? { ...req, status: 'Rejected' } : req
        );
        setRequests(updatedRequests);
        localStorage.setItem('club_requests', JSON.stringify(updatedRequests));
        setSelectedIds([]);
    };

    // Filter logic
    const filteredRequests = requests
        .filter(req => {
            if (filterStatus === 'All') return true;
            return req.status === filterStatus;
        })
        .filter(req => {
            if (!searchTerm) return true;
            const q = searchTerm.toLowerCase();
            return (
                (req.name || '').toString().toLowerCase().includes(q) ||
                (req.president || '').toString().toLowerCase().includes(q) ||
                (req.category || '').toString().toLowerCase().includes(q) ||
                (`#CLB-${req.id}`.toLowerCase().includes(q))
            );
        });

    return (
        <div className="page-container">
            <div className="table-header-actions card">
                <div className="search-wrapper">
                    <Search size={18} className="text-muted" />
                    <input
                        type="text"
                        placeholder="Search requests..."
                        className="table-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-actions" style={{ display: 'flex', gap: '10px' }}>
                    {selectedIds.length > 0 && (
                        <button
                            className="btn-primary"
                            onClick={handleBulkApprove}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                background: 'var(--success-color, #10b981)',
                                color: 'white'
                            }}
                        >
                            <CheckCircle size={16} />
                            Approve Selected ({selectedIds.length})
                        </button>
                    )}
                    {selectedIds.length > 0 && (
                        <button
                            className="btn-primary"
                            onClick={handleBulkReject}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                background: 'var(--danger-color, #ef4444)',
                                color: 'white'
                            }}
                        >
                            <XCircle size={16} />
                            Reject Selected ({selectedIds.length})
                        </button>
                    )}
                </div>
            </div>

            <div className="table-container card">
                {filteredRequests.length === 0 ? (
                    <div className="p-8 text-center text-muted">No requests found.</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}>
                                    <input
                                        type="checkbox"
                                        checked={filteredRequests.length > 0 && filteredRequests.every(r => selectedIds.includes(r.id))}
                                        onChange={handleSelectAll}
                                        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                                    />
                                </th>
                                <th>Club Name</th>
                                <th>Category</th>
                                <th>President</th>
                                <th>Request Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map((request) => (
                                <tr key={request.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(request.id)}
                                            onChange={() => handleSelectRow(request.id)}
                                            style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                                        />
                                    </td>
                                    <td>
                                        <div className="club-cell">
                                            <div className="club-avatar">{request.name ? request.name.charAt(0) : '?'}</div>
                                            <strong>{request.name}</strong>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-info">{request.category}</span></td>
                                    <td>{request.president}</td>
                                    <td>{request.date}</td>
                                    <td>
                                        <span className={`badge ${request.status === 'Approved' ? 'badge-success' :
                                            request.status === 'Rejected' ? 'badge-danger' : 'badge-pending'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-cells">
                                            <button className="btn-icon-box" title="Review" onClick={() => handleReview(request)}>
                                                <Eye size={18} />
                                            </button>
                                            {request.status === 'Pending' && (
                                                <>
                                                    <button
                                                        className="btn-icon-box text-success"
                                                        title="Approve"
                                                        onClick={() => updateRequestStatus(request.id, 'Approved')}
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button
                                                        className="btn-icon-box text-danger"
                                                        title="Reject"
                                                        onClick={() => updateRequestStatus(request.id, 'Rejected')}
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* We can pass approve/reject handlers to modal if needed, or handle in table for now */}
            <ApprovalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                request={selectedRequest}
                onApprove={() => updateRequestStatus(selectedRequest.id, 'Approved')}
                onReject={() => updateRequestStatus(selectedRequest.id, 'Rejected')}
            />
        </div>
    );
};

export default ClubApprovalRequests;
