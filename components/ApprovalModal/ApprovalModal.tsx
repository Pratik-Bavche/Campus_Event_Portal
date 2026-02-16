"use client";

import React from 'react';
import { X, ExternalLink, CheckCircle, AlertTriangle, XCircle, FileText } from 'lucide-react';
import './ApprovalModal.css';

interface ApprovalModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: {
        id: number;
        name: string;
        category: string;
        president: string;
        contact: string;
        date: string;
        description: string;
        documents: { type: string; name: string }[];
        status: string;
    } | null;
    onApprove?: () => void;
    onReject?: () => void;
}

const ApprovalModal = ({ isOpen, onClose, request, onApprove, onReject }: ApprovalModalProps) => {
    if (!isOpen || !request) return null;

    const isPending = request.status === 'Pending';

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <div>
                        <span className={`badge ${request.status === 'Approved' ? 'badge-success' : request.status === 'Rejected' ? 'badge-danger' : 'badge-pending'}`}>
                            {request.status}
                        </span>
                        <h2 className="modal-title">{request.name} Registration</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="modal-body">
                    <div className="review-grid">
                        <div className="review-main">
                            <section className="review-section">
                                <h4>Club Description</h4>
                                <p>{request.description}</p>
                            </section>

                            <section className="review-section">
                                <h4>Uploaded Documents</h4>
                                <div className="document-list">
                                    {request.documents ? request.documents.map((doc, idx) => (
                                        <div key={idx} className="document-card">
                                            <div className="doc-icon"><FileText size={20} /></div>
                                            <div className="doc-info">
                                                <span className="doc-name">{doc.name}</span>
                                                <span className="doc-type">{doc.type}</span>
                                            </div>
                                            <button className="btn-icon"><ExternalLink size={16} /></button>
                                        </div>
                                    )) : <p className="text-muted">No documents uploaded.</p>}
                                </div>
                            </section>
                        </div>

                        <div className="review-sidebar">
                            <div className="info-card">
                                <h4>Request Details</h4>
                                <div className="info-row">
                                    <span>President</span>
                                    <strong>{request.president}</strong>
                                </div>
                                <div className="info-row">
                                    <span>Contact</span>
                                    <strong>{request.contact}</strong>
                                </div>
                                <div className="info-row">
                                    <span>Category</span>
                                    <strong>{request.category}</strong>
                                </div>
                                <div className="info-row">
                                    <span>Submitted</span>
                                    <strong>{request.date}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-outline" onClick={onClose}>Close</button>
                    {isPending && (
                        <div className="footer-actions">
                            <button className="btn btn-outline text-warning">
                                <AlertTriangle size={16} /> Request More Proof
                            </button>
                            <button className="btn btn-danger" onClick={onReject}>
                                <XCircle size={16} /> Reject
                            </button>
                            <button className="btn btn-primary" onClick={onApprove}>
                                <CheckCircle size={16} /> Approve Club
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApprovalModal;
